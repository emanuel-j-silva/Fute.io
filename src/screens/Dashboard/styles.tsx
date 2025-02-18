import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background:{
        minWidth: "100%",
        minHeight: "100%",
        backgroundColor: "black"
    },
    overlay:{
        flex:1,
        justifyContent: "flex-start",
        alignItems:"center",
        rowGap: 30
    },
    cardsRow:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 18,
        marginVertical: 30,
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