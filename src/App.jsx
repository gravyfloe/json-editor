import './styles.css';
import React, { useState } from 'react';
import JSONEditor from '../data/components/JSONEditor';

function App() {
  const [data, setData] = useState(null);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setData(json);
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    if (e.target.files.length > 0) {
      reader.readAsText(e.target.files[0]);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modified_encounters.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>JSON Editor</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {data && (
        <>
          <JSONEditor data={data} setData={setData} />
          <button onClick={handleExport}>Export JSON</button>
        </>
      )}
    </div>
  );
}

export default App;
