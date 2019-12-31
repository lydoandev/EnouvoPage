

import React, { Component } from 'react'
import { Text, FlatList, SectionList, ActivityIndicator, ScrollView, StyleSheet, Alert } from "react-native";
import ItemTask from './ItemTask';
import FormAddNew from './FormAddNew';
import callMockAPI from "../../utils/callMockAPI"

export default class ListTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tasks: [
      ],
      error: null
    }
  }

  componentDidMount() {
    this.getData();
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

  getData = async () => {
    var data = await callMockAPI("tasks");
    this.setState({
      tasks: this.convertArrayToSections(data),
      loading: true
    });
  }

  addNewTask = async (taskItem) => {
    var { task, date } = taskItem;
    var data = await callMockAPI("tasks");

    var maxId = Math.max(...data.map(item => item.id));
    await callMockAPI("tasks/", "POST", { id: maxId, task, date });
    this.getData();
  }

  deleteItem = async (id) => {
    await callMockAPI("tasks/" + id, "DELETE");
    this.getData();
  }

  isCompleted = async (id, status) => {
    await callMockAPI("tasks/" + id, "PUT", { isCompleted: status });
    this.getData();
  }

  sort = (tasks) => {

    tasks.sort((a, b) => {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA > dateB ? 1 : -1;
    });
    return tasks
  }

  render() {
    const { tasks, loading } = this.state;

    if (!loading) {
      return (<ActivityIndicator size="large" color="#ff6666" />)
    }
    return (
      <ScrollView style={styles.taskList}>
        <FormAddNew addNewTask={this.addNewTask}></FormAddNew>
        <SectionList
          sections={tasks}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ItemTask item={item} deleteItem={this.deleteItem} isCompleted={this.isCompleted} />}
          renderSectionHeader={({ section: { date } }) => (
            <Text style={styles.dateText}>{date}</Text>
          )}
          onRefresh={this.getData}
          refreshing={!loading}
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