import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <form className="note-form">
        <input type="text" className="note-input" placeholder='Title' required/>
        <textarea placeholder='Content' rows={10}></textarea>
        <button type="submit" className="note-submit"> Add Note </button>
      </form>
      <div className="notes-grid">
        <div className="notes-item">
          <div className="notes-header">
            <button> X </button>
          </div>
          <h2> Title </h2>
          <p> Content </p>
        </div>
      </div>
    </div>
  );
};

export default App;
