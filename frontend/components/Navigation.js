import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import HomeScreen from '../screens/HomeScreen';
import EditPostScreen from '../screens/EditPostScreen';
import PostScreen from '../screens/PostScreen';
import MypostsScreen from '../screens/MypostsScreen';
import AccountScreen from '../screens/AccountScreen';

import HeaderMenu from './HeaderMenu';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const { userToken, isLoading } = useContext(AuthContext); // Use token from context

  // Show a loading indicator while loading the token
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          // If the user is authenticated, show the protected routes
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{
        
              headerTitle:"Trond Lind-Hansen",
              headerRight: () => <HeaderMenu />,
            }}/>
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen name="EditPost" component={EditPostScreen} />
            <Stack.Screen name="Post" component={PostScreen} />
            <Stack.Screen name="Myposts" component={MypostsScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
           
          </>
        ) : (
          // If the user is not authenticated, show the Login/Register screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}