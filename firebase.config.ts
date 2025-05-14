import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCDtOwsoKre5oqjIoJsmBYzoxV7LR60qSw',
    authDomain: 'dnd-chat-a8837.firebaseapp.com',
    projectId: 'dnd-chat-a8837',
    storageBucket: 'dnd-chat-a8837.firebasestorage.app',
    messagingSenderId: '864563449838',
    appId: '1:864563449838:web:7209ce2fc10397c6bd08ff',
    measurementId: 'G-Y1WEV8SC08',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
