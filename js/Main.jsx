import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Map from '../js/Meeting/Map';
import Chat from '../js/Social/Chat';
import Scroll from '../js/Scroll';


export default function Main() {
  const [mapScreen, setMapScreen] = useState(false);
  const [chatScreen, setChatScreen] = useState(false);
  const [scrollScreen, setScrollScreen] = useState(false);

  const handleShowChatScreen = () => { setChatScreen(true); };
  const handleShowMapScreen = () => { setMapScreen(true); };
  const handleShowScrollScreen = () => { setScrollScreen(true)};

  if (chatScreen) { return <Chat />; };
  if (mapScreen) { return <Map />; };
  if (scrollScreen) { return <Scroll />; };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleShowMapScreen} >
        <Image style={styles.buttonIcon} source={require('../assets/world.jpg')} />
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonTitle}>Meetings Map</Text>
          <Text style={styles.buttonSubtitle}>Connect with others by</Text>
          <Text style={styles.buttonSubtitle}>finding new friends!</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleShowScrollScreen}>
        <Image style={styles.buttonIcon2} source={require('../assets/find.jpg')}/>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonTitle}>Scroll Screen</Text>
          <Text style={styles.buttonSubtitle}>Scroll and find new</Text>
          <Text style={styles.buttonSubtitle}> meetings around you!</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.button} onPress={handleShowChatScreen}>
        <Image style={styles.buttonIcon} source={require('../assets/chat.png')} />
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonTitle}>Chat Screen</Text>
          <Text style={styles.buttonSubtitle}>Find and communicate</Text>
          <Text style={styles.buttonSubtitle}> with others by chatting!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  buttonIcon: {
    width: 60,
    height: 60,
    marginRight: 16,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
  },
  buttonIcon2: {
    width: 65,
    height: 65,
    marginRight: 16,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
  },
  buttonTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#777777',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCCCCC',
    marginVertical: 10,
  },
  extraButtonTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});