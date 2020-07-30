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
const { width } = Dimensions.get("window");

class Browse extends Component {
  state = {
    active: "I need",
    categories: [],
    data: [],
    error: null,
    iOrTheyNeed: 0
  };

  componentDidMount() {
    this.listProducts();
  }

  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase())
    );
    const tabs = ["I need", "They need", "My products"];
    this.setState({ active: tab, categories: filtered, iOrTheyNeed: tabs.indexOf(tab) });
    this.listProducts();
  };

  listProducts(){
    this.setState({ loading: true });
    var url='';
    if (this.state.active=='I need'){
        url = 'http://192.168.43.23:3333/getitems/';
      } else{
        url = 'http://192.168.43.23:3333/giveitems/';
      }
      console.log(url);
      fetch(url)
          .then(res => res.json())
          .then(res => {
            console.log(res);
            this.setState({
              data: res,
              error: null,
              loading: false
            });
          })
          .catch(error => {
            this.setState({ error, loading : false });
          })
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
    if ('canMailIt' in item && item.canMailIt) return(<Text>Pode enviar</Text>);
    if ('shouldMailIt' in item && item.shouldMailIt) return(<Text>Pode enviar</Text>);
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

  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.state;
    const tabs = ["I need", "They need", "My products"];
    const preposition = ["Para", "Por"]
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Produtos
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
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
                      onPress={() => this.props.navigation.navigate('SingleProduct',
                      item)}
                      title={`${item.title}`}
                      titleStyle={{ fontSize: 16, color:'#ffa500'}}
                      titleContainerStyle = {{ marginLeft: 120 }}
                      subtitle={<View style={styles.subtitleView}>
                        <Text style={styles.menuText}>{item.description}</Text>
                        <Text style={styles.menuText}>{preposition[this.state.iOrTheyNeed]} {item.username}</Text>
                        <View>
                          <Text style={styles.menuText}>{item.city} - {item.uf} </Text><Text>{this.renderEntrega(item)}</Text>
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
    onPress={() => navigation.navigate("Plus")}
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

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  },
});
