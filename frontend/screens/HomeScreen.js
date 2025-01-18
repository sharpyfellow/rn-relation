import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, Button, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from 'moment';


export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { userToken, logout } = useContext(AuthContext); // Access the logout function

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://10.0.0.10:3000/api/v1/post/get-all-post', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to fetch posts');
    }
  };

  const handleLogout = () => {
    logout(); // Clear the token and log the user out
  };



  const renderPost = ({ item }) => {
    const formattedDate = moment(item.createdAt).format("DD:MM:YYYY");  // Format date with moment

    return (
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text>{item.description}</Text>

        <Text style={styles.authorText}>
          Posted by: {item.postedBy?.name || 'Unknown'} - {formattedDate}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('EditPost', { postId: item._id })}>
            <FontAwesome5 name="pen" size={18} color="darkblue" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item._id)}>
            <FontAwesome5 name="trash" size={18} color="red" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };




  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://10.0.0.10:3000/api/v1/post/delete-post/${postId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      Alert.alert('Success', 'Post deleted successfully');
      fetchPosts(); // Refresh the posts after deletion
    } catch (error) {
      console.error('Error deleting post:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to delete post');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id.toString()}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
    justifyContent: "space-between",

  },
  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    backgroundColor: "yellow",
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },

});