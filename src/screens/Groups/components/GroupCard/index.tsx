import React from "react";
import {Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";

interface GroupCardProps{
    name: string;
    numPlayers: number;
    location: string;
}

function GroupCard({name, numPlayers, location}: GroupCardProps) {
    return(
        <View style={styles.container}>
            <Icon name="trash-can-outline" style={styles.trashIcon} size={20} color="red"/>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.rowInfo}>
                <Icon name="account-outline" size={22} color="#FFFFFF" style={styles.subIcon}/>
                <Text style={styles.subtitle}>{`Número de jogadores: ${numPlayers}`}</Text>                
            </View>
            <View style={styles.rowInfo}>
                <Icon name="map-marker-outline" size={22} color="#FFFFFF" style={styles.subIcon}/>
                <Text style={styles.subtitle}>{location}</Text>
            </View>
        </View>
    );
}

export default GroupCard;