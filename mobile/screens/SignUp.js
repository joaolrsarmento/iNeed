import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

import api from '../services/api';

export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    first_name: null,
    last_name: null,
    uf: null,
    zip_code: null,
    house_number: null,
    errors: [],
    loading: false
  };

  async handleSignUp() {
    const { navigation } = this.props;
    const { email, username, password, first_name, last_name, phone, city, uf, zip_code, house_number } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!email) errors.push("email");
    if (!username) errors.push("username");
    if (!password) errors.push("password");

    this.setState({ errors, loading: false });
    try{
      const data = {email, username, password, first_name, last_name, phone, city, uf, zip_code, house_number};
      const response = await api.post(`persons`, data);
    }catch(err){
      Alert.alert("Erro!\nTente novamente mais tarde.")
    }

    if (!errors.length) {
      
      Alert.alert(
        "Success!",
        "Your account has been created",
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Browse");
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Sign Up
          </Text>
          <ScrollView showsVerticalScrollIndicator="false">
          <Block middle>
              <Input
                email
                label="Email"
                error={hasErrors("email")}
                style={[styles.input, hasErrors("email")]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
              label="First name"
              error={hasErrors("first_name")}
              style={[styles.input, hasErrors("first_name")]}
              defaultValue={this.state.first_name}
              onChangeText={text => this.setState({ first_name: text })}
            />
            <Input
                label="Last name"
                error={hasErrors("last_name")}
                style={[styles.input, hasErrors("last_name")]}
                defaultValue={this.state.last_name}
                onChangeText={text => this.setState({ last_name: text })}
              />
              <Input
                label="Phone"
                error={hasErrors("phone")}
                style={[styles.input, hasErrors("phone")]}
                defaultValue={this.state.phone}
                onChangeText={text => this.setState({ phone: text })}
              />
              <Input
                label="City"
                error={hasErrors("city")}
                style={[styles.input, hasErrors("city")]}
                defaultValue={this.state.city}
                onChangeText={text => this.setState({ city: text })}
              />
              <Input
                label="UF"
                error={hasErrors("uf")}
                style={[styles.input, hasErrors("uf")]}
                defaultValue={this.state.uf}
                onChangeText={text => this.setState({ uf: text })}
              />
              <Input
                label="Zip code"
                error={hasErrors("zip_code")}
                style={[styles.input, hasErrors("zip_code")]}
                defaultValue={this.state.zip_code}
                onChangeText={text => this.setState({ zip_code: text })}
              />
              <Input
                label="House number"
                error={hasErrors("house_number")}
                style={[styles.input, hasErrors("house_number")]}
                defaultValue={this.state.house_number}
                onChangeText={text => this.setState({ house_number: text })}
              />
              <Input
                label="Username"
                error={hasErrors("username")}
                style={[styles.input, hasErrors("username")]}
                defaultValue={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              />
              <Input
                secure
                label="Password"
                error={hasErrors("password")}
                style={[styles.input, hasErrors("password")]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
              <Button gradient onPress={() => this.handleSignUp()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Sign Up
                  </Text>
                )}
              </Button>

              <Button onPress={() => navigation.navigate("Login")}>
                <Text
                  gray
                  caption
                  center
                  style={{ textDecorationLine: "underline" }}
                >
                  Back to Login
                </Text>
              </Button>
          </Block>
          </ScrollView>
          </Block>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});



// username,
// password,
// first_name,
// last_name,
// phone,
// email,
// city,
// uf,
// zip_code,
// house_number,
// balance = 0