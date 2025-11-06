// firebase.js
// Configurazione Firebase completa per Pagnottella 🍞

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// --- CONFIGURAZIONE UFFICIALE DEL TUO PROGETTO ---
const firebaseConfig = {
  apiKey: "AIzaSyBdzIpnU3cKHnNz4oGsZIePASf80WuMeM0",
  authDomain: "pagnottella-99866.firebaseapp.com",
  projectId: "pagnottella-99866",
  storageBucket: "pagnottella-99866.firebasestorage.app",
  messagingSenderId: "208956252521",
  appId: "1:208956252521:web:295ea1fb0a494708061df8"
};

// --- Inizializza Firebase ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

console.log("✅ Firebase inizializzato correttamente!");

// -----------------------------------------------------------------------------
// 📦 FIRESTORE (Database menu prodotti)
// -----------------------------------------------------------------------------

// ➕ Aggiungi un prodotto al menu
export async function addMenuItem(name, price, category) {
  try {
    await addDoc(collection(db, "menu_items"), {
      name,
      price,
      category,
      createdAt: new Date()
    });
    console.log("✅ Prodotto aggiunto!");
  } catch (error) {
    console.error("❌ Errore:", error);
  }
}

// 📄 Ottieni tutti i prodotti
export async function getMenuItems() {
  const snapshot = await getDocs(collection(db, "menu_items"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ✏️ Aggiorna un prodotto
export async function updateMenuItem(id, data) {
  await updateDoc(doc(db, "menu_items", id), data);
  console.log(`✏️ Prodotto ${id} aggiornato!`);
}

// 🗑️ Elimina un prodotto
export async function deleteMenuItem(id) {
  await deleteDoc(doc(db, "menu_items", id));
  console.log(`🗑️ Prodotto ${id} eliminato.`);
}

// -----------------------------------------------------------------------------
// 👤 AUTENTICAZIONE (login, logout, registrazione)
// -----------------------------------------------------------------------------

export async function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  return signOut(auth);
}

onAuthStateChanged(auth, (user) => {
  if (user) console.log("👤 Utente loggato:", user.email);
  else console.log("🚫 Nessun utente loggato");
});

export { db, auth, storage };
