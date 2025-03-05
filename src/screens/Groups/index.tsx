import React from "react";
import {Text, View, ImageBackground} from "react-native"
import styles from "./styles";

function Groups() {
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/login-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text style={styles.text}>Groups</Text>
        </View>
    </ImageBackground>
    );
}

export default Groups;