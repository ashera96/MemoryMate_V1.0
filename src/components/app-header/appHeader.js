import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { Header, Left, Right, Button, Body, Title, Icon } from "native-base";

// Import styles
import { styles } from "./styles";

// App header component class
class AppHeader extends Component {
  render() {
    return (
      <Header transparent>
        <Left>
          <Button
            transparent
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Icon style={{ color: "black" }} name="menu" />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "black" }}> {this.props.header} </Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

export default withNavigation(AppHeader);
