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
            <Icon name="trash-can-outline" style={styles.icon}/>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{`Número de jogadores: ${numPlayers}`}</Text>
            <Text style={styles.subtitle}>{location}</Text>
        </View>
    );
}

export default GroupCard;