import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const HeaderMenu = () => {
    const navigation = useNavigation();
    const { userToken, logout } = useContext(AuthContext); // Access the logout function

    //logout
    const handleLogout = async () => {
        logout();
        alert("logout Successfully");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.post} onPress={() => navigation.navigate('CreatePost')}>
                <FontAwesome5
                    name="plus-square"
                    color={"red"}
                    style={styles.iconStyle}
                />

            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
                <FontAwesome5
                    name="sign-out-alt"
                    color={"red"}
                    style={styles.iconStyle}
                />
            </TouchableOpacity>

            
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 1,
        justifyContent: "space-between",
    },
    iconStyle: {
        marginBottom: 3,
        alignSelf: "center",
        fontSize: 25,
    },
    post: {
        
        right: 20,
        
    },
  
});

export default HeaderMenu;