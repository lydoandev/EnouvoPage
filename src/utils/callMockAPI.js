import axios from 'axios'
import * as Config from '../configs/api'
import { Alert } from 'react-native'

export default function callMockApi(endpoint, method = 'GET', body = null) {
  try {
    return axios({
      method: method,
      url: `${Config.BASE_URL}/${endpoint}`,
      data: body
    })
  } catch (e) {
    Alert.alert("Connection Error", "Could not fetch data from API")
  }
};