import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        columnGap: "15",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 10,
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    name:{
        flex: 3,
        fontFamily: "FasterOne",
        fontSize: 22,
        alignSelf: "center",
        justifyContent: "flex-start",
        textAlign: "justify"
    },
    overall:{
        flex: 1,
        fontSize: 40,
        fontWeight: "bold",
        alignSelf: "center",
    }

});

export default styles;