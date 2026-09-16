import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
 
export const saveUserProfile = async (userId, data) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { ...data, createdAt: new Date().toISOString() });
};
 
export const getUserProfile = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) return docSnap.data();
  throw new Error('No se encontró el perfil');
};
 
export const updateUserProfile = async (userId, updatedData) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, updatedData);
};
 