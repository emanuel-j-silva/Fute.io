import React from "react";
import {Text, View, ImageBackground, ScrollView, BackHandler, Alert} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";

import CustomButton from "../../components/CustomButton";
import { RootStackParamList } from "../../../types/navigation";
import TeamCard from "./components/TeamCard";

import styles from "./styles";

type DrawResultNavigationProp = StackNavigationProp<RootStackParamList, "DrawResult">;
type DrawResultRouteProp = RouteProp<RootStackParamList, "DrawResult">;


function DrawResult() {
    const navigation = useNavigation<DrawResultNavigationProp>();
    const route = useRoute<DrawResultRouteProp>();
    const { teams } = route.params;

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
            <ScrollView>
                    {teams.length > 0 ? (
                        teams.map((team, index) => (
                            <TeamCard key={index} numeralName={team.numeralName} players={team.players}/>
                        ))
                    ) : (
                        <View style={styles.noTeamsContainer}>
                            <Text style={styles.title}>Nenhum time sorteado.</Text>
                        </View>
                    )}
                </ScrollView>
            <CustomButton title="Exportar" onPress={()=>{}}
                backgroundColor="#050517" textColor="#D9D9D9"
                pressedBackgroundColor="#0077B6"/>
        </View>
    </ImageBackground>
    );
}

export default DrawResult;