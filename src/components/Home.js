import React, {useState} from 'react';
import {Text, View, Image, Button} from 'react-native';
import Navbar from './Navbar.js';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState({});
  const [cartProductCount, setCartProductCount] = useState(0);

  const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  // Api: https://react-native-async-storage.github.io/async-storage/docs/api#getitem
  const storeData = async (key, value) => {
    let savedProducts = await getData('product');
    if (savedProducts == null) {
      savedProducts = [value];
    } else {
      // Todo: check if this item is already saved OR dont let user add already saved products to cart again

      savedProducts.push(value);
    }

    // Keep check of the amount of products in the cart. Todo: useEffect to update this value
    setCartProductCount(savedProducts.length);

    savedProducts = JSON.stringify(savedProducts);
    try {
      await AsyncStorage.setItem(key, savedProducts);
    } catch (e) {
      console.log(e);
    }
  };

  function padding(a, b, c, d) {
    return {
      paddingTop: a,
      paddingRight: b ? b : a,
      paddingBottom: c ? c : a,
      paddingLeft: d ? d : b ? b : a,
    };
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const buyNow = () => {
    let product = JSON.stringify(activeProduct);
    storeData('product', product);

    toggleModal();
    navigation.navigate('Cart');
  };

  const addToCart = () => {
    let product = JSON.stringify(activeProduct);
    storeData('product', product);

    toggleModal();
  };

  const productData = [
    {
      id: 1,
      label: 'Salad bowl',
      description: 'description1',
      img_path: require('../assets/product1.jpg'),
      price: 10,
    },
    {
      id: 2,
      label: 'Burger with beef',
      description: 'description2',
      img_path: require('../assets/product2.jpg'),
      price: 5,
    },
    {
      id: 3,
      label: 'Breakfast sandwich ',
      description: 'description3',
      img_path: require('../assets/product3.jpg'),
      price: 25,
    },
    {
      id: 4,
      label: 'Ravioli',
      description: 'description4',
      img_path: require('../assets/product4.jpg'),
      price: 12,
    },
  ];

  return (
    <View>
      <Navbar navigation={navigation} />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 40,
              borderRadius: 5,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 15}}>
              You have chosen:
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              {activeProduct.label}
            </Text>
            <Button
              title="Buy now"
              onPress={() => {
                buyNow(activeProduct.id);
              }}
            />
            <Button
              style={{marginTop: 100}}
              title="Add to cart"
              onPress={() => {
                addToCart(activeProduct.id);
              }}
            />
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={menuModalVisible}
        onBackdropPress={() => menuModalVisible(false)}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 40,
              borderRadius: 5,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 15}}>
              You have chosen:
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              {activeProduct.label}
            </Text>
            <Button
              title="Buy now"
              onPress={() => {
                buyNow(activeProduct.id);
              }}
            />
            <Button
              style={{marginTop: 100}}
              title="Add to cart"
              onPress={() => {
                addToCart(activeProduct.id);
              }}
            />
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      <View
        style={{
          ...padding(20, 6, 20, 6),
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        {productData.map(product => {
          return (
            <View key={product.id} style={{padding: 10}}>
              <Image
                source={product.img_path}
                style={{width: 160, height: 160}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 17,
                  marginBottom: 10,
                }}>
                {product.label}
              </Text>
              <Button
                title="Buy"
                onPress={() => {
                  toggleModal();
                  setActiveProduct(product);
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}
