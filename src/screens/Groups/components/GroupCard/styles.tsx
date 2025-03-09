import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#050517E6",
    borderRadius: 25,
    paddingBottom: 10
  },
  trashIcon:{
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 15,
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