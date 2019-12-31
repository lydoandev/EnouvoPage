import React, { Component } from 'react'
import { Keyboard, View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native"
import InputText from '../components/ToDoList/InputText'
import Title from '../components/ToDoList/Title'
import Error from '../components/ToDoList/Error'
import { Navigation } from 'react-native-navigation';
import { bottomTabs } from "../configs/bottomTabs"
import { connect } from 'react-redux'

import * as userAction from '../reduxs/authRedux/actions'

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ly.doan.dev@gmail.com",
      password: "123456",
      emailErr: "",
      passwordErr: ""
    }
  }

  componentDidMount() {
    this.navigateToHome();
  }

  getData = (name, text) => {
    this.setState({
      [name]: text
    })
  }

  checkValidation = () => {
    var { email, password, emailErr, passwordErr } = this.state;
    console.log("Email: ", email);
    console.log("Password: ", password);
    var countErr = 0;
    emailErr = "";
    passwordErr = "";
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email == "") {
      countErr++;
      emailErr = "Email is required";
    } else if (!re.test(String(email).toLowerCase())) {
      countErr++;
      emailErr = "Email is incorrect format";
    }

    if (password == "") {
      countErr++;
      passwordErr = "Password is required";
    }

    this.setState({
      emailErr,
      passwordErr
    })

    return countErr;
  }

  navigateToHome = () => {
    var { isAuthenticated } = this.props.data;
    if (isAuthenticated) {
      Navigation.setRoot({
        root: {
          bottomTabs
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.navigateToHome();
  }

  login = () => {
    Keyboard.dismiss();
    const { email, password } = this.state;

    if (this.checkValidation() == 0) {
      console.log("Không lỗi")
      this.props.login({ email, password });
    } else { console.log("Lỗi") }
  }

  signUp = () => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'Register',
        }
      }
    });
  }

  render() {
    var { password, email, emailErr, passwordErr } = this.state;
    var { loading, error } = this.props.data;
    if (loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color="#ff6666" style={{ flex: 1 }} />
        </View>
      )
    }
    return (
      <ScrollView style={{ flex: 1, margin: 20, flexDirection: 'column' }}>

        <View style={styles.titleContent}><Text style={{ fontSize: 35 }}>ĐĂNG NHẬP</Text></View>
        <Error errorText={error}></Error>
        <View style={{ flex: 1, marginTop: 20, marginBottom: 5 }}>
          <Title title="Email *"></Title>
          <InputText name="email" value={email} getData={this.getData}></InputText>
          <Error errorText={emailErr}></Error>
        </View>
        <View style={{ flex: 1, marginBottom: 5, }}>
          <Title title="Mật khẩu *"></Title>
          <InputText pass={true} name="password" value={password} getData={this.getData}></InputText>
          <Error errorText={passwordErr}></Error>
        </View>
        <View style={styles.buttonContent}>
          <TouchableOpacity style={styles.btnLogin} onPress={this.login}><Text style={styles.loginText}>LOGIN</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btnSignUp} onPress={this.signUp}><Text style={styles.signUpText}>SIGN UP</Text></TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  titleContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20
  },
  btnSignUp: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#67B6BB'
  },
  signUpText: {
    color: '#67B6BB',
    textAlign: 'center',
  },
  btnLogin: {
    width: 100,
    justifyContent: 'center',
    backgroundColor: '#67B6BB',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
  }
})

function mapStateToProps(state) {
  return {
    data: state.authReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user) => dispatch(userAction.login(user)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
