import { useState } from "react";

function Modal() {
  const [passwordCorrect, setPasswordCorrect] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    setShowPrompt(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowPrompt(false);

    if (inputValue === "48") {
      setPasswordCorrect(true);
    } else {
      setPasswordCorrect(false);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Click me!</button>
      {showPrompt && (
        <div className="prompt">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="password">Please enter the password:</label>
            <input type="password" id="password" value={inputValue} onChange={handleInputChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {passwordCorrect === true && <p>Password is correct!</p>}
      {passwordCorrect === false && <p>Password is incorrect!</p>}
      <style jsx>{`
        .prompt {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 16px;
          background-color: white;
          border: 1px solid black;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 9999;
        }

        label {
          display: block;
          margin-bottom: 8px;
        }

        input[type="password"] {
          width: 100%;
          padding: 8px;
          font-size: 16px;
          border: 1px solid black;
          border-radius: 4px;
        }

        button[type="submit"] {
          margin-top: 8px;
          padding: 8px;
          font-size: 16px;
          border: 1px solid black;
          border-radius: 4px;
          background-color: #eee;
        }
      `}</style>
    </div>
  );
}

export default Modal;
