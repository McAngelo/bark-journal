import { useState } from 'react';
import './App.css';

export interface Note {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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
        <button type="submit" className="note-submit"> Add Note </button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="notes-item" onClick={()=> handleNoteClick(note)}>
            <div className="notes-header">
              <button> X </button>
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
