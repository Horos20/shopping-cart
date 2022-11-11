import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';

export default function Navbar({navigation}) {
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  function toggleMenuModal() {
    console.log('Klikk');
    setMenuModalVisible(!menuModalVisible);
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{padding: 6}}>
        <TouchableOpacity onPress={() => toggleMenuModal()}>
          <Image
            source={require('../assets/menu.png')}
            style={{width: 40, height: 40}}
          />
          <Modal
            isVisible={menuModalVisible}
            onBackdropPress={() => setMenuModalVisible(false)}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 40,
                  borderRadius: 5,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Test</Text>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: 'auto', padding: 6}}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../assets/cart.png')}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
