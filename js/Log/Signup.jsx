import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import Login from "./Login";
import Main from "../Main";
import { Dimensions } from "react-native";


export default function Signup() {
  const [login, setLogin] = useState(false);
  const [signupPassword, setSignupPassword] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isInsultWordDetected, setIsInsultWordDetected] = useState(false);

  const handleShowLogin = () => { setLogin(true); };

  if (login) { return <Login />; };

  const insultWords = [
    "sex", "fuck", "bitch", "ass", "porn", "dick", "vagina", "bastard", "whore", "shit",
    "cock", "cunt", "penis", "boobs", "pussy", "motherfucker", "idiot", "stupid", "moron",
    "jackass", "dumbass", "dipshit", "bullshit", "asshole", "damn", "jerk",
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

  const handleSignup = () => {
    if (!isInsultWordDetected && inputText.length > 3 && inputPassword.length > 5) {
      setSignupPassword(true);
      console.log("Signup successful!");
    } else {
      console.log("Insult word detected!");
    };
  };

  if (signupPassword) { return <Main />; };

  return (
    <ImageBackground source={require('../../assets/BGImg04.jpg')} style={styles.imageBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Happy Comeback!</Text>
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
        />
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            isInsultWordDetected ? styles.buttonContainerDisabled : null,
          ]}
          disabled={isInsultWordDetected}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Explore!</Text>
        </TouchableOpacity>
        <Text style={styles.linkText} onPress={handleShowLogin}>Have account? Login!</Text>
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
    color: 'black',
    textAlign: "center",
    marginBottom: 24,
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
    backgroundColor: '#fff',
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
  imageBackground: {
    width: windowWidth * 1.05,
    height: windowHeight * 1.07,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeText: {
    fontSize: 11,
    position: 'absolute',
    bottom: 0,
  },
});