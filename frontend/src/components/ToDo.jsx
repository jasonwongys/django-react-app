import { useState, useEffect } from "react";
import api from "../api";

function ToDo(type) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const formattedDate = new Date(date.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log("TYPE: ", type);  

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title, type })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setDate(formattedDate);
  }, []);

  return (
    <div>
      <h2>Create a To Do Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <label>{type}</label>
        <br />
        {/* <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select> */}
        <label for="date">Date: {date}</label>

        <input type="submit" value="Submit" ></input>
      </form>
    </div>
  );
}

export default ToDo;
