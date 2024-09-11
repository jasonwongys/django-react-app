import React from "react";
// import "../styles/Note.css";
import api from "../api";
import EditNote from "./EditNote";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
// Notes list

function Note({ note, onDelete, onEdit }) {
  // const [note, setNote] = useState([]);
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const id = useParams();

  return (
    <div className="bg-gradient-to-r from-slate-400 to-slate-500 hover:from-gray-500 hover:to-slate-500 text-white font-bold 
          py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out mx-2 shadow-xl">
      <h3 className="text-2xl font-bold capitalize">{note.title}</h3>
      <p className="text-lg font-medium py-2 my-2">{note.content}</p>
      <p className="text-sm font-extralight text-white my-4">
        {formattedDate}
      </p>
      {/* <p className="note-date">{note.author}</p> */}
      <div className="button-container">
        <button
          className="bg-gradient-to-r from-red-800 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-bold py-2 px-4 
          rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
        <button
          className="bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-500 hover:to-blue-500 text-white font-bold py-2 px-7 
        rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out mx-2"
        >
          <Link to={`api/notes/edit/${note.id}/`} className="edit-link">
            Edit
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Note;
