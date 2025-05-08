import React from "react";
import {View, ImageBackground} from "react-native"
import { StackNavigationProp } from '@react-navigation/stack';
import InfoCard from "./components/InfoCard";
import DashboardHeader from "./components/DashboardHeader";
import ListPlayerCard from "../../components/ListPlayerCard";
import styles from "./styles";
import FabButton from "../../components/FabButton";

type StackDashList = {
    Dashboard: undefined;
    Draw: undefined;
  };
  
  type DashProps = {
    navigation: StackNavigationProp<StackDashList, "Dashboard">;
  };

function Dashboard({navigation}: DashProps) {
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/home-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <DashboardHeader name="Emanuel Silva"/>
            <View style={styles.content}>
                <View style={styles.cardsRow}>
                    <InfoCard 
                    title="Último" 
                    subtitle="Sorteio" 
                    content={{text: "15/02/25", size: 22}}
                    footer="Grupo Star"
                    />
                    <InfoCard 
                    title="Total de" 
                    subtitle="Sorteios" 
                    content={{text: "15", size: 50}}
                    />
                </View>
                <ListPlayerCard title="Top Jogadores"/>
            </View>
            <FabButton icon="shuffle" onPress={()=> navigation.replace("Draw")}/>
        </View>
    </ImageBackground>
    );
}

export default Dashboard;