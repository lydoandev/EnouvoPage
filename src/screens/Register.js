import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"
import InputText from '../components/ToDoList/InputText'
import Title from '../components/ToDoList/Title'
import Error from '../components/ToDoList/Error'
import { bottomTabs } from "../configs/bottomTabs"
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import * as userAction from '../reduxs/authRedux/actions'



// import TextInputState from 'react-native/lib/TextInputState';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        name: "Đoàn Thị Ly",
        email: "ly.dev@gmail.com",
        phone: "0348543343",
        username: "lydevdt",
        pass: "123456",
        confirmPass: "123456"
      },
      errors: {
        nameErr: "",
        emailErr: "",
        phoneErr: "",
        usernameErr: "",
        passErr: "",
        confirmPassErr: ""
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var { isAuthenticated } = this.props.data;
    if (isAuthenticated) {
      Navigation.setRoot({
        root: {
          bottomTabs
        }
      });
    }
  }

  getData = (name, text) => {
    var nameErr = name + "Err";
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [nameErr]: ""
      },
      info: {
        ...prevState.info,
        [name]: text
      }
    }));
  }

  clear = () => {
    this.setState(prevState => ({
      ...prevState,
      info: {
        name: "",
        email: "",
        phone: "",
        username: "",
        pass: "",
        confirmPass: ""
      }
    }));
  }

  checkValidation = () => {
    var { name, email, phone, username, pass, confirmPass } = this.state.info;
    var countErr = 0;
    var { nameErr, emailErr, phoneErr, usernameErr, passErr, confirmPassErr } = this.state.errors;
    nameErr = "";
    emailErr = "";
    phoneErr = "";
    usernameErr = "";
    passErr = "";
    confirmPassErr = "";
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name == "") {
      nameErr = "Name is required";
      countErr++;
    }
    if (email == "") {
      countErr++;
      emailErr = "Email is required";
    } else if (!re.test(String(email).toLowerCase())) {
      countErr++;
      emailErr = "Email is incorrect format";
    }
    if (username == "") {
      usernameErr = "Username is required"
      countErr++;
    }
    if (phone == "") {
      countErr++;
      phoneErr = "Phone is required";
    } else if (phone.length != 10) {
      countErr++;
      phoneErr = "Invalid phone length"
    }
    if (pass == "") {
      countErr++;
      passErr = "Password is required";
      countErr++;
    } else if (pass.length < 6) {
      countErr++;
      passErr += "Invalid password length\n"
    } else if (pass != confirmPass) {
      countErr++;
      confirmPassErr += "Comfirm password not match\n"
    }

    this.setState({
      errors: {
        nameErr,
        emailErr,
        phoneErr,
        usernameErr,
        passErr,
        confirmPassErr
      }
    })

    return countErr;
  }

  login = () => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'LogIn',
        }
      }
    });
  }

  signUp = () => {
    var { name, email, phone, username, pass } = this.state.info;
    if (this.checkValidation() == 0) {
      this.props.register({ username, password: pass, email, name, phoneNumber: phone });
    }
  }

  render() {
    var { name, email, phone, username, pass, confirmPass } = this.state.info;
    var { nameErr, emailErr, phoneErr, usernameErr, passErr, confirmPassErr } = this.state.errors;
    var { loading, error } = this.props.data
    if (loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color="#ff6666" style={{ flex: 1 }} />
        </View>
      )
    } else
      return (
        <ScrollView style={{ flex: 1, margin: 20, flexDirection: 'column' }}>
          <View style={styles.titleContent}><Text style={{ fontSize: 35 }}>ĐĂNG KÍ</Text></View>
          <Error errorText={error}></Error>

          <View style={{ flex: 1, marginBottom: 5, marginTop: 25 }}>
            <Title title="Tên người dùng *"></Title>
            <InputText
              name="name"
              value={name}
              getData={this.getData}
              onSubmitEditing={() => this.refInput.getInnerRef().focus()}
              returnKeyType="next"></InputText>
            <Error errorText={nameErr}></Error>
          </View>
          <View style={{ flex: 1, marginBottom: 5, }}>
            <Title title="Email *"></Title>
            <InputText
              name="email"
              value={email}
              getData={this.getData}
              ref={(r) => this.refInput = r}></InputText>
            <Error errorText={emailErr}></Error>
          </View>
          <View style={{ flex: 1, marginBottom: 5, }}>
            <Title title="Số điện thoại *"></Title>
            <InputText name="phone" value={phone} getData={this.getData}></InputText>
            <Error errorText={phoneErr}></Error>
          </View>
          <View style={{ flex: 1, marginBottom: 5, }}>
            <Title title="Tên tài khoản *"></Title>
            <InputText name="username" value={username} getData={this.getData}></InputText>
            <Error errorText={usernameErr}></Error>
          </View>
          <View style={{ flex: 1, marginBottom: 5, }}>
            <Title title="Mật khẩu *"></Title>
            <InputText pass={true} name="pass" value={pass} getData={this.getData}></InputText>
            <Error errorText={passErr}></Error>
          </View>
          <View style={{ flex: 1, marginBottom: 5, }}>
            <Title title="Xác nhận mật khẩu *"></Title>
            <InputText pass={true} name="confirmPass" value={confirmPass} getData={this.getData}></InputText>
            <Error errorText={confirmPassErr}></Error>

          </View>
          <View style={styles.buttonContent}>
            <TouchableOpacity style={styles.btnLogin} onPress={this.login}><Text style={styles.loginText}>LOGIN</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnSignUp} onPress={this.signUp}><Text style={styles.signUpText}>SIGN UP</Text></TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}><Text>Bằng việc xác nhận tạo tài khoản, bạn đã đồng ý với các</Text> <Text style={{ color: '#67B6BB' }}>điều khoản quy định</Text> của chúng tôi</Text>
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
  btnLogin: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#67B6BB'
  },
  loginText: {
    color: '#67B6BB',
    textAlign: 'center',
  },
  btnSignUp: {
    width: 100,
    justifyContent: 'center',
    backgroundColor: '#67B6BB',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  signUpText: {
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
    register: (user) => dispatch(userAction.register(user)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);