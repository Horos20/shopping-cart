import React, {useState} from 'react';
import {Text, View, Image, Button, Pressable, StyleSheet} from 'react-native';
import Navbar from './Navbar.js';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
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
      savedProducts.push(value);
    }

    try {
      const jsonData = JSON.stringify(savedProducts);
      await AsyncStorage.setItem(key, jsonData);
    } catch (e) {
      console.log(e);
    }

    setCartProductCount(savedProducts.length);
  };

  const buyNow = () => {
    let product = JSON.stringify(activeProduct);
    storeData('product', product).then(r => navigation.navigate('Cart'));
    toggleModal();
  };

  const addToCart = () => {
    let product = JSON.stringify(activeProduct);
    storeData('product', product).then(r => toggleModal());
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {}
    setCartProductCount(0);
    toggleModal();
    console.log('All data cleared');
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

  const productData = [
    {
      id: 1,
      label: 'Salad bowl',
      description: 'Fresh salad bowl made from organic vegetables',
      img_path: require('../assets/product1.jpg'),
      price: 10,
    },
    {
      id: 2,
      label: 'Burger with beef',
      description: 'Homemade burger with beef and garlic sauce',
      img_path: require('../assets/product2.jpg'),
      price: 12,
    },
    {
      id: 3,
      label: 'Sandwich',
      description: 'A breakfast sandwich with blueberrys and banana',
      img_path: require('../assets/product3.jpg'),
      price: 5,
    },
    {
      id: 4,
      label: 'Ravioli',
      description: 'Fresh ravioli with seasoning',
      img_path: require('../assets/product4.jpg'),
      price: 20,
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
            <Text style={{fontWeight: 'bold', fontSize: 30, marginBottom: 15}}>
              You have chosen:
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 10,
                color: 'black',
                textAlign: 'center',
              }}>
              Item: {activeProduct.label}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 10,
                color: 'black',
                textAlign: 'center',
              }}>
              Price: {activeProduct.price} €
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                buyNow(activeProduct.id);
              }}>
              <Text style={styles.text}>Buy now</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                addToCart(activeProduct.id);
              }}>
              <Text style={styles.text}>Add to cart</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={clearAllData}>
              <Text style={styles.text}>Clear shopping cart</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={toggleModal}>
              <Text style={styles.text}>Close</Text>
            </Pressable>
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
                  marginTop: 10,
                }}>
                {product.label} {product.price}€
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
      <Text style={styles.cartCountText}>
        {' '}
        Products in your cart: {cartProductCount}{' '}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4695ED',
    marginTop: 4,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  cartCountText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
