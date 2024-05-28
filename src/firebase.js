import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, 
  signInWithRedirect, GoogleAuthProvider, 
  signInWithEmailAndPassword, signInWithPopup, 
  onAuthStateChanged as onAuthStateChangedFirebase,
  signOut as signOutFirebase } from "firebase/auth";


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
    console.log(userCredential);
    return userCredential;
  } catch (error) {
      console.error(error);
    }
  };

const googleProvider = new GoogleAuthProvider();

export const getRedirectResult = async (auth) => {
    try {
      const result = await auth.getRedirectResult();
      console.log(result);
      return result;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData ? error.customData.email : null;
      console.log(email);
      const credential = GoogleAuthProvider.credentialFromError(error);
      if (email) {
        console.log(`Ошибка связана с аккаунтом: ${email}`);
      } else {
        console.log('Не удалось получить email из ошибки');
      }
    }
  };

  export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const user = result.user;
        console.log('Аутентификация через Google успешна:', user);
        return user;
    }
    } catch (error) {
      console.error('Ошибка авторизации через Google:', error);
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
    return userCredential; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
  };

  export const onAuthStateChanged = (callback) => {
    const unsubscribe = onAuthStateChangedFirebase(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('Signed in user:', user);
      console.log(uid);
    }
    callback(user);
    });
    return unsubscribe;
    };


  
 

export const signOut = async () => {
  try {
    await signOutFirebase(auth);
    console.log('Выход выполнен успешно.');
  } catch (error) {
    console.error('Ошибка при выходе из системы:', error);
  }
  };

async function getCities() {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  return citySnapshot.docs.map(doc => doc.data());
}

export async function getSeeds() {
  try {
    const seedsCol = collection(db, 'seeds');
    const seedsSnapshot = await getDocs(seedsCol);
    const seedsList = seedsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return seedsList;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return []; 
  }
  }

  export async function getLunarCalendar() {
    try {
      const seedsCol = collection(db, 'lunar calendar');
      const seedsSnapshot = await getDocs(seedsCol);
      const seedsList = seedsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(seedsList);
      return seedsList;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    return []; 
    }
    }
  

export { auth, db };
 



