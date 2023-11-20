import { useState, useEffect } from "react";

import firebaseApp from "./Config";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Dashboard() {
  // studentList state
  const [studentList, setStudentList] = useState([]);

  // student object state
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

  const [dataModalVisible, setDataModalVisible] = useState(false); // data modal state
  const [selectedStudent, setSelectedStudent] = useState(null); // selected student state for thres var props

  // show data modal function
  const showDataModal = (student) => {
    setSelectedStudent(student);
    setDataModalVisible(true);
  };

  // hide data modal function
  const hideDataModal = () => {
    setSelectedStudent(null);
    setDataModalVisible(false);
  };

  // edit modal state
  const [editModalVisible, setEditModalVisible] = useState(false);

  // show edit modal function
  const showEditModal = (student) => {
    setSelectedStudent(student);
    setEditModalVisible(true);
  };

  // hide edit modal function
  const hideEditModal = () => {
    setSelectedStudent(null);
    setEditModalVisible(false);
    showDataModal(selectedStudent);
  };

  // search bar state
  const [searchQuery, setSearchQuery] = useState("");

  // filter students
  const filteredStudentList = studentList.filter((student) => {
    const fullName = `${student.lastname} ${student.firstname}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  // auth state
  const [credentials, setCredentials] = useState(false);

  // FETCH DATA
  useEffect(() => {
    // init congif
    const database = getFirestore(firebaseApp);

    try {
      // get data orderby asc from db
      onSnapshot(
        query(collection(database, "data"), orderBy("lastname", "asc")),
        (snapshot) => {
          const snapList = []; // snaplist var

          // get each data
          snapshot.forEach((studentData) => {
            const getStudentData = studentData.data(); // student getter data var
            getStudentData["student_id"] = studentData.id; // set student getter array data as data id from db
            snapList.push(getStudentData); // push data to snaplist
          });

          // set snapList to studentList
          setStudentList(snapList);
        }
      );
    } catch (error) {
      alert("Can't fetch data!"); // error msg
    }

    // auth
    const auth = getAuth(firebaseApp);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCredentials(true);
        const uid = user.uid;
      } else {
        setCredentials(false);
        // user is signout
      }
    });
  }, []);

  // INPUT DATA
  const addStudent = () => {
    // init config
    const database = getFirestore(firebaseApp);

    // object input config
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

  // DELETE DATA
  const deleteStudent = (student_id, lastname, firstname) => {
    //init config
    const database = getFirestore(firebaseApp);

    // confirmation popup
    const userConfirmed = window.confirm(
      `Are you sure you want to delete ${lastname}, ${firstname} data?`
    );

    // confirmation delete
    if (userConfirmed) {
      deleteDoc(doc(database, "data", student_id)); // delete data from db
    }
  };

  // EDIT DATA
  const editStudent = async () => {
    // init config
    const database = getFirestore(firebaseApp);

    try {
      // update data in db
      const studentRef = doc(database, "data", selectedStudent.student_id);

      const updatedStudentData = {
        lastname: selectedStudent.lastname,
        firstname: selectedStudent.firstname,
        yearlevel: selectedStudent.yearlevel,
      };

      updateDoc(updatedStudentData, {
        lastname: selectedStudent.lastname,
        firstname: selectedStudent.firstname,
        yearlevel: selectedStudent.yearlevel,
      });
      alert("Updated");
      hideEditModal();
      hideDataModal();
      showDataModal(updatedStudentData);
    } catch (error) {
      alert("Failed to update!"); // error msg
    }
  };

  if (credentials) {
    return (
      <main className="container mt-5">
        <h1 className="display-4 fw-bold m-5 text-center">Data Records</h1>

        {/* Input Form Button */}
        <section>
          <button className="btn btn-dark mb-3" onClick={InputshowModal}>
            Add Student +
          </button>

          {/* search bar */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Add Student Data Modal */}
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

        {/* Student Data Modal */}
        {dataModalVisible && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog mt-5" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title d-flex justify-content-center">
                    Student Data
                  </h1>
                  {/* close modal button */}
                  <button
                    type="button"
                    className="btn btn-danger close rounded"
                    onClick={hideDataModal}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                {/* Display Data Form */}
                <div className="modal-body">
                  {/* Render the data from selectedStudent */}
                  {selectedStudent && (
                    <section>
                      <h1>Last Name: {selectedStudent.lastname}</h1>
                      <h1>First Name: {selectedStudent.firstname}</h1>
                      <h1>Year Level: {selectedStudent.yearlevel}</h1>
                    </section>
                  )}
                </div>

                <div className="modal-footer d-flex justify-content-center">
                  {/* delete btn */}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteStudent(
                        selectedStudent.student_id,
                        selectedStudent.lastname,
                        selectedStudent.firstname
                      );
                      hideDataModal();
                    }}
                  >
                    Delete
                  </button>
                  {/* edit */}
                  <button
                    className="btn btn-success"
                    onClick={() => showEditModal(selectedStudent)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Data Modal */}
        {editModalVisible && (
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
                    Edit Student
                  </h1>
                  {/* close modal button */}
                  <button
                    type="button"
                    className="btn btn-danger close rounded"
                    onClick={hideEditModal}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                {/* Edit Data Form  */}
                <div className="modal-body">
                  <section className="form-floating mb-3">
                    {/* last name input */}
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      placeholder="Last Name"
                      value={selectedStudent.lastname}
                      onChange={(e) => {
                        setSelectedStudent({
                          ...selectedStudent,
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
                      value={selectedStudent.firstname}
                      onChange={(e) => {
                        setSelectedStudent({
                          ...selectedStudent,
                          firstname: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor="firstname">First Name</label>
                  </section>

                  <section className="form-floating mb-3">
                    {/* yearlevel input */}
                    <input
                      type="text"
                      className="form-control"
                      id="yearlevel"
                      placeholder="Year Level"
                      value={selectedStudent.yearlevel}
                      onChange={(e) => {
                        setSelectedStudent({
                          ...selectedStudent,
                          yearlevel: e.target.value,
                        });
                      }}
                    />
                    <label htmlFor="yearlevel">Year Level</label>
                  </section>
                </div>

                <div className="modal-footer d-flex justify-content-center">
                  {/* confirm edit btn */}
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      editStudent();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                {/* map data to display */}
                {filteredStudentList.map((student) => (
                  <tr key={student.student_id}>
                    <td>{student.lastname}</td>
                    <td>{student.firstname}</td>
                    <td className="text-center">
                      {/* show data button */}
                      <button
                        className="btn btn-success"
                        onClick={() => showDataModal(student)}
                      >
                        Show Data
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    );
  } else {
    return <section>Sign in to see data records.</section>;
  }
}

export default Dashboard;
