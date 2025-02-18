import React from "react";
import {Text, View} from "react-native"
import ProfilePicture from "../ProfilePicture";
import styles from "./styles";

interface DashboardHeaderProps{
    name: string;
    defaultColor?: string;
}
function DashboardHeader({name, defaultColor="#050517"}:DashboardHeaderProps){
    return(
        <View style={[styles.container, {backgroundColor: defaultColor}]}>
            <View style={styles.profileContainer}>
                <ProfilePicture />
            </View>
            <View>
                <Text style={styles.subtitle}>Bem vindo,</Text>
                <Text style={styles.name}>{name}</Text>
            </View>
        </View>
    );
}

export default DashboardHeader;