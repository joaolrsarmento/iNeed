import React, { Component } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
    Alert,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    TextInput
} from "react-native";
import { Button, Input, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import { Checkbox } from 'react-native-paper';
import RNPicker from "rn-modal-picker";
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import api from "../services/api";

const { width, height } = Dimensions.get("window");
const tabs = ["I need", "They need"];

class Plus extends Component {

    state = {
        title: null,
        username: null,
        password: null,
        errors: [],
        loading: false,
        description: null,
        valuePerDay: null,
        daysNeeded: 0,
        selectedUF:"SP",
        startDate: null,
        mailIt: false,
        city: null,
        uf: null,
        show:false,
        from: null,
        until: null,
        iOrThey: 0
    };

    selectUF(index, item){
        this.setState({uf:item.uf})
    }

    afterSubmit = () =>  {
        const { navigation } = this.props;

        this.setState({loading: false});
        const message = ["Logo você terá o seu item em mãos!", "Agora seu item está disponível para emprestar!"]
        if (true) {
            Alert.alert(
                "Item adicionado!",
                message[this.state.iOrThey],
                [
                    {
                        text: "Voltar para a navegação",
                        onPress: () => {
                            navigation.goBack();
                        }
                    }
                ],
                {cancelable: false}
            );
        }
    }
    handleSubmit() {
        const { profile, navigation } = this.props;
        console.log(profile)
        Keyboard.dismiss();
        this.setState({ loading: true });
        const errors = [];
        // check with backend API or with some static data
        if (this.state.title == null || this.state.title === "") errors.push("title");
        if (this.state.description == null || this.state.description === "") errors.push("description");
        if (this.state.valuePerDay == null || this.state.valuePerDay === "" ) errors.push("valuePerDay");
        if (this.state.uf == null) errors.push("uf");
        var days = 0;
        if(!this.state.iOrThey){
            if (this.state.until == null) errors.push("until");
            if (this.state.from == null) errors.push("from");
            if (this.state.from != null && this.state.until != null) {
                var partsD1 = this.state.from.split('/');
                var partsD2 = this.state.until.split('/');
                var d1 = new Date(partsD1[2], partsD1[1] - 1, partsD1[0]);
                var d2 = new Date(partsD2[2], partsD2[1] - 1, partsD2[0]);
                days = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
                if (days < 0) {
                    errors.push("from");
                    errors.push("until");
                }
                this.setState({daysNeeded: days});
            }
        }

        if(errors.length) {
            this.setState({loading: false, errors: errors});
            return;
        }
        this.setState({errors:errors});
        console.log (this.state.daysNeeded);
        if(this.state.iOrThey) {
            try{
                const {title, description, valuePerDay, city, uf} = this.state;
                const canMailIt = this.state.mailIt;
                const data = {title, description, valuePerDay, city, uf, canMailIt};
                const response = api.post(`giveitems`, data);
            }catch(err){
                Alert.alert("Erro!\nTente novamente mais tarde.")
            }
            this.afterSubmit();
        }else {
            try{
                const {title, description, valuePerDay, city, uf} = this.state;
                const shouldMailIt = this.state.mailIt;
                const startDate = this.state.from;
                const daysNeeded = days;
                const data = {title, description, valuePerDay, city, uf, shouldMailIt, daysNeeded, startDate};
                const response = api.post(`getitems`, data);
            }catch(err){
                Alert.alert("Erro!\nTente novamente mais tarde.")
            }
            this.afterSubmit();
        }
    }

    renderTab(tab) {
        const isActive = tabs[this.state.iOrThey] === tab;

        return (
            <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.setState({iOrThey:tabs.indexOf(tab), errors:[], loading:false})}
        style={[styles.tab, isActive ? styles.active : null]}
    >
    <Text size={16} medium gray={!isActive} secondary={isActive}>
            {tab}
            </Text>
            </TouchableOpacity>
    );
    }

    setDate = (event, date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        this.setState({date: currentDate});
    };
    showTimepicker = () => {
         this.setState({show: true});
    };
    renderDates(){
        const { loading, errors } = this.state;
        const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
        if(!this.state.iOrThey){
            return(
                <View>
                <View style={styles.row}>
                <Text gray>From</Text>
            <DatePicker
            style={[{width: 150}, hasErrors("from")]}
            date={this.state.from}
            mode="date"
            placeholder=""
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            showIcon= {false}
            cancelBtnText="Cancel"
            customStyles={{
                dateInput: {
                    marginLeft: 0,
                        borderRadius: 0,
                        borderWidth: 0,
                        borderBottomColor: theme.colors.gray2,
                        borderBottomWidth: StyleSheet.hairlineWidth
                }
            }}
            onDateChange={(date) => {this.setState({from: date})}}
            />
                <Text gray>until</Text>
            <DatePicker
                style={[{width: 150}, hasErrors("from")]}
            date={this.state.until}
            mode="date"
            placeholder=""
            format="DD/MM/YYYY"
            confirmBtnText="Confirm"
            showIcon= {false}
            cancelBtnText="Cancel"
                minDate={this.state.from}
            customStyles={{
                dateInput: {
                    marginLeft: 0,
                        borderRadius: 0,
                        borderWidth: 0,
                        borderBottomColor: theme.colors.gray2,
                        borderBottomWidth: StyleSheet.hairlineWidth
                }
            }}
            onDateChange={(date) => {this.setState({until: date})}}
            />
                </View>
            </View>);
        }
    }
    render() {
        const ufs = mocks.ufs;
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
        const tabs = ["I need", "They need"];

        return (
            <ScrollView showsVerticalScrollIndicator={false} >
            <KeyboardAvoidingView style={styles.signup} behavior="padding">
            <Block padding={[0, theme.sizes.base * 2]}>
            <Text h1 bold>
                Adicionar produto
        </Text>
        <Block flex={false} row style={styles.tabs}>
            {tabs.map(tab => this.renderTab(tab))}
            </Block>
        <Block middle>
        <Input
        label="Title"
        error={hasErrors("title")}
        style={[styles.input, hasErrors("title")]}
        defaultValue={this.state.title}
        onChangeText={text => this.setState({ title: text })}
        />
        <TextInput
        label="Description"
        editable
        multiline
        numberOfLines={5}
        style={[styles.input_description, hasErrors("description")]}
        onChangeText={text => this.setState({ description: text })}
        value={this.state.description}
        placeholder="Description"
        />
            <Input
        number
        label="Value per day"
        error={hasErrors("valuePerDay")}
        style={[styles.input, hasErrors("valuePerDay")]}
        defaultValue={this.state.valuePerDay}
        onChangeText={text => this.setState({ valuePerDay: text })}
        />
        {this.renderDates()}


            <Input
        label="City"
        error={hasErrors("city")}
        style={[styles.input_city, hasErrors("city")]}
        defaultValue={this.state.city}
        onChangeText={text => this.setState({ city: text })}
        />
            <View style={styles.row}>

            <RNPicker
        dataSource={ufs}
        dummyDataSource={ufs}
        defaultValue={false}
        pickerTitle={"UF"}
        showSearchBar={true}
        disablePicker={false}
        changeAnimation={"none"}
        searchBarPlaceHolder={"Search....."}
        showPickerTitle={true}
        searchBarContainerStyle={this.props.searchBarContainerStyle}
        pickerStyle={[styles.pickerStyle, hasErrors("uf")]}
        selectedLabel={this.state.uf}
        placeHolderLabel={"UF"}
        selectLabelTextStyle={styles.selectLabelTextStyle}
        placeHolderTextStyle={styles.placeHolderTextStyle}
        dropDownImageStyle={styles.dropDownImageStyle}
        selectedValue={(index, item) => this.selectUF(index, item)}
        />
            </View>
            <View style={styles.row}>
        <Checkbox
        status={this.state.mailIt ? 'checked' : 'unchecked'}
        onPress={() => {this.setState({ mailIt: !this.state.mailIt })}}
        /><Text black>
        Mail
        </Text>
        </View>
        <Button gradient onPress={() => this.handleSubmit()}>
        {loading ? (
            <ActivityIndicator size="small" color="white" />
        ) : (
        <Text bold white center>
        Add
        </Text>
        )}
    </Button>
        </Block>
        </Block>
        </KeyboardAvoidingView>
        </ScrollView>
    );
    }
}

