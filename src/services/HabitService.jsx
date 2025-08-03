import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export const fetchHabits = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const habitsRef = collection(db, `users/${user.uid}/habits`);
  const snapshot = await getDocs(habitsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addHabit = async (habit) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const habitsRef = collection(db, `users/${user.uid}/habits`);
  const docRef = await addDoc(habitsRef, habit);
  return { id: docRef.id, ...habit };
};
