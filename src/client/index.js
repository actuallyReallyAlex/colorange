/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [file, setFile] = useState(null);
  const [sorted, setSorted] = useState(null);

  const handleInputChange = (e) => {
    const { files } = e.target;
    setFile(files[0]);
  };

  const handleUpload = () => {
    const data = new FormData();
    data.append('file', file);

    fetch('/upload', { method: 'POST', body: data })
      .then((response) => response.json())
      .then((res) => setSorted(res));
  };

  return (
    <div>
      <h1>colorange</h1>
      <label htmlFor="file">File</label>
      <input id="file" name="file" onChange={handleInputChange} type="file" />
      <button onClick={handleUpload} type="button">
        UPLOAD
      </button>
      {sorted && (
        <div>
          {sorted.map((name, i) => (
            <p key={i}>{name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
