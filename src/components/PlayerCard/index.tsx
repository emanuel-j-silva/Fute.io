import React from "react";
import {Text, View } from "react-native"
import ProfilePicture from "../ProfilePicture";
import styles from "./styles";

interface PlayerCardProps{
    name: string;
    overall: number;
    photoUrl?: string;
    photoSize?: number;
    nameColor?: string;
    backColor?: string;
}

function PlayerCard({ name, overall, photoUrl, photoSize, 
    nameColor = "#FFFFFF", backColor = "#050517"}: PlayerCardProps) {

    const colorStyle: string = overall >= 90 ? "#006600" : overall >= 80 ? "#21DA49" : 
    overall >= 60 ? "#C3BF2E" : overall >= 40 ? "#ED8529" : "#ED2929";

    return(
    <View style={[styles.container, {backgroundColor: backColor}]}>
        <ProfilePicture photoUrl={photoUrl} size={photoSize} />
        <Text style={[styles.name, {color:nameColor}]}>{name}</Text>
        <Text style={[ styles.overall, {color: colorStyle} ]}>{overall}</Text>
    </View>
    );
}

export default PlayerCard;