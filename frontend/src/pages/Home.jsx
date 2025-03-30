import { useState, useEffect } from "react";
import api from "../api";   
import Note from "../components/Note";
import "../styles/home.css"


const Home = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {setNotes(data), console.log(data)})
        .catch((err) => alert(err))
    }

    const deleteNote = async (id) => {
        api.delete(`/api/notes/delete/${id}`)
        .then((res) => {
            if(res.status === 204)alert("Note deleted successfully");
            else alert("Failed to delete note");
            getNotes();
        })
        .catch((err) => alert(err)) 
        
    }

    const createNote = async (e) => {
        e.preventDefault();
        api.post("/api/notes/", {title, content})
        .then((res) => {
            if(res.status === 201)alert("Note created successfully");
            else alert("Failed to create note");
            getNotes();
        })
        .catch((err) => alert(err))
        
    }

    return <div>
        
        <div>
            <h2>Notes</h2>
            {notes.map((note) => <Note key={note.id} note={note} onDelete={deleteNote} />)}
        </div>

        <h2>Create Note</h2>

        <form onSubmit={createNote}>
            <label htmlFor="title">Title</label>
            <br />  
            <input type="text" id="title" value={title} name="title" required
            onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label htmlFor="content">Content</label>
            <br />
            <textarea id="content" value={content} name="content" required
            onChange={(e) => setContent(e.target.value)} />
            <br />
            <button type="submit" value="submit">Create Note</button>
        </form>
    </div>
};

export default Home


