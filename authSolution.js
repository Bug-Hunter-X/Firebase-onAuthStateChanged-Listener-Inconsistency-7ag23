// authSolution.js
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// ... Firebase configuration ...
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Use persistence for offline access
const authPersistence = getAuth().setPersistence(LOCAL);

let unsubscribe;
const setUserStatus = (user) => {
  //Update state or perform other actions based on user authentication
  console.log('User status changed:', user);
}

const handleAuthChange = async () => {
    try {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUserStatus(user);
      });
    } catch (error) {
      console.error('onAuthStateChanged error:', error);
    }
}

handleAuthChange();
// ... rest of your application code ...

// Clean up listener when component unmounts (if applicable)
export const cleanUp = () => {
  if (unsubscribe) {
      unsubscribe();
  }
}
