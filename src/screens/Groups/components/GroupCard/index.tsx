import React, {useRef, useEffect} from "react";
import {Text, View, Pressable, Animated, ViewStyle} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";

interface GroupCardProps{
    name: string;
    numPlayers: number;
    location: string;
    selected: boolean;
    onPress: ()=> void;
    onLongPress: ()=> void;

}

function GroupCard({name, numPlayers, location, selected, onPress, onLongPress}: GroupCardProps) {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
    Animated.spring(scale, {
      toValue: selected ? 1.05 : 1,
      useNativeDriver: true,
    }).start();
    }, [selected, scale]);

    const animatedStyle: ViewStyle = {
    transform: [{ scale }],
  };

    return(
        <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        >
            <Animated.View style={[styles.container, animatedStyle]}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.rowInfo}>
                    <Icon name="account-outline" size={22} color="#FFFFFF"/>
                    <Text style={styles.subtitle}>{`Número de jogadores: ${numPlayers}`}</Text>                
                </View>
                <View style={styles.rowInfo}>
                    <Icon name="map-marker-outline" size={22} color="#FFFFFF"/>
                    <Text style={styles.subtitle}>{location}</Text>
                </View>
            </Animated.View>
        </Pressable>
    );
}

export default GroupCard;