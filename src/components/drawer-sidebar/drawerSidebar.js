import React from "react";
import { NavigationActions } from "react-navigation";
import { Container, Text, List, ListItem, Separator } from "native-base";
import { ImageBackground } from "react-native";

// Import firebase app
import { firebase } from "../../setup/fireApp";

// import styles
import { styles } from "./styles";

// define routes array
const routes = ["Home"];

// background image components class
export default class SideBar extends React.Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <Container>
        <ImageBackground
          source={require("../../../assets/background.jpg")}
          style={{
            height: 120,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}
        />
        <List>
          <Separator bordered>
            <Text>SCREENS</Text>
          </Separator>
          <ListItem
            button
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text> Calendar </Text>
          </ListItem>
          <ListItem
            button
            onPress={() => this.props.navigation.navigate("AddTask")}
          >
            <Text> Add Task </Text>
          </ListItem>
          <ListItem
            button
            onPress={() => this.props.navigation.navigate("AddCategory")}
          >
            <Text> Add Category </Text>
          </ListItem>
          <ListItem
            button
            onPress={this.logout.bind(this)}
          >
            <Text> Logout </Text>
          
          </ListItem>

        </List>
      </Container>
    );
  }

   //Logout handler function

   logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        this.props.navigation.navigate("Login");
      })
      .catch(function(error) {});
  }
}
