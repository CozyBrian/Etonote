import { child, get, getDatabase, ref, set, update } from "firebase/database";
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
export const getUserState = async (userId: string) => {
  const db = getDatabase(app);
  const userState = await get(child(ref(db), "users/" + userId + "/state"));
  if (userState.exists()) {
    console.log(userState.val());

    return userState.val();
  } else {
    return null;
  }
};

export const setUserState = (userId: string, state: any) => {
  if (userId === "dumb") {
    return;
  }

  const db = getDatabase(app);

  update(ref(db, "users/" + userId + "/state"), state).catch((error) => {
    console.log(error);
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
