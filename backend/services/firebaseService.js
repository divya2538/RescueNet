import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {
    apiKey: "AIzaSyBmyVas_r-UfKUfRLdhyn8JAUwgnSEDLhE",
    authDomain:"rescuenet-emergency.firebaseapp.com" ,
    projectId: "rescuenet-emergency",
    storageBucket: "rescuenet-emergency.firebasestorage.app",
    messagingSenderId: "511962223612",
    appId:  "1:511962223612:web:c67353cb9a55af958d5879"
};

/* =========================
   INITIALIZE FIREBASE
========================= */

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/* =========================
   SAVE EMERGENCY REPORT
========================= */

export async function saveEmergencyReport(data)
{
    try
    {
        const docRef = await addDoc(
            collection(db, "emergencyReports"),
            {
                ...data,
                createdAt: serverTimestamp()
            }
        );

        console.log("🚨 Emergency Saved:", docRef.id);

    }
    catch(error)
    {
        console.error("Firebase Error:", error);
    }
}

/* =========================
   GET ALL REPORTS
========================= */

export async function getEmergencyReports()
{
    const querySnapshot = await getDocs(
        collection(db, "emergencyReports")
    );

    const reports = [];

    querySnapshot.forEach((doc) =>
    {
        reports.push({
            id: doc.id,
            ...doc.data()
        });
    });

    return reports;
}

export { db };