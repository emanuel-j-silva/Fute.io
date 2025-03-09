import React from "react";
import {Text, View, ImageBackground, ScrollView} from "react-native"
import CustomButton from "../../components/CustomButton";
import GroupCard from "./components/GroupCard";
import { mockGroups } from "../../data/mockGroups";
import styles from "./styles";

function Groups() {
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/groups-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text style={styles.title}>Grupos</Text>
            <View style={styles.buttonsRow}>
                <View style={{flex: 1}}>
                    <CustomButton title="Nova Equipe" onPress={():void=>{}} fontSize={12} 
                        backgroundColor="#03045E" pressedBackgroundColor="#0077B6"
                        paddingHorizontal={30} paddingVertical={30} />
                </View>
                <View style={{flex: 1}}>
                    <CustomButton title="Sorteio" onPress={():void=>{}} fontSize={12}
                        backgroundColor="#03045E" pressedBackgroundColor="#0077B6"
                        paddingHorizontal={30} paddingVertical={30}/>
                </View>
            </View>
            <ScrollView>
                {mockGroups.map((group,index) =>(
                    <GroupCard key={index} name={group.name} numPlayers={group.numberOfPlayers} 
                        location={group.location} />
                ))}
            </ScrollView>
        </View>
    </ImageBackground>
    );
}

export default Groups;