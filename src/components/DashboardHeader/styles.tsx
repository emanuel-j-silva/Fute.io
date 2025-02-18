import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "row",
        width: "100%",
        maxHeight: "15%",
        alignItems: "center",
        paddingTop: 15
    },
    profileContainer:{
        marginHorizontal: 20,
        marginTop: 15
    },
    name:{
        fontFamily: "FasterOne",
        fontSize: 30,
        color: "#FFFFFF"
    },
    subtitle:{
        color: "#82828B"
    }
});

export default styles;