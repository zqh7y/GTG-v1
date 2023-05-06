import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Main from "./Main";
import { Dimensions } from "react-native";


export default function Scroll() {
  const [back, setBack] = useState(false);

  const handleGoBack = () => { setBack(true); };

  if (back) { return <Main />; } else { console.log("Error"); };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.buttonBack}> 
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles=StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 1.07,
  },
  buttonBack: {
    width: windowWidth,
    height: 60,
    backgroundColor: "#2196F3",
    position: 'absolute',
    top: 10,
  },
  backText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
});