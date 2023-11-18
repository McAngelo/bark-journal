import { useState, useEffect } from 'react';
import './App.css';

export interface Note {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    /* const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data") || "[]");
    setNotes(savedNotes); */

    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/notes');
        const {status, data, message} = await response.json();

        if(status == 200)
        {
          console.log('Success');
          console.log(data);
          setNotes(data);
        }
        else
        {
          console.log('Error');
        }
      } catch (error) {
        console.log(error);        
      }
      
    };

    fetchNotes();
  }, []);

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote: Note = {
      id: Math.random(),
      title: title,
      content: content,
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
    
    if(!selectedNote) return;

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotes = notes.map((note) => (note.id === selectedNote?.id ? updatedNote : note));
    setNotes(updatedNotes);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}>
        <input type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title' required />
        <textarea placeholder='Content'
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  required></textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        ):(
          <button type="submit"> Add Note </button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item" onClick={()=> handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}> X </button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
