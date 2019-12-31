import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import SocialMedia from '../components/Home/SocialMedia'
import { Navigation } from 'react-native-navigation'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({ buttonId }) => {
    const { componentId } = this.props;
    if (buttonId === 'close') {
      Navigation.dismissModal(componentId);
    }
  }

  render() {
    var { title, imageUrl, subtitle, address, date, imageList } = this.props.item;
    return (
      <ScrollView style={{ flex: 1, margin: 10 }}>
        <Image style={styles.image} source={{ uri: imageUrl }}></Image>
        <View style={styles.info}>
          <Text style={styles.vanue}>{title}</Text>

          {/* <View style={{ flexDirection: 'row' }}>
            <Icon name='map-marker' style={styles.vanue}></Icon>
            <Text style={styles.vanue}>{address.en}</Text>
          </View> */}

          <View style={{ flexDirection: 'row' }}>
            <Icon name='user' style={styles.vanue}></Icon>
            <Text style={styles.vanue}>{date.en}</Text>
          </View>

        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>IMAGE:</Text>
        <View style={{ height: 130 }}>
          <FlatList
            data={imageList}
            renderItem={({ item }) => (
              <Image style={styles.imageSmall} source={{ uri: item }}></Image>
            )}
            horizontal={true}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>DESCRIPTION:</Text>
        <Text style={{ color: '#b3b3b3', fontSize: 15 }}>
          {subtitle.en}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SOCIAL:</Text>
        <View style={styles.social}>
          <SocialMedia icon='globe' text='enouvo.com' bgColor='#FED8D9' color='#FD6568'></SocialMedia>
          <SocialMedia icon='facebook' text='facebook.com/enouvo' bgColor='#CEDEFE' color='#3668CD'></SocialMedia>
          <SocialMedia icon='instagram' text='instagram.com/enouvo.it.solution' bgColor='#FED9F4' color='#CC6ABF'></SocialMedia>
        </View>
        <TouchableOpacity style={styles.visitSite}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Visit our website</Text>
          <View style={{ height: 30, width: 30, backgroundColor: '#DF2329', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
            <Icon name='arrow-right' style={{ color: '#fff' }} size={17}></Icon>
          </View>
        </TouchableOpacity>
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: "relative",
    height: 250,
    borderRadius: 10
  },
  info: {
    flex: 1,
    top: 200,
    padding: 10,
    position: 'absolute',
  },
  vanue: {
    alignContent: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  imageSmall: {
    height: 100,
    width: 100,
    margin: 10,
    borderRadius: 10
  },
  social: {
    marginTop: 20,
    marginBottom: 20
  },
  visitSite: {
    backgroundColor: '#FC4C50',
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
    flexDirection: 'row',
  }
})

