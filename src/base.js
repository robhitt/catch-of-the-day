import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBatdJ7ezy0rsCX5IIVEC1EhlafPCGKmIQ",
  authDomain: "catch-of-the-day-rob-hitt.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-rob-hitt.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;