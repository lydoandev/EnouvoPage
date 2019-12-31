import { Navigation } from "react-native-navigation";
import Home from './src/screens/Home'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'

import Detail from './src/screens/Detail'
import ToDoList from './src/screens/ToDoList'
import LogIn from './src/screens/LogIn'
import Profile from "./src/screens/Profile"
import Register from "./src/screens/Register"
import { store, persistor } from './src/reduxs/store'
import { Provider } from "react-redux";

Navigation.registerComponent('Home', () => ReducerComponent(Home), () => Home);
Navigation.registerComponent('Detail', () => ReducerComponent(Detail), () => Detail);
Navigation.registerComponent('ToDoList', () => ReducerComponent(ToDoList), () => ToDoList);
Navigation.registerComponent('LogIn', () => ReducerComponent(LogIn), () => LogIn);
Navigation.registerComponent('Profile', () => ReducerComponent(Profile), () => Profile);
Navigation.registerComponent('Register', () => ReducerComponent(Register), () => Register);

console.disableYellowBox = true;

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'LogIn',
      }
    }
  });
});

function ReducerComponent(Component) {
  return (props) => (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider >
  )
}
