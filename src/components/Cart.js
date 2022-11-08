import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import Navbar from './Navbar.js';

export default function Cart( {navigation} ) {

const [savedProducts, setSavedProducts] = useState([]);

useEffect(() => {
  getData('product');
}, []);
  
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    setSavedProducts(jsonValue != null ? JSON.parse(jsonValue) : null);
  } catch(e) {
    console.log(e)
  }
}

  function padding(a, b, c, d) {
    return {
      paddingTop: a,
      paddingRight: b ? b : a,
      paddingBottom: c ? c : a,
      paddingLeft: d ? d : (b ? b : a)
    }
  }

  return (
    <View>
        <Navbar navigation={navigation}/>
        <View style={{...padding(20, 6, 20, 6), justifyContent: 'center', flexWrap: 'wrap'}}>
          {savedProducts.map((product, index) => (
            <View key={product.id} style={{padding: 10, flexDirection: 'row'}}>
              <View>
                <Image
                  source={product.img_path}
                  style={{ width: 120, height: 120 }}
                />
                <Text style={{textAlign: 'center'}}>{product.label}</Text>
                <Text style={{textAlign: 'center'}}>{product.price}</Text>
                <Text style={{textAlign: 'center'}}>Amount: </Text>
              </View>
              <View>
                <Text>Some extra information</Text>
              </View>
            </View>
          ))}
        </View>
    </View>
  )
}
