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
  },
  text:{
    textAlign: "center",
    fontSize: 30,
    color: "white"
  }
});

export default styles;