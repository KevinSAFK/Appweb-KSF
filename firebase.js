import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC_QUcJnpAyF39BZuPqC_CG9PUVEMklMXI",

  authDomain: "appweb-chat.firebaseapp.com",

  projectId: "appweb-chat",

  storageBucket: "appweb-chat.appspot.com",

  messagingSenderId: "433566068768",

  appId: "1:433566068768:web:60bf67c64bfdf65eec4c45"

  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} date
   @param {string} magnitud
   @param {string} type
   @param {string} description
 */
export const saveTask = (title, date, magnitud, type, description) => {
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    return addDoc(collection(db, "tasks"), { title, date, magnitud, type, description, userId });
  } else {
    // Manejar el caso en que el usuario no esté autenticado
    return Promise.reject(new Error("Usuario no autenticado"));
    
  }
};

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));

/**
 * Guardar un nuevo mensaje en el chat usando Cloud Firestore
 * @param {string} username El nombre de usuario del remitente
 * @param {string} message El mensaje enviado
 */
export const saveMessage = (username, message) =>
  addDoc(collection(db, "chat"), { username, message, timestamp: new Date() });

export const onGetMessages = (callback) =>
  onSnapshot(collection(db, "chat"), callback);

export const deleteMessage = (id) => deleteDoc(doc(db, "chat", id));