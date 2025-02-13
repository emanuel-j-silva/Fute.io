import React from "react";
import {Text, View, ImageBackground} from "react-native"
import Form from "../../components/Form";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";

type StackParamList = {
    Login: undefined;
    MainTabs: undefined;
}

function Login({ navigation }: { navigation: StackNavigationProp<StackParamList, 'Login'> }) {
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/login-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text style={styles.text}>Fute.io</Text>
            <Form navigation = {navigation}/>
        </View>
    </ImageBackground>
    );
}

export default Login;