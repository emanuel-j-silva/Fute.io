import React from "react";
import { View, Image } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import styles from "./styles";

interface ProfilePictureProps{
    photoUrl?: string;
    size?: number;
}

function ProfilePicture({photoUrl, size=26}: ProfilePictureProps){
    if(photoUrl){
            <Image 
                source={{uri: photoUrl}}
                style={[styles.image, {width: size, height: size, borderRadius: size / 2}]}
            />
    }else{
        return(
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name={"account" as keyof typeof MaterialCommunityIcons.glyphMap}
                    size={size}
                />
            </View>
        );
    }
}

export default ProfilePicture;