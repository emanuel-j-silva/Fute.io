import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background:{
        minWidth: "100%",
        minHeight: "100%",
        backgroundColor: "black"
    },
    overlay:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    content:{
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20
    }
});

export default styles;