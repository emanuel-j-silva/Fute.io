import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, Pressable, ActivityIndicator,
    FlatList, LayoutRectangle, UIManager, findNodeHandle } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { GroupInfo } from "../../../../../types/group";
import { getGroups } from "../../../../services/api/endpoints/groups";
import { AuthContext } from "../../../../contexts/AuthContext";

import styles from "./styles";
import { Modal } from "react-native-paper";

interface GroupItemProps {
    onGroupSelect: (groupId: string | null) => void;
    selectedGroupId: string | null;
}

function GroupItem({onGroupSelect, selectedGroupId} : GroupItemProps) {
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState<GroupInfo[]>([]);
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [dropdownPos, setDropdownPos] = useState<LayoutRectangle | null>(null);
    const buttonRef = useRef(null);

    const { token, isLoadingAuth } = useContext(AuthContext);

    const fetchGroups = useCallback(async () => {
        if (!token || isLoadingAuth) {
            console.warn("GROUP ITEM: Token não disponível ou autenticação em andamento. Não carregando grupos.");
            setLoadingGroups(false);
            return;
        }

        setLoadingGroups(true);
        try {
            const data = await getGroups();
            setGroups(data);
        } catch (error) {
            Alert.alert("Erro", "Erro ao carregar a lista de grupos.");
        } finally {
            setLoadingGroups(false);
        }
    }, [token, isLoadingAuth]);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

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

    const handleSelect = (group: GroupInfo) => {
        onGroupSelect(group.id);
        setOpen(false);
    };

    const selectedGroupName = selectedGroupId
        ? groups.find(group => group.id === selectedGroupId)?.name
        : null;

     return (
        <View style={styles.container}>
            <TouchableOpacity ref={buttonRef} style={styles.button} onPress={toggleDropdown}>
                <Text style={styles.placeholder}>
                    {selectedGroupName ?? "Escolha um Grupo"}
                </Text>
                <MaterialCommunityIcons name={open ? "arrow-up-bold" : "arrow-down-bold"}
                    size={24}
                    color="#D9D9D9"
                />
            </TouchableOpacity>

            {open && dropdownPos && (
                <Pressable style={styles.overlayPressable} onPress={() => setOpen(false)}>
                    <View
                        style={[
                            styles.dropdown,
                            {
                                position: "absolute",
                                top: dropdownPos.y,
                                left: dropdownPos.x,
                                width: dropdownPos.width,
                            },
                        ]}
                    >
                        {loadingGroups ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="small" color="#0077B6" />
                                <Text style={styles.loadingText}>Carregando Grupos...</Text>
                            </View>
                        ) : groups.length > 0 ? (
                            <FlatList
                                data={groups}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleSelect(item)}>
                                        <Text style={styles.item}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                                scrollEnabled={true}
                            />
                        ) : (
                            <View style={styles.loadingContainer}>
                                <Text style={styles.loadingText}>Nenhum grupo encontrado.</Text>
                            </View>
                        )}
                    </View>
                </Pressable>
            )}
        </View>
    );
}

export default GroupItem;