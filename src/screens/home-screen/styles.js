import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: "#eee",
    height: 350
  },
  container: {
    flex: 1,
    backgroundColor: "gray"
  },
  MainContainer: {
    // Setting up View inside content in Vertically center.
    justifyContent: "center",
    flex: 1,
    margin: 10
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

export { styles };
