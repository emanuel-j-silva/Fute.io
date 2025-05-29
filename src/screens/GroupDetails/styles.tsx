import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    minWidth: "100%",
    minHeight: "100%",
    backgroundColor: "black"
  },
  overlay:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 40
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