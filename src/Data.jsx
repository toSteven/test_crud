function Data({ lastname, firstname, yearlevel, student_id }) {
  return (
    <section className="container mt-5">
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
          <tr>
            <td>{lastname}</td>
            <td>{firstname}</td>
            <td>{yearlevel}</td>
            <td className="text-center">
              {/* update button */}
              <button className="btn btn-success btn-sm ">Update</button>

              {/* delete button */}
              <button className="btn btn-danger btn-sm ms-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Data;
