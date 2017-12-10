import firebase from 'firebase';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm'

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyCZvBy5B5W4zchRBjoCvY2ZWlNR_NBHvfg',
        authDomain: 'authentication-8d2fc.firebaseapp.com',
        databaseURL: 'https://authentication-8d2fc.firebaseio.com',
        projectId: 'authentication-8d2fc',
        storageBucket: 'authentication-8d2fc.appspot.com',
        messagingSenderId: '818283185332'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
}

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner size="large" />
          </View>
      );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
          {this.renderContent()}
      </View>
    );
  }
}
const styles = {
  spinnerStyle: {
    marginTop: 200
  }
};

export default App;
