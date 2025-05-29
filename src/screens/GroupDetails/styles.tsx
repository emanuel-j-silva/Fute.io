import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    minWidth: "100%",
    minHeight: "100%",
    backgroundColor: "black"
  },
  overlay:{
    flex:1,
  },
  header:{
    backgroundColor: "#050517A0",
    paddingTop: 60,
    borderRadius: 20,
    alignItems: "center"
  },
  content:{
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    rowGap: 20
  },
  title:{
    textAlign: "center",
    fontSize: 42,
    color: "white",
    fontFamily: "FasterOne",
    marginBottom: 50
  },
  buttonsRow:{
    flexDirection: "row",
    alignSelf: "center",
    columnGap: 10,
    marginBottom: 35
  }
});

export default styles;