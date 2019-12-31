import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import React, { Component } from 'react'

export default class SocialMedia extends Component {
  render() {
    var { bgColor, color, text, icon } = this.props;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <View style={{ height: 27, width: 27, backgroundColor: bgColor, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
          <Icon name={icon} style={{ color: color }} size={20}></Icon>
        </View>
        <Text style={{fontSize: 15}}>{text}</Text>
      </View>
    )
  }
}

