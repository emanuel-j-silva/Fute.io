import React, { useState } from "react";
import {Text, View, ImageBackground, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import CustomButton from "../../components/CustomButton";
import GroupCard from "./components/GroupCard";
import NewGroupModal from "./components/NewGroupModal";

import { mockGroups } from "../../data/mockGroups";
import styles from "./styles";
import { RootStackParamList } from "../../../types/navigation";

type GroupsNavigationProp = StackNavigationProp<RootStackParamList, "Groups">

function Groups() {
    const navigation = useNavigation<GroupsNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

    const handleCardPress = (name: string) => {
    navigation.navigate("GroupDetails", { title: name });
    };

  const handleCardLongPress = (name: string) => {
    setSelectedGroup(prev => (prev === name ? null : name));
  };

  const handleRemove = () => {
    if (!selectedGroup) return;
    // API remove group logic
    // após remover, limpar seleção
    setSelectedGroup(null);
  };

    return(
    <ImageBackground
        style = {styles.background}
        source={require("../../../assets/images/groups-wallpaper.png")}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <Text style={styles.title}>Grupos</Text>
            <View style={styles.buttonsRow}>
                <View style={{flex: 1}}>
                    <CustomButton title="Novo Grupo" onPress={()=> setModalVisible(true)} 
                    fontSize={12} backgroundColor="#03045E" pressedBackgroundColor="#0077B6"
                        paddingHorizontal={30} paddingVertical={30} />
                </View>
                <View style={{flex: 1}}>
                    <CustomButton title="Remover Grupo" onPress={handleRemove} 
                    disabled={!selectedGroup}
                    fontSize={12} backgroundColor="#03045E" pressedBackgroundColor="#ED2929"
                    paddingHorizontal={30} paddingVertical={30}/>
                </View>
            </View>
            <ScrollView>
                {mockGroups.map((group,index) =>(
                    <GroupCard key={index} 
                        name={group.name} numPlayers={group.numberOfPlayers} location={group.location} 
                        selected={selectedGroup === group.name}
                        onPress={()=> handleCardPress(group.name)}
                        onLongPress={()=> handleCardLongPress(group.name)}/>
                ))}
            </ScrollView>

            <NewGroupModal visible={modalVisible} onClose={()=> setModalVisible(false)}/>
        </View>
    </ImageBackground>
    );
}

export default Groups;