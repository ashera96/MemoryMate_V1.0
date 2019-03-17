import React, { Component } from "react";
import { ImageBackground } from "react-native";

// Import styles
import { styles } from "./styles";

// Background image component class
class AppBackground extends Component {
  render() {
    return (
      <ImageBackground
        source={this.props.imageLink}
        style={styles.backgroundImage}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

export { AppBackground };
