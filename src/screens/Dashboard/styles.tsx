import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background:{
        minWidth: "100%",
        minHeight: "100%",
        backgroundColor: "black"
    },
    overlay:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 18,
    },
    cardsRow:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 25
    },
    text:{
        textAlign: "center",
        fontSize: 52,
        color: "white",
        fontFamily: "FasterOne"
    }
});

export default styles;