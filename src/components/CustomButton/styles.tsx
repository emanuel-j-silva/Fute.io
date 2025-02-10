import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button:{
        backgroundColor: "#050517",
        alignSelf: "center",
        borderRadius: 100,
        paddingLeft: "30%",
        paddingRight: "30%",
        paddingTop: 15,
        paddingBottom: 15,
        maxWidth: "75%"
    },
    buttonPressed:{
        opacity: 0.8
    },
    text:{
        color: "white",
        textAlign: "center"
    }
});

export default styles;