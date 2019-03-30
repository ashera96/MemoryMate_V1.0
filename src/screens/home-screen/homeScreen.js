// Index page for home screen
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem,
  CheckBox,
  Icon,
  Badge
} from "native-base";

// Import firebase app
import { firebase } from "../../setup/fireApp";

// Import components
import { HomeCalendar } from "../../components/home-calendar/homeCalendar";
import AppHeader from "../../components/app-header/appHeader";

// import styles
import { styles } from "./styles";

// create database instance
var db = firebase.firestore();

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      FlatListItems: []
    };
  }

  // wait till external fonts loading
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userid: user.uid });
      }
    });
    this.setState({ isReady: true });
  }

  // State update function
  updateState(data) {
    this.setState(data);
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <AppHeader />
        <Content padder>
          <HomeCalendar updateHomeState={this.updateState.bind(this)} />
          <FlatList
            data={this.state.FlatListItems}
            renderItem={({ item }) => (
              // <Card>
              //   <CardItem>
              //     <Text style={styles.item}> {item.reminder} </Text>
              //     <Text style={styles.item}> {item.time}</Text>
              //     <Right>
              //       <Button
              //         transparent
              //         onPress={this.delreminder.bind(this, item.key, item.date)}
              //       >
              //         <Icon name="menu" />
              //       </Button>
              //     </Right>
              //   </CardItem>
              // </Card>
              <Card>
            <CardItem header bordered>
            <Left>
            <CheckBox color="light"/>
            </Left>
            <Left>
            <Text style={{color:"#00C1FF"}}> {item.time}</Text>
            </Left>
              <Right>
                <Button small light>
                <Icon name='trash' />
                </Button>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {item.reminder}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
            
              
            </CardItem>
          </Card>
            )}
          />
        </Content>
      </Container>
    );
  }

  //  Delete Reminder function
  delreminder(key, date) {
    db.collection("reminders")
      .doc(this.state.userid)
      .collection(date)
      .doc(key)
      .delete()
      .then(function() {
        alert("Document successfully deleted!");
      })
      .catch(function(error) {
        alert("Error removing document: ", error);
      });
  }
}
