import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    margin: 20,
    borderRadius: 25,
    paddingTop: 10,
  },
  closeIcon:{
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  title:{
    fontFamily: "FasterOne",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
    color: "#050517"
  },
  subtitle:{
    fontFamily: "FasterOne",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
    color: "#050517"
  },
  scroll:{
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: "#050517",
    opacity: 0.8,
    margin: 20,
    borderRadius: 25,
  },
  divider:{
    height: 5,
    width: "95%",
    marginVertical: 15,
    alignSelf: "center"
  },
  buttonContainer:{
    paddingHorizontal: 30,
    marginVertical: 20
  }
});

export default styles;