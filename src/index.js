import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDoO_GTUNDHd0B2epmtA3fochkNHvis71U",
  authDomain: "prom-8c27d.firebaseapp.com",
  projectId: "prom-8c27d",
  storageBucket: "prom-8c27d.firebasestorage.app",
  messagingSenderId: "79844287059",
  appId: "1:79844287059:web:7de13a2e4f1ded674c1ca6"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();
const colRef = collection(db, 'answer');

// Handle "Yes" button click
const yesButton = document.querySelector('#yes');
yesButton.addEventListener('click', (e) => {
    document.getElementById("yes").style.display = "none"
    document.getElementById("no").style.display = "none"
    document.getElementById("question").innerHTML = 'I knew you would say YES!!!';
    
    addDoc(colRef, {
        answer: "Yes",
        creacreatedAt: serverTimestamp()
    }).then(() => {
        console.log("Yes clicked!");
        // Clear the page content
    });
});

// Handle "No" button hover and click
const noButton = document.getElementById('no');
const moveButton = () => {
  const yesButtonRect = yesButton.getBoundingClientRect();
  const noButtonWidth = noButton.offsetWidth;
  const noButtonHeight = noButton.offsetHeight;

  let x, y;

  do {
    x = Math.random() * (window.innerWidth - noButtonWidth);
    y = Math.random() * (window.innerHeight - noButtonHeight);
  } while (
    x < yesButtonRect.right &&
    x + noButtonWidth > yesButtonRect.left &&
    y < yesButtonRect.bottom &&
    y + noButtonHeight > yesButtonRect.top
  );

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
};

// Attach event listeners to "No" button
noButton.addEventListener('mouseenter', moveButton);
noButton.addEventListener('click', moveButton);
