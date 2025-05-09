import React from "react";
import {View, ImageBackground} from "react-native"
import ListPlayerCard from "../../components/ListPlayerCard";
import styles from "./styles";

function Draw() {
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/draw-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={styles.content}>
                <ListPlayerCard title="Jogadores"/>
            </View>
        </View>
    </ImageBackground>
    );
}

export default Draw;