import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import Navbar from './Navbar.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart({navigation}) {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [productData, setProductData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const loadData = async key => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem(key)).map(JSON.parse);
      setProductData(data);
      let sum = 0;
      data.forEach(value => {
        sum += value.price;
      });
      setCartTotal(sum);
    } catch (e) {
      console.log(e);
    }
    setIsLoadingData(false);
  };

  useEffect(() => {
    loadData('product');
  }, []);

  if (isLoadingData) {
    return (
      <View
        style={{
          ...padding(20, 6, 20, 6),
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  function padding(a, b, c, d) {
    return {
      paddingTop: a,
      paddingRight: b ? b : a,
      paddingBottom: c ? c : a,
      paddingLeft: d ? d : b ? b : a,
    };
  }

  function backToMenu() {
    navigation.navigate('Home');
  }

  return (
    <View>
      <Navbar navigation={navigation} />
      <View
        style={{
          ...padding(20, 6, 20, 6),
        }}>
        {productData.map(product => (
          <View key={product.id} style={{padding: 10, flexDirection: 'row'}}>
            <View>
              <Image
                source={product.img_path}
                style={{width: 100, height: 100, borderRadius: 90}}
              />
            </View>
            <View>
              <Text style={styles.productText}>Item: {product.label}</Text>
              <Text style={styles.productText}>Price: {product.price}€</Text>
              <Text style={styles.productDescriptionText}>
                {product.description}
              </Text>
            </View>
          </View>
        ))}
        <View>
          <Text style={styles.cartCountText}>Cart total: {cartTotal}€ </Text>
        </View>
        <Pressable style={styles.button} onPress={backToMenu}>
          <Text style={styles.buttonText}>Back to selection</Text>
        </Pressable>
      </View>
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
    marginTop: 20,
    marginBottom: 4,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  productText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    marginLeft: 30,
  },
  productDescriptionText: {
    fontSize: 16,
    fontWeight: 'italic',
    marginLeft: 30,
    width: '60%',
  },
  cartCountText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 40,
  },
});
