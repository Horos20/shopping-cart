import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text, Button} from 'react-native';
import Modal from 'react-native-modal';

export default function Navbar({navigation}) {
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  function toggleMenuModal() {
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
              style={{
                padding: 30,
                backgroundColor: 'white',
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 40,
                    textAlign: 'center',
                  }}>
                  Menu
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  You have opened the menu!
                </Text>
                <Button title={'Close'} onPress={toggleMenuModal} />
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
