import React from "react";
import {Text, View, ScrollView} from "react-native"
import PlayerCard from "../../components/PlayerCard";
import { PlayerInfo } from "../../../types/players";
import styles from "./styles";

interface ListPlayerCardProps{
    title: string;
    players: PlayerInfo[];
    colorTitle?: string;
    pressable?: boolean;
    selectedName?: string | null;
    selectedNames?: string[];
    onLongPress?: (name: string) => void;
}

function ListPlayerCard({title, players, colorTitle, pressable=false, 
    selectedName=null, selectedNames = [], onLongPress}: ListPlayerCardProps) {

    return(
    <View style={styles.container}>
        <Text style={[styles.title, {color: colorTitle}]}>{title}</Text>
        <ScrollView style={styles.scroll}>
                {players.length > 0 ? (
                    players.map((player,index) => {
                        const isSelected = selectedNames.length > 0
                            ? selectedNames.includes(player.name)
                            : selectedName === player.name;

                        return (
                            <PlayerCard
                                key={player.id || index}
                                name={player.name}
                                overall={player.overall}
                                isPressable={pressable}
                                onLongPress={() => onLongPress && onLongPress(player.name)}
                                selected={isSelected}
                            />
                        );
                    })
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderText}>Ainda não há jogadores.</Text>
                    </View>
                )}
            </ScrollView>
    </View> 
    );
}

export default ListPlayerCard;