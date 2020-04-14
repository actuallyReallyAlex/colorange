/* global document, fetch, FormData */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import iPhoneImage from './assets/iphone.png';

const App = (): JSX.Element => {
  const [file, setFile] = useState(null);
  const [sorted, setSorted] = useState(null);
  const [processId, setProcessId] = useState('');

  const handleInputChange = (e: { target: HTMLInputElement }): void => {
    const { files } = e.target;
    setFile(files[0]);
  };

  const handleUpload = (): void => {
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
      }, 2000);
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
      <img
        alt="iPhone"
        src={iPhoneImage}
        style={{
          left: 'calc(50% - 250px)',
          position: 'absolute',
          width: '500px',
        }}
      />
      {sorted && (
        <div
          id="application-container"
          style={{
            display: 'grid',
            height: '975.031px',
            gridGap: '26px',
            gridTemplateColumns: '80px 80px 80px 80px',
            gridTemplateRows: '80px 80px 80px 80px',
            left: 'calc(50% - 250px)',
            padding: '50px',
            position: 'absolute',
            width: '400px',
          }}
        >
          {sorted.map(({ icon, name }, i) => (
            <div
              key={i}
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '80px',
                width: '80px',
              }}
            >
              <img
                src={`data:image/jpeg;base64,${icon.base64}`}
                style={{ borderRadius: '10%', height: '80px', width: '80px' }}
              />
              <span
                style={{
                  textAlign: 'center',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
