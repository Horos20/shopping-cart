import React from 'react';
import {
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import Navbar from './Navbar.js';

export default function Home( {navigation} ) {

function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : (b ? b : a)
  }
}

function buyOrAddToCart() {
  {/* 
    Display a popup that enables user to choose between 2 options: 
    1. Buy now
    2. Add to cart and keep shopping
  */}
}

  return (
    <View>
        <Navbar navigation={navigation}/>
        <View style={{...padding(20, 6, 20, 6), flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
            <View style={{padding: 10}}>
                <Image
                     source={require('../assets/product1.jpg')}
                     style={{ width: 120, height: 120 }}
                />
                <Text style={{textAlign: 'center'}}>Product 1</Text>
                <Button title='Buy' onPress={buyOrAddToCart}/>
            </View>
            <View style={{padding: 10}}>
                 <Image
                      source={require('../assets/product2.jpg')}
                      style={{ width: 120, height: 120 }}
                 />
                 <Text style={{textAlign: 'center'}}>Product 2</Text>
                 <Button title='Buy' onPress={buyOrAddToCart}/>
            </View>
            <View style={{padding: 10}}>
                  <Image
                       source={require('../assets/product3.jpg')}
                       style={{ width: 120, height: 120 }}
                  />
                  <Text style={{textAlign: 'center'}}>Product 3</Text>
                  <Button title='Buy' onPress={buyOrAddToCart}/>
            </View>
            <View style={{padding: 10}}>
                   <Image
                        source={require('../assets/product4.jpg')}
                        style={{ width: 120, height: 120 }}
                   />
                   <Text style={{textAlign: 'center'}}>Product 4</Text>
                   <Button title='Buy' onPress={buyOrAddToCart}/>
            </View>
        </View>
    </View>
  )
}
