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
        rowGap: 30,
    },
    content:{
        flex: 1,
        width: "100%",
        paddingHorizontal: 18,
        paddingBottom: 35
    },
    cardsRow:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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