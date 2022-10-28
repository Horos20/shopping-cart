import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import Navbar from './Navbar.js';
import Modal from "react-native-modal";

export default function Home( {navigation} ) {

const [modalVisible, setModalVisible] = useState(false);
const [activeProduct, setActiveProduct] = useState(null);

function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : (b ? b : a)
  }
}

const toggleModal = () => {
  setModalVisible(!modalVisible);
};

const buyNow = () => {
  {/* Functionality to add product to cart */}

  toggleModal();
  navigation.navigate('Cart');
}

const addToCart = () => {
  {/* Functionality to add product to cart */}

  toggleModal();
}

const productData = [
  { id: 1, label: "Product1", description: "description1", img_url: require('../assets/product1.jpg'), price: 10 },
  { id: 2, label: "Product2", description: "description2", img_url: require('../assets/product2.jpg'), price: 5  },
  { id: 3, label: "Product3", description: "description3", img_url: require('../assets/product3.jpg'), price: 25  },
  { id: 4, label: "Product4", description: "description4", img_url: require('../assets/product4.jpg'), price: 12  }
];

  return (
    <View>
        <Navbar navigation={navigation}/>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Button title="Close" onPress={toggleModal} />
              <Text>Modal {activeProduct}</Text>
              <Button title="Buy now" onPress={() => {buyNow(activeProduct)}} />
              <Button title="Add to cart" onPress={() => {addToCart(activeProduct)}} />
            </View>
          </View>
        </Modal>
        <View style={{...padding(20, 6, 20, 6), flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
          {productData.map(product => {
            return (
              <View key={product.id} style={{padding: 10}}>
                <Image
                     source={product.img_url}
                     style={{ width: 120, height: 120 }}
                />
                <Text style={{textAlign: 'center'}}>{product.label}</Text>
                <Button title='Buy' onPress={() => {toggleModal(); setActiveProduct(product.id)}}/>
              </View>
            )})}
        </View>
    </View>
  )
}
