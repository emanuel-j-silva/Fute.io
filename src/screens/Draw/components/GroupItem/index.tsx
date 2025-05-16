import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { mockGroups } from "../../../../data/mockGroups";
import styles from "./styles";

interface GroupItemProps{
    groupName?: string;
    color?: string;
}

function GroupItem({groupName, color = "#D9D9D9"} : GroupItemProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (name: string) => {
        setSelected(name);
        setOpen(false);
    }

    return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={()=> setOpen(!open)}>
                    <Text style={styles.placeholder}>
                        {selected ?? "Escolha uma opção"}
                    </Text>
                    <MaterialCommunityIcons name={open ? "arrow-up-bold" : "arrow-down-bold"}
                        size={24} 
                        color={color} 
                    />
                </TouchableOpacity>
                <FlatList data={mockGroups}
                    renderItem={({item}) => <Text style={styles.items}>{item.name}</Text>}
                />
            </View>
    );
}

export default GroupItem;