import React, {useState , useEffect} from 'react';
import Note from './component/Note';
import './App.css';
import './component/component.css';

const App = () =>  {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]); // saves the note and content but the content won't display unless reloaded

  const addNote = () => {
    setNotes((prevNotes) => [...prevNotes, { id: Date.now(), content: "" }]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const deleteAll = (notes) => {
    setNotes((prevNotes) => []);
  };
  
  //This acts like a kind of save button but this component automatically saves the text as it being written
  const updateNote = (id, newContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };
  //get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="root">
      <div className="fixed-div">
        <div className="space-between">
          <button className="add" onClick={addNote}>
            <i class="fas fa-plus"></i>Add Note
          </button>
          <button className="add" onClick={deleteAll}>
            <i class="fas fa-trash-alt"></i>Delete All
          </button>
        </div>
      </div>

      {notes.map((note, index) => (
        <div className="space">
          <Note
            key={index}
            id={note.id}
            inputText={note.content}
            onDelete={deleteNote}
            onUpdate={updateNote}
            textHandler={textHandler}
          />
        </div>
      ))}
    </div>
  );
}

export default App
