import React , {useState} from 'react';
import './Note.css';
//and the markup syntax highlighter for the note component
//I could also add a transition that allows the note to animate as it is being created.

const Note = (props) => {
    const { id, inputText, onDelete, onUpdate, textHandler} = props;
    const [ isText , setIsText ] = useState(false);
 
     const handleDelete = () => {
       onDelete(id);
     };
     
    
    //this could be better utilized as a save button.
    // const handleUpdate = (newContent) => {
    //   onUpdate(id, newContent);
    // };

   
  const charLimit = 1000;
  const charUsed = inputText.length;
  const charLeft = charLimit - inputText.length;
  return (
    <div>
      <div className="note">
        <div className="tools">
          <button className="edit" /*onClick={handleUpdate}*/>
            <i class="fas fa-edit"></i>
          </button>
          <button className="delete" onClick={handleDelete}>
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>

        <div className={`main ${isText ? "" : "hidden"}`}></div>
        <textarea
          cols="10"
          rows="5"
          placeholder="Type...."
          className={`${isText ? "hidden" : ""}`}
          onChange={(e) => {
            onUpdate(id, e.target.value);
            textHandler(e);
          }}
          value={inputText}
        >
        </textarea>
        <span> {charUsed} / {charLimit} </span>
      </div>
    </div>
  );
}

export default Note
