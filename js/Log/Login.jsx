import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Signup from "./Signup";
import Main from "../Main";


export default function Login() {
  const [signup, setSignup] = useState(false); 
  const [loginPassword, setLoginPassword] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isInsultWordDetected, setIsInsultWordDetected] = useState(false);

  const handleShowSignup = () => { setSignup(true); };

  const handleShowLoginPassword = () => {
    if (!isInsultWordDetected && inputText.length > 3 && inputPassword.length > 5) {
      setLoginPassword(true)
    };
  };

  if (signup) { return <Signup />; };
  if (loginPassword) { return <Main />; };
  

  const insultWords = [ 
    "sex", "fuck", "bitch", "ass", "porn", "dick", "vagina", "bastard", "whore", "shit", "cock", "cunt", "penis", "boobs", "pussy", "motherfucker", "idiot", "stupid", "moron", "jackass", "dumbass", "dipshit", "bullshit", "asshole", "damn", "jerk" 
  ];
  
  const handleInputChange = (text) => {
    setInputText(text);
    const space = text.replace(/\s+/g, '');
    setInputText(space);

    const insultWordFound = insultWords.some((insult) =>
      text.toLowerCase().includes(insult)
    );

    setIsInsultWordDetected(insultWordFound);
  };

  const handlePassword = (text) => { setInputPassword(text); };

  return (
    <ImageBackground source={require('../../assets/BGImg04.jpg')} style={styles.imageContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Please enter your username/email while then password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter an account username"
          keyboardType="default"
          autoCapitalize="none"
          maxLength={20}
          onChangeText={handleInputChange}
          value={inputText}
        />
        {isInsultWordDetected ? (
          <Text style={styles.warningText}>Insult words are not allowed</Text>
        ) : null}
        <TextInput
          style={styles.input}
          maxLength={120}
          placeholder="Enter an account password"
          secureTextEntry={true}
          value={inputPassword}
          autoCapitalize="none"
          onChangeText={handlePassword}
        />
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            isInsultWordDetected ? styles.buttonContainerDisabled : null
          ]}
          disabled={isInsultWordDetected}
          onPress={handleShowLoginPassword}
        >
          <Text style={styles.buttonText}>Explore!</Text>
        </TouchableOpacity>
        <Text style={styles.linkText} onPress={handleShowSignup}>New account? Signup!</Text>
        <Text style={styles.safeText}>Your privacy is safe with us.</Text>
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * .7,
    height: windowHeight * .5,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    resizeMode: 'cover',
  },
  safeText: {
    fontSize: 11,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    textShadowColor: '#bbb',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    width: 260,
    height: 40,
    borderColor: "#000",
    borderWidth: .2,
    borderRadius: 2,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    backgroundColor: "#3f51b5",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    width: 230,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 0,
  },
  linkText: {
    color: "#000",
    fontSize: 16,
    marginTop: 0,
    fontWeight: 'bold',
  },
  warningText: {
    color: 'red',
  },
  imageContainer: {
    width: windowWidth,
    height: windowHeight * 1.07,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});