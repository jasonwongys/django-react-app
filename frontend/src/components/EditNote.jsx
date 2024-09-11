import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

function EditNote() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [noteId, setNoteId] = useState(null);
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchNoteData = (noteId) => {
    api
      .get(`api/notes/${noteId}/`)
      .then((response) => {
        const data = response.data;
        console.log("DATA: ", data);
        setContent(data.content);
        setTitle(data.title);
        setType(data.type);
        console.log(" Edit page note DATA", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      setNoteId(id);
      fetchNoteData(id);
    }
  }, [id]);

  const editNote = (e) => {
    e.preventDefault();
    api
      .put(`/api/notes/edit/${noteId}/`, { title, content, type })
      .then((response) => {
        if (response.status === 200) {
          alert("Note edited!");
          navigate("/");
        } else alert("Failed to delete note.");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("You must be logged in to edit a note.");
        } else {
          alert("An error occurred while editing the note.");
        }
      });
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <DialogTitle
              as="h3"
              className="text-base font-semibold leading-6 text-gray-900"
            >
              Edit Note
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                <form onSubmit={editNote}>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <label htmlFor="title">Title:</label>
                      <br />
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => {
                          setTitle(e.target.value);
                          console.log("TITLE CHANGE");
                        }}
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
                      <label htmlFor="content">Type:</label>
                      <select
                        name="type"
                        id="type"
                        required
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                      >
                        <option value={null}>---</option>
                        <option value="to-do">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <br />
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          value="Submit"
                          data-autofocus
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => {
                            setOpen(false);
                            navigate("/");
                          }}
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </p>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default EditNote;
