import { child, get, getDatabase, ref, set } from "firebase/database";
import app from "../firebase/firebase";

export const setUserData = (
  userId: string,
  email: string | null,
  name?: string
) => {
  const db = getDatabase(app);

  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    todoLists: {},
  });
};

export const getUsername = async (userId: string) => {
  const dbRef = ref(getDatabase(app));
  const userN = await get(child(dbRef, `users/${userId}/username`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return userN;
};
