import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Main from './Main';
import Log from './Log/Log';



export default function Welcome() {
  const [showMainScreen, setShowMainScreen] = useState(false);
  const [logScreen, setLogScreen] = useState(false);

  const handleGetStarted = () => { setShowMainScreen(true); };
  const handleShowLogScreen = () => { setLogScreen(true); };

  if (showMainScreen) { return <Main />; }
  if (logScreen) { return <Log />; };

  return (
    <View>
    <View style={styles.container}> 
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.titleTitle}>GetTogetherGo</Text>
      <Text style={styles.subtitle}>        
        Join us & explore new horizons,{"\n"}
        meet like-minded individuals,{"\n"}
        and make meaningful connections!
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleShowLogScreen}>
        <Text style={styles.buttonText}>Log for options</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer1} onPress={handleGetStarted}>
        <Text style={styles.buttonText1}>Get Started</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>© 2023 My Meeting App. All rights reserved.</Text>
      </View>
    </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 1.05,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'lightblue',
    marginBottom: 0,
    height: windowHeight * 1.05,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 32,
    marginBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    top: 150,
    left: 30,
  },
  titleTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    top: 180,
    left: 30,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 32,
    textAlign: 'left',
    color: '#fff',
    marginTop: 270,
    padding: 20,
    borderRadius: 12,
  },
  buttonContainer1: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: 250,
    position: 'absolute',
    bottom: 100,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: 250,
    position: 'absolute',
    bottom: 170,
  },
  buttonText1: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 16,
  },
  footerText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  logButton: {
    position: 'absolute',
    top: 50,
    right: 0,
    borderColor: 'white',
    borderRadius: 9,
    borderWidth: 1.5,
    width: 60,
    height: 32,
    backgroundColor: 'green',
  },
  logButtonText: {
    textAlign: 'center',
    color: 'white',
  },
});