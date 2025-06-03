import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    minWidth: "100%",
    minHeight: "100%",
    backgroundColor: "black"
  },
  overlay:{
    flex:1,
    paddingTop: 40,
    paddingBottom: 20,
    maxWidth: "100%",
    paddingHorizontal: 20,
  },
  title:{
    textAlign: "center",
    fontSize: 52,
    color: "white",
    fontFamily: "FasterOne",
    marginBottom: 25
  },
  buttonsRow:{
    flexDirection: "row",
    alignSelf: "center",
    columnGap: 10,
    marginBottom: 35
  },
  loadingView:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#050517"
  }
});

export default styles;