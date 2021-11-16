import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9V1asoZbjYqwFHYP5qrxqLf_ZcJn2JPU",
    authDomain: "edusoft-a39c1.firebaseapp.com",
    projectId: "edusoft-a39c1",
    storageBucket: "edusoft-a39c1.appspot.com",
    messagingSenderId: "524521379745",
    appId: "1:524521379745:web:7e7fa6a29ed2600bfedde0",
    measurementId: "G-59CL34KL4B",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
