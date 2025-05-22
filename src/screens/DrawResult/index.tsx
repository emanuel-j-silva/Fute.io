import React from "react";
import {Text, View, ImageBackground, BackHandler, Alert} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import CustomButton from "../../components/CustomButton";
import styles from "./styles";

import { RootStackParamList } from "../../../types/navigation";

type DrawResultNavigationProp = StackNavigationProp<RootStackParamList, "DrawResult">;


function DrawResult() {
    const navigation = useNavigation<DrawResultNavigationProp>();

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
            Alert.alert('Sair', 'Você deseja voltar para a Tela de Sorteios?', [
                { text: 'Cancelar', style: 'cancel' },
                {
                text: 'Sim',
                onPress: () => {
                    navigation.navigate('Draw');
                },
                },
            ]);
            return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/draw-result-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>            
            <Text style={styles.title}>Resultado</Text>
            <CustomButton title="Exportar" onPress={()=>{}}
                backgroundColor="#050517" textColor="#D9D9D9"
                pressedBackgroundColor="#0077B6"/>
        </View>
    </ImageBackground>
    );
}

export default DrawResult;