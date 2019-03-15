import React from "react";
import { Platform } from "react-native";
import { Form, Item, Input, Body, Button, Text, Thumbnail } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Import firebase app
import { firebase } from "../../setup/fireApp";

// Import components
import { AppBackground } from "../../components/app-backgroud/appBackground";

// Import styles
import { styles } from "./styles";

// Import vecter icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Import app theme
import { Theme } from "../../setup/theme";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }

  handleLogin = () => {
    var email = this.state.email;
    var password = this.state.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("AuthLoading");
      })
      .catch(function(error) {
        alert(error.message);
      });
  };

  gotoSignupScreen = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    // If screen is not ready to render
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    // If screen is ready to render
    return (
      <AppBackground imageLink={Theme.primaryBackgroundImage}>
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 200 })}
        >
          <Form bordered style={{ margin: 20 }}>
            {/* Logo */}
            <Body style={{ marginTop: 40 }}>
              <Thumbnail source={Theme.logoImage} style={styles.logoImage} />
            </Body>

            {/* Email input box */}
            <Item rounded block style={styles.inputItem}>
              <MaterialCommunityIcons
                name="email"
                style={styles.icon}
                size={32}
              />
              <Input
                style={styles.inputBox}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                placeholderTextColor="white"
                autoCapitalize="none"
              />
            </Item>

            {/* Password input box */}
            <Item rounded block style={styles.inputItem}>
              <MaterialCommunityIcons
                name="lock"
                style={styles.icon}
                size={32}
              />
              <Input
                secureTextEntry
                style={styles.inputBox}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                placeholderTextColor="white"
                autoCapitalize="none"
              />
            </Item>

            {/* Login button */}
            <Item style={styles.buttonItem}>
              <Body>
                <Button
                  rounded
                  block
                  info
                  onPress={this.handleLogin.bind(this)}
                  style={styles.button}
                >
                  <Text>Login</Text>
                </Button>
              </Body>
            </Item>

            {/* Text content */}
            <Item style={styles.textItem}>
              <Text style={{ color: "white", marginLeft: 30 }}>
                Haven't an account ?
                <Text
                  style={{ color: "lightblue" }}
                  onPress={this.gotoSignupScreen}
                >
                  &nbsp;&nbsp;&nbsp; Register Here
                </Text>
              </Text>
            </Item>
          </Form>
        </KeyboardAwareScrollView>
      </AppBackground>
    );
  }
}
