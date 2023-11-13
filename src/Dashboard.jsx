import { useState, useEffect } from "react";

import firebaseApp from "./Config";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

function Dashboard() {
  // studentList state
  const [studentList, setStudentList] = useState([]);

  // student state
  const [student, setStudent] = useState({
    lastname: "",
    firstname: "",
    yearlevel: "",
  });

  // input modal state
  const [InputModalVisible, setInputModalVisible] = useState(false);

  // show input modal function
  const InputshowModal = () => {
    setInputModalVisible(true);
  };

  // show input modal function
  const InputhideModal = () => {
    setInputModalVisible(false);
  };
  // FETCH DATA
  useEffect(() => {
    // init congif
    const database = getFirestore(firebaseApp);

    try {
      onSnapshot(collection(database, "data"), (snapshot) => {
        const snapList = []; // snaplist var

        // get data from db
        snapshot.forEach((studentData) => {
          const getStudentData = studentData.data(); // student getter data var
          getStudentData["student_id"] = studentData.id; // set student getter array data as data id from db
          snapList.push(getStudentData); // push data to to snaplist
        });

        setStudentList(snapList);
      });
    } catch (error) {
      alert("Can't fetch data!"); // error msg
    }
  }, []);

  // INPUT DATA
  const addStudent = () => {
    // init config
    const database = getFirestore(firebaseApp);

    if (
      student.lastname === "" ||
      student.firstname === "" ||
      student.yearlevel === ""
    ) {
      alert("Missing Fields!");
    } else {
      // set the list input to studentList
      setStudentList((setList) => [...setList, student]);

      // add list data to db
      addDoc(collection(database, "data"), student);

      // clear fields
      setStudent({
        lastname: "",
        firstname: "",
        yearlevel: "",
      });
    }
  };

  return (
    <main className="container mt-5">
      <h1 className="display-4 fw-bold m-5 text-center">Data Records</h1>

      {/* Input Form Button */}
      <section>
        <button className="btn btn-dark mb-3" onClick={InputshowModal}>
          Add Student +
        </button>

        {/* Input Data Modal */}
        {InputModalVisible && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title d-flex justify-content-center">
                    Add Student
                  </h1>
                  {/* close modal button */}
                  <button
                    type="button"
                    className="btn btn-danger close rounded"
                    onClick={InputhideModal}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                {/* Input Data Form  */}
                <div className="modal-body">
                  <section className="form-floating mb-3">
                    {/* last name input */}
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      placeholder="Last Name"
                      value={student.lastname}
                      onChange={(e) => {
                        setStudent({
                          ...student,
                          lastname: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor="lastname">Last Name</label>
                  </section>

                  <section className="form-floating mb-3">
                    {/* first name input */}
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      placeholder="First Name"
                      value={student.firstname}
                      onChange={(e) => {
                        setStudent({
                          ...student,
                          firstname: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor="firstname">Fist Name</label>
                  </section>

                  <section className="form-floating mb-3">
                    {/* yearlevel input */}
                    <input
                      type="text"
                      className="form-control"
                      id="yearlevel"
                      placeholder="Year Level"
                      value={student.yearlevel}
                      onChange={(e) => {
                        setStudent({
                          ...student,
                          yearlevel: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor="yearlevel">Year Level</label>
                  </section>
                </div>

                <div className="modal-footer d-flex justify-content-center">
                  {/* submmit button */}
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      addStudent();
                      InputhideModal();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Display Data Form */}
      <section className="card mt-3">
        <div className="card-body">
          <table className="table">
            {/* table header */}
            <thead>
              <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            {/* table data */}
            <tbody>
              {studentList.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.lastname}</td>
                  <td>{student.firstname}</td>
                  <td className="text-center">
                    <button className="btn btn-success">Show Data</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
