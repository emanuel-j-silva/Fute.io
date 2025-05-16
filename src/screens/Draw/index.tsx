import React from "react";
import {View, ImageBackground} from "react-native"
import ListPlayerCard from "../../components/ListPlayerCard";
import GroupItem from "./components/GroupItem";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import styles from "./styles";

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
            <View>
                <Input placeholder="Número de times" type="numeric"/>
            </View>
            <CustomButton title="Sortear" onPress={()=>{}}
                backgroundColor="#D9D9D9" textColor="#050517"
                pressedBackgroundColor="#FFFFFF"/>
        </View>
    </ImageBackground>
    );
}

export default Draw;