import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function EditPostScreen({ route, navigation }) {
  const { postId } = route.params;
  const { userToken } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchPostDetails();
  }, []);

  // const fetchPostDetails = async () => {
  //   try {
  //     const response = await axios.get('http://10.0.0.10:3000/api/v1/post/get-user-post', {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });

  //     const userPosts = response.data.posts;
  //     const post = userPosts.find((p) => p._id === postId);

  //     if (!post) {
  //       Alert.alert('Error', 'Post not found. You are not allowed to edit this post');
  //       return;
  //     }

  //     setTitle(post.title);
  //     setDescription(post.description);
  //   } catch (error) {
  //     console.error('Error fetching post details:', error.response?.data || error.message);
  //     Alert.alert('Error', 'Failed to fetch post details');
  //   }
  // };

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get('http://10.0.0.10:3000/api/v1/post/get-user-post', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      const userPosts = response.data.posts;
      const post = userPosts.find((p) => p._id === postId);
  
      if (!post) {
        Alert.alert(
          'Error',
          'Post not found. You are not allowed to edit this post.',
          [
            {
              text: 'Go to Home',
              onPress: () => navigation.replace('MainTabs'),  // Redirect to HomeScreen
            },
          ]
        );
        return;
      }
  
      setTitle(post.title);
      setDescription(post.description);
    } catch (error) {
      console.error('Error fetching post details:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        'Failed to fetch post details',
        [
          {
            text: 'Go to Home',
            onPress: () => navigation.replace('MainTabs'),
          },
        ]
      );
    }
  };


  const handleUpdatePost = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await axios.put(
        `http://10.0.0.10:3000/api/v1/post/update-post/${postId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      Alert.alert('Success', 'Post updated successfully');
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Error updating post:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to update post');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Update Post" onPress={handleUpdatePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});