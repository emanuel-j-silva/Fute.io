import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%",
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        paddingHorizontal: 5
    },
    title:{
        color: "#050517",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 10,
        marginBottom: 20,
    },
    scroll:{
        marginBottom: 10
    },
    placeholderText: {
            color: '#050517',
            textAlign: 'center',
            marginTop: 20,
            fontSize: 16,
            fontStyle: 'italic',
        },
        placeholderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
        }
});

export default styles;