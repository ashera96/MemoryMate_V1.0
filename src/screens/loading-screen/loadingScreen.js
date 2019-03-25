import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

// Import firebase app
import { firebase } from "../../setup/fireApp";

// Import components
import { AppBackground } from "../../components/app-backgroud/appBackground";

// Import styles
import { styles } from "./styles";

// Import app theme
import { Theme } from "../../setup/theme";

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Home" : "Login");
    });
  }

  render() {
    return (
      <AppBackground imageLink={Theme.primaryBackgroundImage}>
        <View style={styles.container}>
          <Text style={styles.text}>Loading MemoryMate Application</Text>
          <ActivityIndicator size="large" />
        </View>
      </AppBackground>
    );
  }
}
