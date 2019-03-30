// Add Category Page
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
  Icon,
  List,
  ListItem,
  Separator,
  Input
} from "native-base";

// Import firebase app
import { firebase } from "../../setup/fireApp";

// Import components
import AppHeader from "../../components/app-header/appHeader";

// Import vecter icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// import styles
import { styles } from "./styles";

// create database instance
var db = firebase.firestore();

export default class AddCategoryScreen extends Component {
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
        <AppHeader header={"Add Category"}/>
        <Content padder>
            <List>
                <Separator bordered style={styles.sectionHeader}>
                    <Text style={styles.headerText}>CATEGORY NAME</Text>
                </Separator>
                <Input
                    style={styles.inputField}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder="Enter Name"
                    placeholderTextColor="rgba(48, 48, 48, 0.8)"
                />

                <Separator bordered style={styles.sectionHeader}>
                    <Text style={styles.headerText}>REMINDERS</Text>
                </Separator>
                <View style={{flex:1, flexDirection: 'row'}}>
                  <Input
                      style={styles.inputField}
                      value={this.state.email}
                      onChangeText={email => this.setState({ email })}
                      placeholder="Enter Reminder"
                      placeholderTextColor="rgba(48, 48, 48, 0.8)"
                  />
                  <Button rounded info>
                    <Text>Add</Text>
                  </Button>
                </View>
                <FlatList
                    data={this.state.FlatListItems}
                    renderItem={({ item }) => (
                    <Card>
                        <CardItem>
                            <Text style={styles.item}> {item.reminder} </Text>
                            <Text style={styles.item}> {item.time}</Text>
                            <Right>
                                <Button
                                transparent
                                onPress={this.delreminder.bind(this, item.key, item.date)}
                                >
                                <MaterialCommunityIcons
                                    name="delete"
                                    size={32}
                                />
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                    )}
                />

            </List>
        
        </Content>
      </Container>
    );
  }

//   //  Delete Reminder function
//   delreminder(key, date) {
//     db.collection("reminders")
//       .doc(this.state.userid)
//       .collection(date)
//       .doc(key)
//       .delete()
//       .then(function() {
//         alert("Document successfully deleted!");
//       })
//       .catch(function(error) {
//         alert("Error removing document: ", error);
//       });
//   }
}
