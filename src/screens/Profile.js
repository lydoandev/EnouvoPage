import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import SocialMedia from '../components/Home/SocialMedia'
import { connect } from 'react-redux'
import * as userAction from '../reduxs/authRedux/actions'

class Profile extends Component {

  render() {
    var { name, email, phoneNumber } = this.props.data.user;
    console.log("Data at profile, ", this.props.data.user)
    return (
      <View style={{ marginHorizontal: 10, }}>
        <View style={{ justifycontent: 'center', alignItems: 'center' }}>
          <Image source={require('../images/coverImage.jpg')} style={styles.coverImage}></Image>
          <Image source={require('../images/avatar.jpg')} style={styles.avatar}></Image>
          <Text style={{ top: 45, fontSize: 20 }}>{name}</Text>
          <View style={{ top: 42, flexDirection: 'row' }}>
            <Icon name='map-marker' size={20}></Icon>
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Việt Nam</Text>
          </View>
        </View>
        <View style={{ margin: 20, top: 40 }}>
          <SocialMedia icon='envelope' text={email} bgColor='#ff9999' color='#ff4d4d'></SocialMedia>
          <SocialMedia icon='phone' text={phoneNumber} bgColor='#99ddff' color='#1ab2ff'></SocialMedia>
          <SocialMedia icon='cog' text='Settings' bgColor='#ffccb3' color='#ff884d'></SocialMedia>
        </View>
        <View style={{ justifycontent: 'center', alignItems: 'center', margin: 50, }}>
          <TouchableOpacity style={styles.btnLogin} onPress={this.props.logout}>
            <Text style={styles.loginText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  coverImage: {
    height: 250,
    width: 360,
    borderRadius: 30,
    position: "relative"
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: "absolute",
    top: 200
  },
  btnLogin: {
    height: 40,
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
    logout: () => dispatch(userAction.logout()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);