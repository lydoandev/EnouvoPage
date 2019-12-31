import { Navigation } from "react-native-navigation";
import Home from './src/screens/Home'

import Detail from './src/screens/Detail'
import ToDoList from './src/screens/ToDoList'
import LogIn from './src/screens/LogIn'
import Profile from "./src/screens/Profile";

Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Detail', () => Detail);
Navigation.registerComponent('ToDoList', () => ToDoList);
Navigation.registerComponent('LogIn', () => LogIn);
Navigation.registerComponent('Profile', () => Profile);

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