Plus.defaultProps = {
    images: mocks.explore
};

export default Plus;

const styles = StyleSheet.create({
    signup: {
        flex: 1,
        justifyContent: "center"
    },
    tab: {
        marginRight: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base
    },
    active: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 3
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    pickerStyle: {
        width:100,
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tabs: {
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2
    },
    input_description: {
        borderRadius: 0,
        borderWidth: 0.1,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    input_city: {
        borderRadius: 0,
        width:200,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    column:{
        display:'flex',
        flexDirection: 'column',
        width:'100%',
    },
    row: {
        display:'flex',
        flexDirection: 'row',
        width:'100%',
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent
    },
    header: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 2
    },
    search: {
        height: theme.sizes.base * 2,
        width: width - theme.sizes.base * 2
    },
    searchInput: {
        fontSize: theme.sizes.caption,
        height: theme.sizes.base * 2,
        backgroundColor: "rgba(142, 142, 147, 0.06)",
        borderColor: "rgba(142, 142, 147, 0.06)",
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: "transparent"
    },
    searchIcon: {
        position: "absolute",
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base / 1.6
    },
    plus: {
        marginHorizontal: theme.sizes.padding * 1.25
    },
    image: {
        minHeight: 100,
        maxHeight: 130,
        maxWidth: width - theme.sizes.padding * 2.5,
        marginBottom: theme.sizes.base,
        borderRadius: 4
    },
    mainImage: {
        minWidth: width - theme.sizes.padding * 2.5,
        minHeight: width - theme.sizes.padding * 2.5
    },
    footer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        overflow: "visible",
        alignItems: "center",
        justifyContent: "center",
        height: height * 0.1,
        width,
        paddingBottom: theme.sizes.base * 4
    }
});
