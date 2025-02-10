import React from "react";
import {Text, View, ImageBackground} from "react-native"
import styles from "./styles";

function Home() {
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/home-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text style={styles.text}>Fute.io</Text>
        </View>
    </ImageBackground>
    );
}

export default Home;