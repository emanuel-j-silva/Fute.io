import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 5,
    },
    placeholder:{
        color: "#D9D9D9",
        fontSize: 16
    },
    button:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1E1E2E",
        width: "100%",
        padding: 10,
        borderRadius: 8,
    },
    item:{
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: "#D9D9D9",
        fontSize: 16
    },
    dropdown:{
        backgroundColor: "#050517",
        borderRadius: 8,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
        zIndex: 9999,   
    }
});

export default styles;