export const bottomTabs = {
  children: [{
    stack: {
      children: [{
        component: {
          name: 'Home',
          passProps: {
            text: 'This is tab 1'
          }
        }
      }],
      options: {
        topBar: {
          title: {
            text: 'HOME',
            alignment: 'center'
          }
        },
        bottomTab: {
          titleDisplayMode: 'showWhenActive',
          text: 'Home',
          icon: require('../images/home.png'),
          testID: 'FIRST_TAB_BAR_BUTTON'
        }
      }
    }
  },
  {
    component: {
      name: 'ToDoList',
      passProps: {
        text: 'This is tab 2'
      },
      options: {
        topBar: {
          title: {
            text: 'TODOLIST'
          }
        },
        bottomTab: {
          titleDisplayMode: 'showWhenActive',
          text: 'ToDoList',
          icon: require('../images/todolist.png'),
          testID: 'SECOND_TAB_BAR_BUTTON'
        }
      }
    }
  },
  {
    component: {
      name: 'Profile',
      passProps: {
        text: 'This is tab 2'
      },
      options: {
        bottomTab: {
          titleDisplayMode: 'showWhenActive',
          text: 'Profile',
          icon: require('../images/profile.png'),
          testID: 'SECOND_TAB_BAR_BUTTON'
        },
        topBar: {
          title: {
            text: 'Profile'
          }
        }
      }
    }
  }
  ]
}