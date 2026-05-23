import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function saveEmergencyReport(data) {

  try {

    await addDoc(collection(db, 'reports'), {
      ...data,
      createdAt: new Date()
    });

    console.log('Report Saved');

  } catch(error) {
    console.error(error);
  }

}

export function listenToReports(callback) {

  onSnapshot(collection(db, 'reports'), (snapshot) => {

    const reports = [];

    snapshot.forEach(doc => {
      reports.push({
        id: doc.id,
        ...doc.data()
      });
    });

    callback(reports);

