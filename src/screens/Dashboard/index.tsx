import React from "react";
import {View, ImageBackground} from "react-native"
import InfoCard from "../../components/InfoCard";
import DashboardHeader from "../../components/DashboardHeader";
import styles from "./styles";

function Dashboard() {
    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/home-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <DashboardHeader name="Emanuel Silva"/>
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
        </View>
    </ImageBackground>
    );
}

export default Dashboard;