import React, { useState } from "react";


function MomLivePad({meeting}) {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue) {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div className="notepad">
      <div className="notepad-header">
        <h2></h2>
      </div>
      <div className="notepad-form">
        <input
          type="text"
          className="notepad-input"
          placeholder="Write something..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="notepad-add-btn" onClick={handleAddItem}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.85714 16C7.30486 16 6.85714 15.5523 6.85714 15V10.1429C6.85714 9.59057 6.40943 9.14286 5.85714 9.14286H0.999999C0.447715 9.14286 0 8.69514 0 8.14286V7.85714C0 7.30486 0.447715 6.85714 1 6.85714H5.85714C6.40943 6.85714 6.85714 6.40943 6.85714 5.85714V0.999999C6.85714 0.447715 7.30486 0 7.85714 0H8.14286C8.69514 0 9.14286 0.447715 9.14286 1V5.85714C9.14286 6.40943 9.59057 6.85714 10.1429 6.85714H15C15.5523 6.85714 16 7.30486 16 7.85714V8.14286C16 8.69514 15.5523 9.14286 15 9.14286H10.1429C9.59057 9.14286 9.14286 9.59057 9.14286 10.1429V15C9.14286 15.5523 8.69514 16 8.14286 16H7.85714Z" fill="#442B48"/>
</svg>

        </button>
      </div>
      <ul className="notepad-list">
        {items.map((item, index) => (
          <li className="notepad-item" key={index}>
            <p className="notepad-item-text">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MomLivePad;
