import { useState, useEffect } from "react";

import firebaseApp from "./FireBaseConfig";
import {
  Firestore,
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Data() {
  // studentList state
  const [studentList, setStudentList] = useState([]);

  // READ DATA FUNCTION
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

  // DELET DATA FUNCTION
  const deleteStudets = (student_id, lastname, firstname) => {
    // fetch data
    const database = getFirestore(firebaseApp);

    const userConfirmed = window.confirm(
      `Are you sure want to delete ${lastname}, ${firstname} data?`
    );

    if (userConfirmed) {
      deleteDoc(doc(database, "data", student_id));
    }
  };

  return (
    <section className="container mt-5">
      <h1 className="display-4 fw-bold m-5 text-center">Data Records</h1>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Year Level</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* map data from db */}
              {studentList.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.lastname}</td>
                  <td>{student.firstname}</td>
                  <td>{student.yearlevel}</td>
                  <td className="text-center">
                    {/* update button */}
                    <button className="btn btn-success btn-sm ">Update</button>

                    {/* delete button */}
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => {
                        deleteStudets(
                          student.student_id,
                          student.lastname,
                          student.firstname
                        );
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Data;
