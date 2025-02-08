import React from "react";
import {Text, View, ImageBackground} from "react-native"
import Form from "../../components/Form";
import styles from "./styles";

function Login() {
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/login-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text style={styles.text}>Fute.io</Text>
            <Form/>
        </View>
    </ImageBackground>
    );
}

export default Login;