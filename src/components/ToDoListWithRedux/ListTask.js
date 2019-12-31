

import React, { Component } from 'react'
import { Text, FlatList, SectionList, ActivityIndicator, ScrollView, StyleSheet, Alert, View } from "react-native";
import ItemTask from './ItemTask';
import FormAddNew from './FormAddNew';
import { connect } from 'react-redux'
import * as actions from '../../reduxs/todoRedux/actions'
import callMockAPI from "../../utils/callMockAPI"

class ListTask extends Component {

  constructor(props) {
    super(props);
    this.props.fetchTasks();
  }

  componentDidUpdate(prevProps) {
    console.log("Prev props: ", prevProps);
    console.log("Cur props: ", this.props);
  }

  addNew = (newTask) => {
    var { task, date } = newTask;
    this.props.addNew({ id: this.props.tasks.length + 1, task, date });
  }

  deleteTask = (id) => {
    this.props.deleteTask(id);
  }

  updateStatus = (updatedTask) => {
    this.props.updateTask(updatedTask);
  }

  sort = (tasks) => {

    tasks.sort((a, b) => {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA > dateB ? 1 : -1;
    });
    return tasks
  }

  convertArrayToSections = (data) => {
    let res = data.reduce((re, item) => {
      let existObj = re.find(
        obj => obj.date === item.date
      )
      if (existObj) {
        existObj.data.push(item)
      } else {
        re.push({
          date: item.date,
          data: [item]
        })
      }
      return re
    }, []);
    return res;
  }

  render() {
    const { tasks } = this.props;
    var data = this.convertArrayToSections(tasks);
    return (
      <ScrollView style={styles.taskList}>
        <FormAddNew addNew={this.addNew}></FormAddNew>
        <SectionList
          sections={data}
          extraData={this.props}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ItemTask item={item} deleteTask={this.deleteTask} updateStatus={this.updateStatus} currentStatus={item.isCompleted} />}
          renderSectionHeader={({ section: { date } }) => (
            <Text style={styles.dateText}>{date}</Text>
          )}
          onRefresh={this.getData}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  taskList: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'column'
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold"
  }
})



function mapStateToProps(state) {

  return {
    tasks: state.todoReducer.tasks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTasks: () => dispatch(actions.fetchTasks()),
    addNew: (newTask) => dispatch(actions.addTask(newTask)),
    updateTask: (task) => dispatch(actions.updateTask(task)),
    deleteTask: (id) => dispatch(actions.deleteTask(id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListTask);