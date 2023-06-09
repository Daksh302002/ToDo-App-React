import React, { useState } from "react";
import "../Form.css";

function Form() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      desc,
    };

    if (edit) {
      let copy = users;
      Object.assign(copy[active], user);
      setUsers([...copy]);
      setEdit(false);
      setActive(null);
    } else {
      setUsers([...users, user]);
    }

    setName("");
    setDesc("");
  };

  const onEditClick = (index) => {
    const user = users[index];
    setName(user.name);
    setDesc(user.desc);
    setActive(index);
    setEdit(true);
  };

  const deleteUser = (user) => {
    if (window.confirm("Are you sure you want to delete")) {
      let copy = users.filter((item) => item !== user);

      setUsers([...copy]);
    }
  };

  return (
    <>
    <h1>ToDo App</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="name" class="form-label" style={{color:"white"}}>
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            />
        </div>
        <div class="mb-3">
          <label htmlFor="desc" class="form-label" style={{color:"white"}}>
            Description
          </label>
          <input
            type="desc"
            class="form-control"
            autoComplete="off"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter Description"
            />
        </div>

        <button type="submit" class="btn btn-success">
          {edit ? "Update" : "Add"}
        </button>
      </form>
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr>
                <td>{user.name}</td>
                <td>{user.desc}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => onEditClick(index)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Form;
