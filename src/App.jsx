import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import firebaseApp from "./FireBaseConfig"; // get firebase config
import {
  getFirestore,
  Firestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import Data from "./Data";
import Navbar from "./NavBar";
import Aside from "./Aside";

function App() {
  // student usestate
  const [student, setStudent] = useState({
    lastname: "",
    firstname: "",
    yearlevel: "",
  });

  // student list usestate
  const [studentList, setStudentList] = useState([]);

  // READ DATA
  useEffect(() => {
    // fetch data
    const database = getFirestore(firebaseApp);

    try {
      onSnapshot(collection(database, "data"), (snapshot) => {
        // temp snapList
        const snapList = [];

        snapshot.forEach((studentData) => {
          // get data from db
          const getStudentData = studentData.data();
          // get id from data
          getStudentData["student_id"] = studentData.id;
          // stored data from snapList
          snapList.push(getStudentData);
        });
        // set state snapList to studentList
        setStudentList(snapList);
      });
    } catch (error) {
      alert("Cant fetch data!");
    }
  }, []);

  return (
    <main>
      {/* Data */}
      {studentList.map((data) => (
        <Data
          key={data.student_id}
          lastname={data.lastname}
          firstname={data.firstname}
          yearlevel={data.yearlevel}
        />
      ))}
    </main>
  );
}

export default App;
