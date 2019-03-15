// Import configurations
import { firebaseConfig } from "../config/config";

// Import firebase
import firebase from "firebase";
import "firebase/firestore";

// Initialize firebase application
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
