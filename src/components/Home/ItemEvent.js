import React, { Component } from 'react'
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native'

export default class ItemEvent extends Component {

  moveDetail = () => {
    var { item } = this.props;
    this.props.moveDetail(item);
  }

  render() {
    var { title, date, imageUrl, address } = this.props.item;
    return (
      <TouchableOpacity style={{ flex: 1, flexDirection: 'column', margin: 10 }}
        onPress={this.moveDetail}>
        <Image style={styles.image} source={{ uri: imageUrl }}></Image>
        <Text style={styles.date}>{date.en}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address.en}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    borderRadius: 20
  },
  date: {
    marginTop: 5,
    color: 'red',
    fontSize: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  address: {
    color: '#8c8c8c'
  }
})
