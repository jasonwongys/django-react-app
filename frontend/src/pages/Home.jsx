import { useState, useEffect } from "react";
import api from "../api";

import NoteCard from "../components/NoteCard";
import CreateNote from "../components/CreateNote";

import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [showModalPopup, setShowModalPopup] = useState(false);

  // const [notetype, setNoteType] = useState("");

  function handleToggleModalPopup() {
    setShowModalPopup(!showModalPopup);
  }

  function onClose() {
    setShowModalPopup(false);
  }

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log("DATA", data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };
  const editNote = (id) => {
    api
      .put(`/api/notes/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };
  useEffect(() => {
    getNotes();
  }, []);

  // console.log("Note type", notetype);

  return (
    <main className="leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed bg-slate-800 rounded-xl ">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="notes-section">
            <h4 className="text-3xl font-extrabold">To Do</h4>
            <button
              className="bg-gradient-to-r from-green-800 to-green-500 hover:from-green-500 hover:to-green-500 text-white font-bold 
          py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out mx-2 shadow-xl"
              onClick={handleToggleModalPopup}
            >
              Add Note
            </button>
            {showModalPopup && <CreateNote onClose={onClose} />}
            {notes
              .filter((note) => note.type === "to-do")
              .map((note) => (
                <NoteCard
                  note={note}
                  onDelete={deleteNote}
                  onEdit={editNote}
                  key={note.id}
                />
              ))}
          </div>
          <div className="notes-section">
            <h4 className=" text-3xl font-extrabold">In Progress</h4>
            <button
              className="bg-gradient-to-r from-green-800 to-green-500 hover:from-green-500 hover:to-green-500 text-white font-bold 
          py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out mx-2 shadow-xl"
              onClick={handleToggleModalPopup}
            >
              Add Note
            </button>
            {showModalPopup && <CreateNote onClose={onClose} />}
            {notes
              .filter((note) => note.type === "in-progress")
              .map((note) => (
                <NoteCard note={note} onDelete={deleteNote} key={note.id} /> // displays all in progress notes
              ))}
          </div>

          <div className="notes-section">
            <h4 className="text-3xl font-extrabold">Completed</h4>
            <button
              className="bg-gradient-to-r from-green-800 to-green-500 hover:from-green-500 hover:to-green-500 text-white font-bold 
          py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out mx-2 shadow-xl"
              onClick={handleToggleModalPopup}
            >
              Add Note
            </button>
            {showModalPopup && <CreateNote onClose={onClose} />}

            {notes
              .filter((note) => note.type === "completed")
              .map((note) => (
                <NoteCard note={note} onDelete={deleteNote} key={note.id} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
