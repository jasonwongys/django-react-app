import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

function CreateNote() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(true);

  const formattedDate = new Date(date.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setDate(formattedDate);
  }, []);

  // const closeModal = () => {
  //   setOpen(false);
  //   console.log("setOPen val", open);

  //   navigate("/");
  // };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title, type })

      .then((res) => {
        if (res.status === 201) {
          //alert("Note created!");
          navigate("/");
        } else alert("Failed to make note.");
      })
      .catch((err) => alert(err));
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
            <div className="mt-1">
              <p className="text-sm text-gray-500">
                <form onSubmit={createNote}>
                  <div className="space-y-10">
                    <div className="border-b border-gray-900/10 pb-2">
                      <DialogTitle
                        as="h3"
                        className="text-base font-bold leading-6 text-gray-900"
                      >
                        Create Note
                      </DialogTitle>{" "}
                      <label
                        htmlFor="title"
                        className=" text-md font-medium leading-6 text-gray-900"
                      >
                        Title:
                      </label>
                      <br />
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                      <label
                        htmlFor="content"
                        className=" text-md font-medium leading-6 text-gray-900"
                      >
                        Content:
                      </label>
                      <br />
                      <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      ></textarea>
                      <br />
                      <label
                        htmlFor="type"
                        className=" text-md font-medium leading-6 text-gray-900"
                      >
                        Type:
                      </label>
                      <select
                        name="type"
                        id="type"
                        onChange={(e) => setType(e.target.value)}
                        required
                      >
                        <option value={null}>---</option>
                        <option value="to-do">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          value="Submit"
                          onClick={() => setOpen(false)}
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setOpen(false)}
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

export default CreateNote;
