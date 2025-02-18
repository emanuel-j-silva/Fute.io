import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#F0F0F1BF",
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        borderRadius: 25,
        paddingTop: 15,
        paddingHorizontal: 5
    },
    title:{
        fontSize: 16,
        textAlign: "center"
    },
    subtitle:{
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center"
    },
    content:{
        fontFamily: "FasterOne",
        textAlign: "center",
        paddingVertical: 30
    },
    contentWithNoFotter:{
        fontFamily: "FasterOne",
        textAlign: "center",
        marginTop: 15
    },
    footer:{
        fontSize: 14,
        textAlign: "center",
        marginBottom: 5
    }
});

export default styles;