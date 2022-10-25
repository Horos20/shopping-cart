import React from 'react';
import {
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import Navbar from './Navbar.js';

export default function Cart( {navigation} ) {

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
            <View style={{padding: 10, flexDirection: 'row'}}>
              <View>
                <Image
                  source={require('../assets/product1.jpg')}
                  style={{ width: 120, height: 120 }}
                />
                <Text style={{textAlign: 'center'}}>Product 1</Text>
                <Text style={{textAlign: 'center'}}>Price: </Text>
                <Text style={{textAlign: 'center'}}>Amount: </Text>
              </View>
              <View>
                <Text>Some extra information</Text>
              </View>
            </View>
              <View style={{padding: 10, flexDirection: 'row'}}>
                <View>
                  <Image
                    source={require('../assets/product2.jpg')}
                    style={{ width: 120, height: 120 }}
                  />
                  <Text style={{textAlign: 'center'}}>Product 2</Text>
                  <Text style={{textAlign: 'center'}}>Price: </Text>
                  <Text style={{textAlign: 'center'}}>Amount: </Text>
                </View>
                <View>
                  <Text>Some extra information</Text>
                </View>
            </View>
        </View>
    </View>
  )
}
