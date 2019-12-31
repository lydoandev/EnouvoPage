import React, { Component } from 'react'
import { swipeData } from '../data'
import { View, FlatList, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import ItemEvent from '../components/Home/ItemEvent'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      data: swipeData
    })
  }


  moveDetail = (item) => {
    console.log(this.props.componentId);
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'Detail',
            passProps: {
              item
            },
            options: {
              topBar: {
                // visible: false,
                // drawBehind: true,
                title: {
                  text: item.title,
                  alignment: 'center'
                },
                backButton: {
                  id: 'close',
                  size: 5,
                  icon: require("../images/close.jpg"),
                  visible: true
                }
              }
            }
          }
        }]
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, marginHorizontal: 10, }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ItemEvent
              item={item} moveDetail={this.moveDetail}
            />
          )}
        />
      </View>
    )
  }
}
