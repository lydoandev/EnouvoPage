import React, { Component } from 'react'
import { View, CheckBox, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class ItemTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item != this.props.item) {
      this.setState({
        item: this.props.item
      })
    }
  }

  deleteItem = () => {
    var { id } = this.props.item;
    this.props.deleteTask(id)
  }

  update = () => {
    let { item } = this.props;

    item.isCompleted = !item.isCompleted;
    this.props.updateStatus(item);
  }

  render() {
    const { task, isCompleted } = this.state.item;
    return (
      <View style={styles.task}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <CheckBox
            center
            title='Click Here'
            value={isCompleted}
            onChange={this.update}
          />
          <Text style={styles.taskText} type='h5White'>{task}</Text>
        </View>
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
