import React, { Component } from 'react'
import { View, CheckBox, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ItemTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: props.item.isCompleted
    }
  }

  deleteItem = async () => {
    var { id } = this.props.item;
    await this.props.deleteItem(id)
  }

  isCompleted = () => {
    var { id } = this.props.item;
    console.log("Before", this.state.isCompleted)
    this.setState(prevState => ({
      isCompleted: !prevState.isCompleted,
    }), () => {
      this.props.isCompleted(id, this.state.isCompleted);
    });
  }

  render() {
    const { id, task, isCompleted } = this.props.item;
    console.log('log--state ', this.state)
    return (
      <View style={styles.task}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <CheckBox
            center
            title='Click Here'
            value={this.state.isCompleted}
            onChange={this.isCompleted}
          />
          <Text style={styles.taskText} type='h5White'>{task}</Text></View>
        {/* <Icon name='edit' style={{ color: '#FD7E14' }} size={18}></Icon> */}
        <TouchableOpacity onPress={this.deleteItem}>
          <Icon name='trash' style={{ color: 'red', margin: 7 }} size={19}></Icon>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  task: {
    justifyContent: 'space-between',
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    margin: 3,
    height: 40,
    flex: 1,
    flexDirection: "row",
    borderColor: '#d9d9d9',
    borderWidth: 1,
    alignItems: 'center'
  },
  taskText: {
    fontSize: 15
  }
})
