import { store } from '../store'

export const FETCH_TASKS = "FETCH_TASKS"
export const FETCH_TASKS_SUCCESSED = "FETCH_TASKS_SUCCESSED"

export const ADD_TASK = "ADD_TASK"
export const ADD_TASK_SUCCESSED = "ADD_TASK_SUCCESSED"

export const UPDATE_TASK = "UPDATE_TASK"
export const UPDATE_TASK_SUCCESSED = "UPDATE_TASK_SUCCESSED"

export const DELETE_TASK = "DELETE_TASK"
export const DELETE_TASK_SUCCESSED = "DELETE_TASK_SUCCESSED"

export const addTask = (task) => {
  return { type: ADD_TASK, payload: task }
}

export const updateTask = (task) => {
  return { type: UPDATE_TASK, payload: task }
}

export const deleteTask = (task) => {
  return { type: DELETE_TASK, payload: task }
}

export const fetchTasks = () => {
  return { type: FETCH_TASKS }
}
























// For handle data in local, without API
// export const addNew = (newTask) => {
//   const tasks = store.getState().todoReducer.tasks;
//   return { type: "ADD_TASK", payload: [...tasks, newTask] }
// }

// export const deleteTask = (id) => {
//   const tasks = store.getState().todoReducer.tasks;
//   console.log("BEFORE FILTER", tasks);
//   var updatedTasks = [];
//   updatedTasks = tasks.filter(task => task.id !== id)
//   console.log("AFTER FILTER", updatedTasks);
//   return { type: "UPDATE_TASK", payload: [...updatedTasks] }
// }

// export const updateTask = (updatedTask) => {
//   const tasks = store.getState().todoReducer.tasks;
//   let task = tasks.find(task => task.id === updatedTask.id)
//   task = updatedTask;
//   console.log("TASK", task)
//   return { type: "UPDATE_TASK", payload: [...tasks] }
// }