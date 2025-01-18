import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainTabs from './navigation/MainTabs';
import CreatePostScreen from './screens/CreatePostScreen';
import EditPostScreen from './screens/EditPostScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const { userToken } = useContext(AuthContext);  // Access userToken here

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {userToken ? (
          <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="EditPost" component={EditPostScreen} />
          
          
          
          </>



          
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}