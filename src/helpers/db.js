import firebase from 'firebase'
import { COLLECTION_CHARTS } from './constants'

let db

export const initialize = () => {
  firebase.initializeApp({
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  })

  db = firebase.firestore()
}

export const saveChart = async chart => await db.collection(COLLECTION_CHARTS).add(chart)

export const getChart = async chartId => {
  const chart = await db.collection(COLLECTION_CHARTS).doc(chartId).get()
  if (chart.exists) {
    return chart.data()
  }
}
