import React from "react";
import {Text, View, ScrollView} from "react-native"
import PlayerCard from "../../components/PlayerCard";
import { mockPlayers } from "../../data/mockPlayers";
import styles from "./styles";

interface ListPlayerCardProps{
    title: string;
    colorTitle?: string;
    pressable?: boolean;
    selectedName?: string | null;
    onLongPress?: (name: string) => void;
}

function ListPlayerCard({title, colorTitle, pressable=false, selectedName, onLongPress}: ListPlayerCardProps) {
    return(
    <View style={styles.container}>
        <Text style={[styles.title, {color: colorTitle}]}>{title}</Text>
        <ScrollView style={styles.scroll}>
            {mockPlayers.map((player,index) => (
                <PlayerCard key={index} name={player.name} overall={player.overall} 
                    isPressable={pressable}  onLongPress={() => onLongPress && onLongPress(player.name)}
                    selected={selectedName === player.name}/>
            ))}
        </ScrollView>
    </View> 
    );
}

export default ListPlayerCard;