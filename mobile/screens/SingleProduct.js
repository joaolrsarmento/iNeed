import React, { Component } from "react";
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
    View,
  TouchableOpacity
} from "react-native";
import * as Icon from "@expo/vector-icons";

import { Button, Divider, Input, Block, Text } from "../components";
import { theme, mocks } from "../constants";

const { width, height } = Dimensions.get("window");

class SingleProduct extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button onPress={() => {}}>
          <Icon.Entypo name="dots-three-horizontal" color={theme.colors.gray} />
        </Button>
      )
    };
  };

  renderGallery() {
    const { product } = mocks.products[0];
    const {item} = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <Image
            source={item}
            resizeMode="contain"
            style={{ width, height: height / 2.8 }}
          />
        )}
      />
    );
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
  renderEntrega(item){
    if ('canMailIt' in item && item.canMailIt) return(<Text caption gray style={styles.tag}>Mails it</Text>);
    if ('shouldMailIt' in item && item.shouldMailIt) return(<Text caption gray style={styles.tag}>Can mail</Text>);
    return;
  }
  renderInfo(item){
    if ('canMailIt' in item) return;

    const valor = item.daysNeeded * item.valuePerDay;
    var partsD1 = item.startDate.split('/');
    var d1 = new Date(partsD1[2], partsD1[1] - 1, partsD1[0]);
    var endDateObj = d1 + item.daysNeeded*(1000 * 60 * 60 * 24);
    console.log(endDateObj);
    d1.setDate(d1.getDate() + item.daysNeeded);

    var mes = d1.getMonth();
    var dia = d1.getDate();
    if(Number(mes)<10){
      mes = '0' + mes;
    }
    if(Number(dia)<10){
      dia = '0' + dia;
    }

    var endDate = dia + '/' + mes + '/' +d1.getFullYear();

    if ('shouldMailIt' in item) return(
        <>
        <Divider margin={[theme.sizes.padding * 0.9, 0]} />
        <Text>
          From {item.startDate} to {endDate}: {item.daysNeeded} days
        </Text>
          <Text>

          Full value: R$ {valor}
        </Text>
          </>
    );
  }
  render() {
    const { product } = mocks.products[0];
    const { profile, navigation } = this.props;
    const item = (navigation.state.params);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.product}>
          <Text h2 bold size={30}>
            {item.title}
          </Text>
          <Block flex={false} row margin={[theme.sizes.base, 0]}>
              <Text caption gray style={styles.tag}>
                {item.city} - {item.uf}
              </Text>
            {this.renderEntrega(item)}
          </Block>
          <View style={styles.container}>
            {/*<Image*/}
            {/*    source={mocks.images[item.id]}*/}
            {/*    style={styles.image}*/}
            {/*/>*/}
            {this.renderImage(item)}
          </View>
          <Text gray light height={22}>
            {item.description}
          </Text>

          <Divider margin={[theme.sizes.padding * 0.9, 0]}/>

          <Text>User: {item.username}</Text>

          <Text>Suggested price: </Text><Text size={20} color={'#ffa500'}>R$ {item.valuePerDay}/day</Text>

          {this.renderInfo(item)}

          {/*<Block>*/}
          {/*  <Text semibold>Gallery</Text>*/}
          {/*  <Block row margin={[theme.sizes.padding * 0.9, 0]}>*/}
          {/*    {product.images.slice(1, 3).map((image, index) => (*/}
          {/*      <Image*/}
          {/*        key={`gallery-${index}`}*/}
          {/*        source={image}*/}
          {/*        style={styles.image}*/}
          {/*      />*/}
          {/*    ))}*/}
          {/*    <Block*/}
          {/*      flex={false}*/}
          {/*      card*/}
          {/*      center*/}
          {/*      middle*/}
          {/*      color="rgba(197,204,214,0.20)"*/}
          {/*      style={styles.more}*/}
          {/*    >*/}
          {/*      <Text gray>+{product.images.slice(3).length}</Text>*/}
          {/*    </Block>*/}
          {/*  </Block>*/}
          {/*</Block>*/}
        </Block>
      </ScrollView>
    );
  }
}

export default SingleProduct;

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625
  },
  image: {
    width: width /1.2,
    height: width / 1.7,
  },container: {
    alignItems:'center',
    justifyContent: 'center'
  },
  more: {
    width: 55,
    height: 55
  }
});
