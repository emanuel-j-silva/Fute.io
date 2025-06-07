import React from "react";
import {Text, View} from "react-native";
import styles from "./styles";
import { PlayerInfo } from "../../../../../types/players";

interface TeamCardProps {
  numeralName: string;
  players: PlayerInfo[];
}

function TeamCard({numeralName, players}: TeamCardProps) {
    return(
        <View style={styles.container}>  
            <Text style={styles.title}>{numeralName}</Text>          
            {players.map((player,index) => (
                <Text key={index} style={styles.playerName}>{player.name}</Text>
            ))}
        </View>
   
    );
}

export default TeamCard;