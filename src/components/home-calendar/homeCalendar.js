import React, { Component } from "react";
import { ScrollView } from "react-native";

// Import calendar component
import { Calendar } from "react-native-calendars";

// Import firebase app
import { firebase } from "../../setup/fireApp";

// Import styles
import { styles } from "./styles";

// -----------------------------------------------------
var list = [];
var db = firebase.firestore();

// background image components class
class HomeCalendar extends Component {
  constructor() {
    super();
    this.state = {
      FlatListItems: []
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userid: user.uid });
      }
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{
            [this.state.selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange"
            }
          }}
        />
      </ScrollView>
    );
  }

  //On day press function
  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
    var self = this;
    // retrive data from firestore
    db.collection("reminders")
      .doc(self.state.userid)
      .collection(day.dateString)
      .onSnapshot(function(querySnapshot) {
        var size = querySnapshot.docs.length;
        if (size == 0) {
          list = [];
          self.props.updateHomeState({ FlatListItems: list }); //update the state in HomeScreen view
          alert("You don't have reminders on this day");
        } else {
          list = [];
          querySnapshot.forEach(function(doc) {
            list.push({
              reminder: doc.data().reminder,
              time: doc.data().time,
              key: doc.data().key,
              date: day.dateString
            });
          });
          self.props.updateHomeState({ FlatListItems: list }); //update the state in HomeScreen view
        }
      });
  }
}

export { HomeCalendar };
