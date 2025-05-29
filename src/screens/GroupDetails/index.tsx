import React from "react";
import {Text, View, ImageBackground} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigation";
import styles from "./styles";


type GroupDetailsRouteProp = RouteProp<RootStackParamList, "GroupDetails">;
type GroupDetailsNavigationProp = StackNavigationProp<RootStackParamList, "GroupDetails">

function GroupDetails() {
    const navigation = useNavigation<GroupDetailsNavigationProp>();

    const route = useRoute<GroupDetailsRouteProp>();
    const { title } = route.params;
    
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/group-details-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text style={styles.text}>{title}</Text>
        </View>
    </ImageBackground>
    );
}

export default GroupDetails;