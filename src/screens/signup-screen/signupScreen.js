import React from "react";
import { Platform } from "react-native";
import { Content, Form, Item, Input, Body, Button, Text } from "native-base";
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

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
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

  handleSignUp = () => {
    if (
      this.state.email != "" &&
      this.state.password === this.state.confirmPassword
    ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.props.navigation.navigate("AuthLoading");
        })
        .catch(function(error) {
          alert(error.message);
        });
    } else {
      alert("Error in user credentials");
    }
  };

  gotoLoginScreen = () => {
    this.props.navigation.navigate("Login");
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
            {/* Signup title */}
            <Body style={{ marginTop: 60, marginBottom: 40 }}>
              <Text info style={styles.titleText}>
                REGISTER
              </Text>
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

            {/* Confirm password input box */}
            <Item rounded block style={styles.inputItem}>
              <MaterialCommunityIcons
                name="lock"
                style={styles.icon}
                size={32}
              />
              <Input
                secureTextEntry
                style={styles.inputBox}
                value={this.state.confirmPassword}
                onChangeText={confirmPassword =>
                  this.setState({ confirmPassword })
                }
                placeholder="Confirm Password"
                placeholderTextColor="white"
                autoCapitalize="none"
              />
            </Item>

            {/* Signup button */}
            <Item style={styles.buttonItem}>
              <Body>
                <Button
                  rounded
                  block
                  info
                  onPress={this.handleSignUp}
                  style={styles.button}
                >
                  <Text>Register</Text>
                </Button>
              </Body>
            </Item>

            {/* Text content */}
            <Item style={styles.textItem}>
              <Text style={{ color: "white", marginLeft: 30 }}>
                Already registered ?
                <Text
                  style={{ color: "lightblue" }}
                  onPress={this.gotoLoginScreen}
                >
                  &nbsp;&nbsp;&nbsp; Login Here
                </Text>
              </Text>
            </Item>
          </Form>
        </KeyboardAwareScrollView>
      </AppBackground>
    );
  }
}
