import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
    FlatList,
    View,
  TouchableOpacity
} from "react-native";
import {  List, ListItem, SearchBar, Avatar } from "react-native-elements";
import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Plus from './Plus.js'
import MyProduct from './MyProduct.js'

import joaoImg from '../assets/images/joaoImg.png';

const { width } = Dimensions.get("window");
import api from '../services/api';

class Browse extends Component {
  state = {
    active: "I need",
    categories: [],
    data: [],
    error: null,
    iOrTheyNeed: 0
  };

  componentDidMount() {
    this.props.navigation.addListener('didFocus',  () => {
      this.listProducts(this.state.active);
    } );

    this.listProducts("I need");
  }

  handleTab = tab => {
    const tabs = ["I need", "They need", "My products"];
    this.setState({ active: tab, iOrTheyNeed: tabs.indexOf(tab) ,data:[]});
    this.listProducts(tab);
  };

  async listProducts(tab){
    const { profile, navigation } = this.props;
    this.setState({ loading: true });
    var url='';
    var response;
    var data;
    try {
      if (tab == 'I need') {
        response = await api.get(`getitems`);
        data = response.data;
      } else if (tab == 'They need') {
        response = await api.get(`giveitems`);
        data = response.data;
      } else if (tab == 'My products') {
        response = await api.get(`persons/` + profile.username);
        data = response.data[0].concat(response.data[1]);
      }

      console.log(data);
      this.setState({
        data,
        error: null,
        loading: false
      });
    } catch{
            this.setState({ error: true, loading : false });
    }

  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  renderEntrega(item){
    if ('canMailIt' in item && item.canMailIt) return(<Text>Mails it</Text>);
    if ('shouldMailIt' in item && item.shouldMailIt) return(<Text>Mails it</Text>);
    return;
  }

  renderSeparator = () => {
    return (
        <View
            style={{
              height: 1,
              backgroundColor: "#de0000"
            }}
        />
    );
  };

  renderUser(item){
    const preposition = ["For", "From"];
    if (this.state.active == "My products") return;
    else return(<Text style={styles.menuText}>{preposition[this.state.iOrTheyNeed]} {item.username}</Text>);
  }

  open = item => {
    if (this.state.active == "My products") this.props.navigation.navigate('MyProduct', item);
      else this.props.navigation.navigate('SingleProduct', item);
  }

  idImageMap(id){
    switch (id){
      case 23:
      case 20: return 0;
      case 24:
      case 21: return 4;
      case 25:
      case 22: return 3;
      case 10: return 1;
      case 11: return 2;
      case 12: return 5;
      default: return -1;
    }
  }
  renderImage(item) {
    console.log(this.idImageMap(item.id))
    if (this.idImageMap(item.id) < 0) return;

    return (<Image
        source={mocks.images[this.idImageMap(item.id)]}
        style={styles.image}
    />);
  }

  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.state;
    const tabs = ["I need", "They need", "My products"];
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Products
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={joaoImg} style={styles.avatar} />
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                  <ListItem
                      onPress={() => this.open(item)}
                      title={`${item.title}`}
                      titleStyle={{ fontSize: 16, color:'#ffa500'}}
                      leftElement={this.renderImage(item)}
                      titleContainerStyle = {{ marginLeft: 120 }}
                      subtitle={<View style={styles.subtitleView}>
                        <Text style={[styles.menuText, {textAlign:'justify'}]}>{item.description}</Text>
                        {this.renderUser(item)}
                        <View>
                          <Text style={styles.menuText}>{item.city} - {item.uf} </Text>
                        </View>
                      </View>}
                      containerStyle={{ borderBottomWidth: 0, marginBottom: 20 }}
                  />
              )}
              keyExtractor={item => item.id.toString()}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
          />
          {/*<Block flex={false} row space="between" style={styles.categories}>*/}
          {/*  {categories.map(category => (*/}
          {/*    <TouchableOpacity*/}
          {/*      key={category.name}*/}
          {/*      onPress={() => navigation.navigate("Plus")}*/}
          {/*    >*/}
          {/*      <Card center middle shadow style={styles.category}>*/}
          {/*        <Badge*/}
          {/*          margin={[0, 0, 15]}*/}
          {/*          size={50}*/}
          {/*          color="rgba(41,216,143,0.20)"*/}
          {/*        >*/}
          {/*          <Image source={category.image} />*/}
          {/*        </Badge>*/}
          {/*        <Text medium height={20}>*/}
          {/*          {category.name}*/}
          {/*        </Text>*/}
          {/*        <Text gray caption>*/}
          {/*          {category.count} products*/}
          {/*        </Text>*/}
          {/*      </Card>*/}
          {/*    </TouchableOpacity>*/}
          {/*  ))}*/}
          {/*</Block>*/}
        </ScrollView>
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => navigation.navigate("Plus", {profile: this.props.profile})}
    style={styles.TouchableOpacityStyle}>
        <Image
    source={require('../assets/plus_icon.png')}
    style={styles.FloatingButtonStyle}
    />
    </TouchableOpacity>
      </Block>
    );
  }
}

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories
};

export default Browse;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    borderRadius: theme.sizes.base * 1.1,
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  image: {
    width: width / 3.5,
    height: width / 4.5,
  },container: {
    alignItems:'center',
    justifyContent: 'center'
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  },
});
