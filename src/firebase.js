import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider, 
  signInWithEmailAndPassword, onAuthStateChanged as onAuthStateChangedFirebase } from "firebase/auth";
import { signOut as signOutFirebase } from "firebase/auth";
import { useSelector } from 'react-redux';

// firebase deploy --token "1//03X4fDRRXU2mRCgYIARAAGAMSNwF-L9Irg7RzYfb8bFAas7SRs5iC7mQI4xHEV8u0LuXy0cqUrk1D3RxEVL9eK4W05S1Iqfnp8Y4"
console.log(process.env);


const firebaseConfig = {
  apiKey: 'AIzaSyCmnHEFBn2QRKnWvtrV9bgdiCDWfROSWxs',
  authDomain: 'progect-calendar.firebaseapp.com',
  projectId: 'progect-calendar',
  storageBucket: 'progect-calendar.appspot.com',
  messagingSenderId: '437133441316',
  appId: '1:437133441316:web:4e865dfba05ce7e40e1bb1',
  measurementId: 'G-2N28W2P12G'
};
console.log('Hello');


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export const signUp = async (email, password) => {
  try {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  console.log('Регистрация успешна!', userCredential.user);
  return userCredential;
  } catch (error) {
    console.error(error);
    }
  };

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
  const result = await signInWithRedirect(auth, googleProvider);
  console.log(result.user);
  const user = result.user;
  // Обработайте данные пользователя, например, сохраните в Redux
  console.log(user);
  return user;
  } catch (error) {
  console.error(error);
  throw error;
  }
  };



export const singIn = async (email, password) => {
  try {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  console.log(user);
  if (!userCredential) {
  throw new Error('No user returned from signIn');
  }
  console.log(userCredential);
  return userCredential; // Убедитесь, что здесь возвращается объект userCredential
  } catch (error) {
  console.error(error);
  throw error; // Переброс ошибки для последующей обработки
  }
  };

export const onAuthStateChanged = (callback) => {
  return onAuthStateChangedFirebase(auth, (user) => { 
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid);
      // ... additional logic or function calls
      } else {
      // User is signed out
      // ... additional logic or function calls
      }
      // Execute the callback function with user data
      callback(user);
  })
}

export const signOut = async () => {
  try {
    await signOutFirebase(auth);
    console.log('Выход выполнен успешно.');
  } catch (error) {
    console.error('Ошибка при выходе из системы:', error);
  }
  };
// Пример использования функции getCities
async function getCities() {
const citiesCol = collection(db, 'cities');
const citySnapshot = await getDocs(citiesCol);
return citySnapshot.docs.map(doc => doc.data());
}

export { auth, db };
 



