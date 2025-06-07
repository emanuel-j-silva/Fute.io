import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background:{
        minWidth: "100%",
        minHeight: "100%",
        backgroundColor: "black"
    },
    overlay:{
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 30,
        rowGap: 10
    },
    title:{
    textAlign: "center",
    fontSize: 52,
    color: "white",
    fontFamily: "FasterOne",
    marginBottom: 25
    },
    noTeamsContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#050517"
  },
  
});

export default styles;