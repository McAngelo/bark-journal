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

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    /* const newNote: Note = {
      id: Math.random(),
      title: title,
      content: content,
    }; */
    try {
      const response = await fetch('http://localhost:4000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, content})
      });
      const {status, data, message} = await response.json();

      setNotes([...notes, data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if(!selectedNote) return;

   try {
      const response = await fetch(
        `http://localhost:4000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const {status, message, data} = await response.json();

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id
          ? data
          : note
      );

      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (e) {
      console.log(e);
    }

   /*  const updatedNotes = notes.map((note) => (note.id === selectedNote?.id ? updatedNote : note));
    setNotes(updatedNotes);
    setTitle("");
    setContent("");
    setSelectedNote(null); */
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

     try {
      await fetch(`http://localhost:4000/api/notes/${noteId}`, {method: 'DELETE'});
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
      
    }
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
