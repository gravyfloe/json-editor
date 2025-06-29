// src/components/JSONEditor.jsx
import React, { useState } from 'react';

function JSONEditor({ data, setData }) {
  const [expandedActs, setExpandedActs] = useState({});
  const [expandedEncounters, setExpandedEncounters] = useState({});

  const toggleAct = (i) => {
    setExpandedActs(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const toggleEncounter = (i, j) => {
    const key = `${i}-${j}`;
    setExpandedEncounters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateActField = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const removeAct = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const addAct = () => {
    const newData = [...data, { title: 'New Act', actDescription: '', encounters: [], summary: '' }];
    setData(newData);
  };

  const addEncounter = (actIndex) => {
    const newData = [...data];
    newData[actIndex].encounters.push({
      id: '',
      displayName: '',
      image: '',
      scenario: '',
      options: []
    });
    setData(newData);
  };

  const removeEncounter = (actIndex, encIndex) => {
    const newData = [...data];
    newData[actIndex].encounters.splice(encIndex, 1);
    setData(newData);
  };

  const updateEncounterField = (actIndex, encIndex, field, value) => {
    const newData = [...data];
    newData[actIndex].encounters[encIndex][field] = value;
    setData(newData);
  };

  const addOption = (actIndex, encIndex) => {
    const newData = [...data];
    newData[actIndex].encounters[encIndex].options.push({
      text: '',
      outcome: {
        image: '',
        text: '',
        shipHealthChange: 0,
        treasureChange: 0,
        crewHealthChange: 0,
        nextId: ''
      }
    });
    setData(newData);
  };

  const removeOption = (actIndex, encIndex, optIndex) => {
    const newData = [...data];
    newData[actIndex].encounters[encIndex].options.splice(optIndex, 1);
    setData(newData);
  };

  const updateOptionField = (actIndex, encIndex, optIndex, field, value) => {
    const newData = [...data];
    newData[actIndex].encounters[encIndex].options[optIndex][field] = value;
    setData(newData);
  };

  const updateOutcomeField = (actIndex, encIndex, optIndex, field, value) => {
    const newData = [...data];
    newData[actIndex].encounters[encIndex].options[optIndex].outcome[field] = value;
    setData(newData);
  };

  return (
    <div>
      <h2></h2>
      <button onClick={addAct}>Add Act</button>
      {data.map((act, i) => (
        <div key={i} className="editor-section">
          <h3 onClick={() => toggleAct(i)} style={{ cursor: 'pointer' }}>{act.title || 'Untitled'} {expandedActs[i] ? '▲' : '▼'}</h3>
          {expandedActs[i] && (
            <>
              <label>Act Title</label>
              <input
                value={act.title}
                onChange={(e) => updateActField(i, 'title', e.target.value)}
              />
              <label>Act Description</label>
              <textarea
                value={act.actDescription}
                onChange={(e) => updateActField(i, 'actDescription', e.target.value)}
              />
              <label>Summary</label>
              <textarea
                value={act.summary}
                onChange={(e) => updateActField(i, 'summary', e.target.value)}
              />
              <button onClick={() => removeAct(i)}>Remove Act</button>

              <h4>Encounters</h4>
              <button onClick={() => addEncounter(i)}>Add Encounter</button>
              {act.encounters.map((enc, j) => (
                <div key={j} className="editor-subsection">
                  <h5 onClick={() => toggleEncounter(i, j)} style={{ cursor: 'pointer' }}>Encounter {j + 1}: {enc.displayName || 'Untitled'} {expandedEncounters[`${i}-${j}`] ? '▲' : '▼'}</h5>
                  {expandedEncounters[`${i}-${j}`] && (
                    <>
                      <label>Display Name </label>
                      <input
                        value={enc.displayName}
                        onChange={(e) => updateEncounterField(i, j, 'displayName', e.target.value)}
                      />
                      <br/>
                      <label>Scenario Description</label>
                      <textarea
                        value={enc.scenario}
                        onChange={(e) => updateEncounterField(i, j, 'scenario', e.target.value)}
                      />
                      <button onClick={() => removeEncounter(i, j)}>Remove Encounter</button>

                      <h5>Options</h5>
                      <button onClick={() => addOption(i, j)}>Add Option</button>
                      {enc.options.map((opt, k) => (
                        <div key={k} className="editor-subsection">
                          <label>Option Text </label>
                          <input
                            value={opt.text}
                            onChange={(e) => updateOptionField(i, j, k, 'text', e.target.value)}
                          />
                          <br/>
                          <label>Outcome Text </label>
                          <textarea
                            value={opt.outcome.text}
                            onChange={(e) => updateOutcomeField(i, j, k, 'text', e.target.value)}
                          />
                          <label>Outcome Image </label>
                          <input
                            value={opt.outcome.image}
                            onChange={(e) => updateOutcomeField(i, j, k, 'image', e.target.value)}
                          />
                          <br/>
                          <label>Ship Health Change</label>
                          <input
                            type="number"
                            value={opt.outcome.shipHealthChange}
                            onChange={(e) => updateOutcomeField(i, j, k, 'shipHealthChange', +e.target.value)}
                          />
                          <label>Treasure Change</label>
                          <input
                            type="number"
                            value={opt.outcome.treasureChange}
                            onChange={(e) => updateOutcomeField(i, j, k, 'treasureChange', +e.target.value)}
                          />
                          <label>Crew Health Change</label>
                          <input
                            type="number"
                            value={opt.outcome.crewHealthChange}
                            onChange={(e) => updateOutcomeField(i, j, k, 'crewHealthChange', +e.target.value)}
                          />
                          <label>Next Encounter ID </label>
                          <input
                            value={opt.outcome.nextId}
                            onChange={(e) => updateOutcomeField(i, j, k, 'nextId', e.target.value)}
                          />
                          <button onClick={() => removeOption(i, j, k)}>Remove Option</button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default JSONEditor;
