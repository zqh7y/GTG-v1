import React, { useState } from 'react';
import { View, TextInput, Button, Modal, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import Chat from '../Social/Chat';
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';


export default function Create({ isVisible, onMeetingCreate, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [showText, setShowText] = useState(false);
  const [chat, setChat] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [post, setPost] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleCreateMeeting = () => {
    const meeting = {
      title,
      description,
      location,
      time
    };
    onMeetingCreate(meeting);
    setTitle('');
    setDescription('');
    setLocation('');
    setTime('');
  };

  const handlePostMeeting = () => {
    if (title.length > 5 && description.length > 10 && selectedDay != "" && selectedHour != "") { 
      setSuccess('Successfully created meeting!');
      setPost(true);
    } else { 
      setError('Please fill in all the inputs!');

      setTimeout(() => {
        setError('');
      }, 8000);
    }
  };

  const handleCloseCreate = () => { setChat(true); };

  const handleRules = () => { setShowText(!showText); };

  const handleDayChange = (day) => { setSelectedDay(day); };

  const handleHourChange = (hour) => { setSelectedHour(hour); };

  if (chat) { return <Chat />; };
  if (post) { return <Chat />; };

  return (
    <ImageBackground source={require('../../assets/BGImg04.jpg')} style={styles.imageContainer}>
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={onClose}
        style={styles.modalContainer}
      >
        <Text style={styles.title}>Meeting Settings🛠️</Text>
          <TextInput
            style={styles.input}
            placeholder="Title (30 symbols only!)"
            value={title}
            onChangeText={setTitle}
            maxLength={30}
          />
          <TextInput
            style={styles.input}
            placeholder="Description (500 symbols only!)"
            value={description}
            onChangeText={setDescription}
            maxLength={500}
          />
          <View style={styles.pickerContainer}>
            <TouchableWithoutFeedback onPress={() => {}} style={styles.picker}>
              <Picker
                selectedValue={selectedDay}
                onValueChange={handleDayChange}
                style={styles.pickerItems}
              >
  <Picker.Item label={selectedDay ? selectedDay : 'Select a day.'} value="" />
                <View style={styles.BRr}/>
  <Picker.Item label="Sunday" value="Sunday" />
  <Picker.Item label="Monday" value="Monday" />
  <Picker.Item label="Tuesday" value="Tuesday" />
  <Picker.Item label="Wednesday" value="Wednesday" />
  <Picker.Item label="Thursday" value="Thursday" />
  <Picker.Item label="Friday" value="Friday" />
  <Picker.Item label="Saturday" value="Saturday" />
              </Picker>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.pickerContainer}>
            <TouchableWithoutFeedback onPress={() => {}} style={styles.picker}>
              <Picker
                onValueChange={(value) => handleHourChange(value)}
                selectedValue={selectedHour}
                style={styles.pickerItems}
              >
  <Picker.Item label={selectedHour ? selectedHour : 'Select a hour.'} value='' />
                <View style={styles.BRr} />
                <Picker.Item label="🌞 1AM - (01:00)" value="1AM - (01:00)" />
    <Picker.Item label="🌞 2AM - (02:00)" value="2AM - (02:00)" />
    <Picker.Item label="🌞 3AM - (03:00)" value="3AM - (03:00)" />
    <Picker.Item label="🌞 4AM - (04:00)" value="4AM - (04:00)" />
    <Picker.Item label="🌞 5AM - (05:00)" value="5AM - (05:00)" />
    <Picker.Item label="🌞 6AM - (06:00)" value="6AM - (06:00)" />
    <Picker.Item label="🌞 7AM - (07:00)" value="7AM - (07:00)" />
    <Picker.Item label="🌞 8AM - (08:00)" value="8AM - (08:00)" />
    <Picker.Item label="🌞 9AM - (09:00)" value="9AM - (09:00)" />
    <Picker.Item label="🌞 10AM - (10:00)" value="10AM - (10:00)" />
    <Picker.Item label="🌞 11AM - (11:00)" value="11AM - (11:00)" />
    <Picker.Item label="🌞 12PM - (12:00)" value="12PM - (12:00)" />
    <Picker.Item label="🌜 1PM - (13:00)" value="1PM - (13:00)" />
    <Picker.Item label="🌜 2PM - (14:00)" value="2PM - (14:00)" />
    <Picker.Item label="🌜 3PM - (15:00)" value="3PM - (15:00)" />
    <Picker.Item label="🌜 4PM - (16:00)" value="4PM - (16:00)" />
    <Picker.Item label="🌜 5PM - (17:00)" value="5PM - (17:00)" />
    <Picker.Item label="🌜 6PM - (18:00)" value="6PM - (18:00)" />
    <Picker.Item label="🌜 7PM - (19:00)" value="7PM - (19:00)" />
    <Picker.Item label="🌜 8PM - (20:00)" value="8PM - (20:00)" />
    <Picker.Item label="🌜 9PM - (21:00)" value="9PM - (21:00)" />
    <Picker.Item label="🌜 10PM - (22:00)" value="10PM - (22:00)" />
    <Picker.Item label="🌜 11PM - (23:00)" value="11PM - (23:00)" />
    <Picker.Item label="🌜 12AM - (00:00)" value="12AM - (00:00)" />
              </Picker>
            </TouchableWithoutFeedback>
          </View>
          <TouchableOpacity style={styles.input}>
            <Text>Press to add location</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            {/*Add Button*/}
            <TouchableOpacity style={styles.postButton}>
              <Text style={styles.postButtonText} onPress={handlePostMeeting}>Post meeting</Text>
            </TouchableOpacity>
            {/*Cancel Button*/}
            <TouchableOpacity style={styles.postButton}>
              <Text style={styles.postButtonText} onPress={handleCloseCreate}>Cancel post</Text>
            </TouchableOpacity>
          </View>
          {error !== '' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          {success !== '' && (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>{success}</Text>
            </View>
          )}
          <TouchableOpacity onPress={handleRules} style={styles.rules}>
            <Text style={styles.rulesText}>SHOW RULES!!!</Text>
          </TouchableOpacity>
          {showText && (
            <Text style={styles.subtitle}>
    After creating a meeting, it is important to be aware of the following guidelines and rules:
              {"\n"}
                Once your meeting has ended, please conclude your post with an indication that your meeting will be <Text style={styles.highlighted}>DELETED</Text>.
              {"\n"}
                Posting <Text style={styles.highlighted}>FAKE</Text> meetings is strictly prohibited and violators will face consequences, including potential <Text style={styles.highlighted}>BAN</Text>!
              </Text>
          )}
      </Modal>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'red',
    marginTop: 100,
    width: 100,
    height: windowHeight * .6
  },
  imageContainer: {
    width: windowWidth,
    height: windowHeight * 1,
  },
  input: {
    width: '50%',
    padding: 12,
    marginBottom: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    marginTop: 16,
  },
  postButton: {
    width: 120,
    height: 40,
    backgroundColor: '#2196F3',
    borderRadius: 0,
    justifyContent: 'center',
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rules: {
    width: 220,
    height: 40,
    borderColor: 'red',
    borderWidth: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    textAlign: 'center',
    marginTop: 20,
  },
  rulesText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  highlighted: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
  pickerItems: {
    color: 'black',
  },
  picker: {
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  BRr: {
    height: 20,
  },
  pickerContainer: {
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    width: '50%',
    height: 60,
    marginBottom: 7,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorContainer: {
    marginTop: 20,
    height: 27,
    width: 220,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: '#FF938A',
  },
  successText: {
    color: 'lightgreen',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successContainer: {
    marginTop: 20,
    height: 27,
    width: 320,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: '#00A679'
  },
});