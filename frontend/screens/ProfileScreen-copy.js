import React, { useContext, useState} from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function ProfileScreen() {
  const { userInfo, logout, userToken } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  


  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('Image Picker Result:', result); // Log the result to debug
  
      if (!result.canceled) {
        console.log('Image URI:', result.uri); // Check if result.uri exists
        setImage(result.uri); // Save the URI to state
        uploadImageToBackend(result.uri); // Pass the URI to the upload function
      } else {
        console.log('Image picker canceled');
      }
    } catch (error) {
      console.error('Error picking image:', error.message);
    }
  };

  
  const uploadImageToBackend = async (imageUri) => {
    if (!imageUri) {
      console.error('Error: No image URI provided');
      Alert.alert('Error', 'No image selected.');
      return;
    }
  
    try {
      console.log('Reading image file:', imageUri); // Debugging
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const response = await axios.put(
        'http://10.0.0.10:3000/api/v1/auth/upload-profile-picture',
        { image: `data:image/jpeg;base64,${base64Image}` }, // Convert to Base64 format
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`, // Use token for authentication
          },
        }
      );
  
      console.log('Profile updated successfully:', response.data);
      Alert.alert('Success', 'Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading image to backend:', error.message || error.response?.data);
      Alert.alert('Error', 'Failed to upload profile picture.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userInfo ? (
        <>
          <Text>Email: {userInfo.email}</Text>
          <Text>Username: {userInfo.username|| 'Not provided'}</Text>
        </>
      ) : (
        <Text>No user info available</Text>
      )}
      <Button title="Logout" onPress={logout} />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});