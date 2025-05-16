import React, { useState, useRef } from "react";
import { View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  LayoutRectangle,
  UIManager,
  findNodeHandle } from "react-native"
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
    const [dropdownPos, setDropdownPos] = useState<LayoutRectangle | null>(null);
    const buttonRef = useRef(null);

    const toggleDropdown = () => {
        if (buttonRef.current) {
        const handle = findNodeHandle(buttonRef.current);
        if (handle) {
            UIManager.measure(handle, (_x, _y, width, height, pageX, pageY) => {
            setDropdownPos({ x: pageX, y: pageY + height, width, height });
            setOpen((prev) => !prev);
            });
        }
        }
    };

    const handleSelect = (name: string) => {
        setSelected(name);
        setOpen(false);
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity ref={buttonRef} style={styles.button} onPress={toggleDropdown}>
                <Text style={styles.placeholder}>
                    {selected ?? "Escolha uma opção"}
                </Text>
                <MaterialCommunityIcons name={open ? "arrow-up-bold" : "arrow-down-bold"}
                    size={24} 
                    color={color} 
                />
            </TouchableOpacity>

            {open && dropdownPos && (
                <View
                    style={[styles.dropdown,
                    {
                        position: "absolute",
                        top: dropdownPos.y,
                        left: dropdownPos.x,
                        width: dropdownPos.width,
                    },
                    ]}
                >
                    <FlatList data={mockGroups} keyExtractor={(item)=> item.name}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={()=> handleSelect(item.name)}>
                            <Text style={styles.item}>{item.name}</Text>
                        </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

export default GroupItem;