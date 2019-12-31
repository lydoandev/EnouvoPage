import axios from 'axios'
import * as Config from '../configs/api'
import { Alert } from 'react-native'

export default function callAPI(endpoint, method = 'GET', body = null, token = '') {
  try {
    return axios({
      method: method,
      url: `${Config.AUTHENTICATION_URL}/${endpoint}`,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
  } catch (e) {
    Alert.alert("Connection Error", "Could not fetch data from API")
  }
};