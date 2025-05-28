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
    selectedNames?: string[];
    onLongPress?: (name: string) => void;
}

function ListPlayerCard({title, colorTitle, pressable=false, 
    selectedName=null, selectedNames = [], onLongPress}: ListPlayerCardProps) {

    return(
    <View style={styles.container}>
        <Text style={[styles.title, {color: colorTitle}]}>{title}</Text>
        <ScrollView style={styles.scroll}>
            {mockPlayers.map((player,index) => {
                const isSelected = selectedNames.length > 0
            ? selectedNames.includes(player.name)
            : selectedName === player.name;

            return (<PlayerCard key={index} name={player.name} overall={player.overall} 
                    isPressable={pressable}  onLongPress={() => onLongPress && onLongPress(player.name)}
                    selected={isSelected}/>);
            })}
        </ScrollView>
    </View> 
    );
}

export default ListPlayerCard;