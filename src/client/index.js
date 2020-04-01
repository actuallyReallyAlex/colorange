/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [file, setFile] = useState(null);
  const [sorted, setSorted] = useState(null);
  const [processId, setProcessId] = useState('');

  const handleInputChange = (e) => {
    const { files } = e.target;
    setFile(files[0]);
  };

  const handleUpload = () => {
    const data = new FormData();
    data.append('file', file);

    fetch('/upload', { method: 'POST', body: data })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((res) => setProcessId(res.processId))
            .catch((e) => console.error(e));
        }
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    if (processId) {
      const statusInterval = setInterval(() => {
        fetch(`/status?id=${processId}`)
          .then((response) => {
            if (response.status === 200) {
              response
                .json()
                .then((res) => {
                  setSorted(res);
                  setProcessId('');
                  clearInterval(statusInterval);
                })
                .catch((e) => console.error(e));
            }
          })
          .catch((e) => console.error(e));
      }, 10000);
    }
  }, [processId]);

  return (
    <div>
      <h1>colorange</h1>
      <label htmlFor="file">File</label>
      <input id="file" name="file" onChange={handleInputChange} type="file" />
      <button onClick={handleUpload} type="button">
        UPLOAD
      </button>
      {processId && <span>LOADING</span>}
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
