import React from "react";
import {Text, View, ScrollView} from "react-native"
import PlayerCard from "../../components/PlayerCard";
import styles from "./styles";

interface ListPlayerCardProps{
    title: string;
}

function ListPlayerCard({title}: ListPlayerCardProps) {
    return(
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <ScrollView>
            <PlayerCard name="Estevão" overall={90} />
            <PlayerCard name="Raphael Veiga" overall={85} />
            <PlayerCard name="Gabi" overall={60} />
        </ScrollView>
    </View> 
    );
}

export default ListPlayerCard;