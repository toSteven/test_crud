import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

function InputData() {
  const [student, setStudent] = useState({
    lastname: "",
    firstname: "",
    yearlevel: "",
  });

  const addStudent = () => {
    // fetch data
    const database = getFirestore(firebaseApp);

    if (
      student.lastname === "" ||
      student.firstname === "" ||
      student.yearlevel === ""
    ) {
      alert("Missing fields!");
    } else {
      setStudentList((studentList) => [...studentList, student]);
      addDoc(collection(database, "data"), student);

      setStudent({
        lastname: "",
        firstname: "",
        yearlevel: "",
      });
    }
  };

  return (
    <section className="text-center">
      <h1 className="display-4 my-3">Input Data Page Component</h1>

      {/* input lastname */}
      <label htmlFor="lastname">Last Name</label>
      <input
        id="lastname"
        type="text"
        placeholder="last name"
        className="form-control"
        value={student.lastname}
        onChange={(e) =>
          setStudent({
            ...student,
            lastname: e.target.value,
          })
        }
      />

      <p className="m-5"></p>

      {/* input firstname */}
      <label htmlFor="firstname">First Name</label>
      <input
        id="firstname"
        type="text"
        placeholder="last name"
        className="form-control"
        value={student.firstname}
        onChange={(e) =>
          setStudent({
            ...student,
            firstname: e.target.value,
          })
        }
      />

      <p className="m-5"></p>

      {/* input yearlevel */}
      <label htmlFor="yearlevel">Year Level</label>
      <input
        id="yearlevel"
        type="number"
        placeholder="last name"
        className="form-control"
        value={student.yearlevel}
        onChange={(e) =>
          setStudent({
            ...student,
            yearlevel: e.target.value,
          })
        }
      />

      <button className="btn btn-dark mt-5">+Add</button>
    </section>
  );
}

export default InputData;
