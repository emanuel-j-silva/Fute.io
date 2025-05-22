import React from "react";
import {Text, View} from "react-native";
import styles from "./styles";

interface TeamCardProps {
  name: string;
  players: string[];
}

function TeamCard({name, players}: TeamCardProps) {
    return(
        <View style={styles.container}>  
            <Text style={styles.title}>{name}</Text>          
            {players.map((player,index) => (
                <Text key={index} style={styles.playerName}>{player}</Text>
            ))}
        </View>
   
    );
}

export default TeamCard;