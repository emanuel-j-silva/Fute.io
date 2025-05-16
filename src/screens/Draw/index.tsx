import React from "react";
import {View, ImageBackground} from "react-native"
import ListPlayerCard from "../../components/ListPlayerCard";
import styles from "./styles";
import GroupItem from "./components/GroupItem";

function Draw() {
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/draw-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>            
            <GroupItem />
            <ListPlayerCard title="Jogadores"/>
        </View>
    </ImageBackground>
    );
}

export default Draw;