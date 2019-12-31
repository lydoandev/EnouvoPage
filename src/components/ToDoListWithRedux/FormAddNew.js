import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import DatePicker from 'react-native-datepicker'


export default class FormAddNew extends Component {

  constructor(props) {
    super(props);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    this.state = {
      task: "",
      date: date + "/" + month + "/" + year
    }
  }

  onChangeText = (task) => {
    this.setState({
      task
    })
  }

  addNew = () => {
    this.props.addNew(this.state);
  }

  render() {

    return (
      <View style={{ flex: 1, flexDirection: 'column', marginBottom: 20, marginTop: 20 }}>
        <TextInput style={{ height: 42, borderColor: '#bfbfbf', borderWidth: 1, borderRadius: 5 }}
          onChangeText={(text) => this.onChangeText(text)}
          placeholder='Task Description'></TextInput>
        <View style={{
          flex: 1, flexDirection: 'row',
          justifyContent: 'space-evenly', marginTop: 20
        }}>
          <DatePicker
            date={this.state.date}
            mode='date'
            format="DD/MM/YYYY"
            display="default"
            onDateChange={(date) => { this.setState({ date }) }} />
          <TouchableOpacity style={styles.btnAdd} onPress={this.addNew}>
            <Text style={{ color: '#fff' }}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnAdd: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ff6666'
  }
})


