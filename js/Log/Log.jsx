import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Login from './Login';
import Signup from './Signup';


export default function Log() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  const handleShowLogin = () => { setLogin(true); };
  const handleShowSignup = () => { setSignup(true); };

  if (login) { return <Login />; };
  if (signup) { return <Signup />; };

  return (
    <View style={styles.containerG}>
      <Text style={styles.title}>Hello, </Text>
      <Text style={styles.titleTitle}> Start your carrier!</Text>
      <Text style={styles.subtitle}>Unleash the Power of Connections {'\n'}
      Join Meetings, Connect, and Collaborate!</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer1} onPress={handleShowLogin}>
          <Text style={styles.buttonText1}>Log into exist account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={handleShowSignup}>Create an new account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerG: {
    marginTop: 1,
    width: windowWidth,
    height: windowHeight * 1.05,
    backgroundColor: 'lightblue',
  },
  title: {
    position: 'absolute',
    top: 170,
    left: 30,
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#fff',
  },
  subtitle2: {
    fontSize: 13,
    marginBottom: 28,
  },
  subtitle: {
    fontSize: 17,
    position: 'absolute',
    top: 550,
    left: 10,
    paddingLeft: 20,
    color: '#fff',
    fontWeight: 'bold',
    padding: 20,
    borderRadius: 12,
  },
  buttonContainer1: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    width: 250,
    marginTop: 600,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    width: 250,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText1: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleTitle: {
    fontSize: 37,
    fontWeight: 'bold',
    marginBottom: 16, 
    position: 'absolute',
    top: 210,
    color: "#2196F3"
  },
});