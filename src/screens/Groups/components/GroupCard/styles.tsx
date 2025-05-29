import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container:{
    flex:1,
    borderRadius: 25,
    paddingTop: 15,
    paddingBottom: 10,
    marginBottom: 10
  },
  title:{
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontFamily: "FasterOne",
    marginBottom: 25
  },
  rowInfo:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "center",
    marginBottom: 15
  },
  subtitle:{
    textAlign: "auto",
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10
  },
});

export default styles;