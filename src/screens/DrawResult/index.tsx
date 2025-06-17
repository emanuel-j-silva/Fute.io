import React from "react";
import {Text, View, ImageBackground, ScrollView, BackHandler, Alert} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

import CustomButton from "../../components/CustomButton";
import { RootStackParamList } from "../../../types/navigation";
import TeamCard from "./components/TeamCard";

import styles from "./styles";

type DrawResultNavigationProp = StackNavigationProp<RootStackParamList, "DrawResult">;
type DrawResultRouteProp = RouteProp<RootStackParamList, "DrawResult">;


function DrawResult() {
    const navigation = useNavigation<DrawResultNavigationProp>();
    const route = useRoute<DrawResultRouteProp>();
    const { teams, timestamp } = route.params;

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

    const handleExport = async () => {
        if (!teams || teams.length === 0) {
            Alert.alert("Erro", "Não há resultados de sorteio para exportar.");
            return;
        }

        let exportText = "*RESULTADO DO SORTEIO*\n\n";

        teams.forEach(team => {
            exportText += `*Time ${team.numeralName}*\n`;
            if (team.players && team.players.length > 0) {
                team.players.forEach(player => {
                    exportText += `- ${player.name}\n`;
                });
            } else {
                exportText += "- Nenhum jogador\n";
            }
            exportText += "\n";
        });

        let formattedTimestamp = '';
        if (timestamp) {
            try {
                const date = new Date(timestamp);
                formattedTimestamp = date.toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
            } catch (e) {
                console.error("Erro ao formatar timestamp:", e);
                formattedTimestamp = "Data/Hora inválida";
            }
        } else {
            formattedTimestamp = "Não disponível";
        }
        
        exportText += `Sorteio realizado em: *${formattedTimestamp}*\n`;

        try {
            await Clipboard.setStringAsync(exportText);
            Alert.alert("Sucesso", "Resultado do sorteio copiado para a área de transferência!");
        } catch (error) {
            console.error("DRAW RESULT SCREEN: Erro ao copiar para a área de transferência:", error);
            Alert.alert("Erro", "Não foi possível copiar o resultado. Tente novamente.");
        }
    };

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
            <CustomButton title="Exportar" onPress={handleExport}
                backgroundColor="#050517" textColor="#D9D9D9"
                pressedBackgroundColor="#0077B6"/>
        </View>
    </ImageBackground>
    );
}

export default DrawResult;