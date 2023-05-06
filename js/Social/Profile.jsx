import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, Switch, TextInput, ScrollView } from "react-native";
import Chat from "./Chat";


export default function Profile({ user = { name: '', nick: '', bio: '' } }) {
  const [back, setBack] = useState(false);
  const [settings, setSettings] = useState(false);
  const [photoes, setPhotoes] = useState(true);
  const [level, setLevel] = useState(false);
  const [notificationsEnabled, setNotificationEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [name, setName] = useState(user.name);
  const [nick, setNick] = useState(user.nick);
  const [bio, setBio] = useState(user.bio);
  const [meetings, setMeetings] = useState([]);
  const [isHolding, setIsHolding] = useState(false);

  const handleGoBack = () => { setBack(true); };

  const handleSettings = () => { 
    setSettings(true); 
    setLevel(false);
    setPhotoes(false);
  };

  const handlePhotoes = () => { 
    setPhotoes(true);
    setLevel(false);
    setSettings(false);
  };

  const handleLevel = () => { 
    setLevel(true); 
    setPhotoes(false);
    setSettings(false);
  };

  const handleLongPress = () => {
    setIsHolding(true);
    setMeetings(false);
  };

  const handleDragStart = () => {
    setIsHolding(true);
  };

  const handleDragEnd = () => {
    setIsHolding(false);
  };

  const handleNotificationsToggle = () => {
    setNotificationEnabled(previousState => !previousState);
  };

  const handleDarkModeToggle = () => {
    setDarkModeEnabled(previousState => !previousState);
  };

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  const renderPostWithSeparator = ({ item, index }) => {
    const rowIndex = Math.floor(index / 3);
  
    const shouldRenderSeparator = (index + 1) % 3 === 0 && index > 0;
  
    const postStyle = {
      ...styles.postImage,
      marginTop: rowIndex > 0 ? 140 : 0,
    };
  
    return (
      <View style={styles.postContainer}>
        <Image source={item.image} style={postStyle} />
        {shouldRenderSeparator && renderSeparator()}
      </View>
    );
  };

  const handleAddMeeting = () => {
    const meeting = {
      title: 'Burnout meeting',
      description: 'Races, Cars, night, middle of the city, fun, loud, drftt!!!',
      time: new Date(2023, 3, 25).toLocaleDateString(),
    };
    const updatedMeetings = [...meetings, meeting];
    setMeetings(updatedMeetings);
    saveMeetings(updatedMeetings);
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const meetingsJSON = await AsyncStorage.getItem('meetings');
      if (meetingsJSON !== null) {
        setMeetings(JSON.parse(meetingsJSON));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveMeetings = async (meetingsToSave) => {
    try {
      await AsyncStorage.setItem('meetings', JSON.stringify(meetingsToSave));
    } catch (error) {
      console.log(error);
    }
  };

  const [profileData, setProfileData] = useState({
    photo: require('../../assets/profile.png'),
    posts: [
      { id: 1, image: require('../../assets/image1.jpg') },
      { id: 2, image: require('../../assets/image2.jpg') },
      { id: 3, image: require('../../assets/pixelBG1.jpg') },
      { id: 4, image: require('../../assets/BGImg02.png') },
    ],
  });

  return (
    <View style={styles.container}>
    {back ? (
      <Chat />
    ) : (
      <>
        <View style={styles.container2}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        </View>

          <Image source={profileData.photo} style={styles.profilePhoto} />
        <View style={styles.header}>
          <Text style={styles.username}>@{name}</Text>
          <Text style={styles.name}>{nick}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>

        <View style={styles.HR1} />

        <View style={styles.statsContainer}>
          <TouchableOpacity onPress={handlePhotoes}>
            <Text style={styles.statsText}>Things Posted</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLevel}>
            <Text style={styles.statsText}>Meetings Level</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSettings}>
            <Text style={styles.statsText}>Account Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.HR1} />
        
        <View style={styles.postsContainer}>
          {photoes && 
            <FlatList
              data={profileData.posts}
              renderItem={renderPostWithSeparator}
              keyExtractor={(profileData) => profileData.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          }
        </View>

        <View style={styles.levelContainer}>
          {level &&
            <View style={styles.container}>
              <Text style={styles.header}>Recent Meetings:</Text>
              {meetings.map((meeting, index) => (
                <View 
                  key={index} 
                  style={styles.meetingContainer}
                  onLongPress={handleLongPress}
                  onTouchEnd={handleDragEnd}
                >
                  <Text style={styles.meetingTitle}>{meeting.title}</Text>
                  <Text style={styles.meetingDescription}>{meeting.description}</Text>
                  <Text style={styles.meetingTime}>{meeting.time}</Text>
                </View>
              ))}
              {isHolding &&
                <TouchableOpacity>
                  <Text>Delete the meeting?</Text>
                </TouchableOpacity>
              }
              <TouchableOpacity style={styles.addButton} onPress={handleAddMeeting}>
                <Text style={styles.addButtonText}>Add Meeting</Text>
              </TouchableOpacity>
            </View>
          }
        </View>

        <ScrollView style={styles.containerSettings}>
          {settings && (
            <View style={styles.container}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <View style={styles.settingContainer}>
                  <Text style={styles.settingLabel}>Enable Notifications</Text>
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={handleNotificationsToggle}
                    trackColor={{ false: '#767577' }}
                    thumbColor={notificationsEnabled}
                  />
                </View>
              </View> 

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Appearance</Text>
                <View style={[styles.settingContainer, { justifyContent: 'space-between' }]}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Switch
                    value={darkModeEnabled}
                    onValueChange={handleDarkModeToggle}
                    trackColor={{ false: '#767577' }}
                    thumbColor={darkModeEnabled}
                  />
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={styles.settingContainer}>
                  <Text style={styles.settingLabel}>Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your username"
                    maxLength={20}
                  />
                </View>

                <View style={styles.settingContainer}>
                  <Text style={styles.settingLabel}>Nick</Text>
                  <TextInput
                    style={styles.textInput}
                    value={nick}
                    onChangeText={setNick}
                    placeholder="Enter your nickname"
                    maxLength={20}
                  />
                </View>

                <View style={styles.settingContainer}>
                  <Text style={styles.settingLabel}>Bio</Text>
                  <TextInput
                    style={styles.textInput}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Enter your bio"
                    maxLength={100}
                  />
                </View>

                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </>
    )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 474,
    alignItems: 'center',
    padding: 16,
  },
  container2: {
    width: 411.5,
    padding: 16,
  },
  containerSettings: {
    flex: 1,
    width: 504,
    padding: 16
  },
  profilePhoto: {
    marginTop: 50,
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  name: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8
  },
  bio: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 16
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 32,
    marginBottom: 16
  },
  statsText: {
    fontSize: 14,
    color: 'gray'
  },
  postsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginTop: 8,
  },
  postsContainer: {
    marginTop: 10,
    marginBottom: 6,
    width: 394,
  },
  postImage: {
    width: 130,
    height: 130,
    borderRadius: 0,
    marginRight: 1,
  },
  separator: {
    width: 8,
  },
  backButton: {
    width: windowWidth,
    backgroundColor: '#2196F3',
    height: 50,
    position: 'absolute',
    top: 0,
    textAlign: 'center',
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 17,
    fontSize: 14,
  },
  HR1: {
    height: .3,
    backgroundColor: 'black',
    width: windowWidth,
  },
  settingsContainer: {
    fontSize: 22,
  },
  levelContainer: {
    fontSize: 44,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: 350,
    marginBottom: 6,
  },
  settingLabel: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    width: 200,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  meetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    marginBottom: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: 350,
  },
  meetingText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  username: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  name: {
    textAlign: 'center',
  },
  saveButton: {
    width: windowWidth * .85,
    height: 38,
    backgroundColor: '#2196F3',
    borderRadius: 0,
    marginTop: 20,
  },
  saveText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  meetingContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: windowWidth * .9,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  meetingDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  meetingTime: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});