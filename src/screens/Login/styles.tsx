import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    minWidth: "100%",
    minHeight: "100%",
    backgroundColor: "black"
  },
  overlay:{
    flex:1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 150,
    marginBottom: 150,
    marginLeft: 40,
    marginRight: 40,
  },
  text:{
    textAlign: "center",
    fontSize: 52,
    color: "white",
    fontFamily: "FasterOne",
    marginBottom: 100
  }
});

export default styles;