import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        backgroundColor: "white",
        borderRadius: 35,
        paddingVertical: 10,
        paddingHorizontal: 10 
    },
    icon:{
        marginHorizontal: 5
    },
    textInput: {
        flex: 1,
        padding: 10,
      },
});

export default styles;