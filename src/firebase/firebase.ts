import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmdHv1U6OLGLonYH7zL6PB26gf8uPB6L4",
  authDomain: "etonote-dcaa1.firebaseapp.com",
  projectId: "etonote-dcaa1",
  storageBucket: "etonote-dcaa1.appspot.com",
  messagingSenderId: "535496869361",
  databaseURL:
    "https://etonote-dcaa1-default-rtdb.europe-west1.firebasedatabase.app/",
  appId: "1:535496869361:web:b103faab484622eb177050",
};

const app = initializeApp(firebaseConfig);
export default app;
