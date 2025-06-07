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
    overlayPressable: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 5
    },
    dropdown:{
        backgroundColor: '#050517',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0077B6',
        maxHeight: 200,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 10,
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
    loadingContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
        },
        loadingText: {
            marginTop: 10,
            color: '#D9D9D9',
        }
});

export default styles;