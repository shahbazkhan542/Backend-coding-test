// DuplicateFinder.tsx

import React, { useState } from 'react';

interface DuplicateFinderProps {}

const DuplicateFinder: React.FC<DuplicateFinderProps> = () => {
  const [inputArray, setInputArray] = useState<string>('');
  const [duplicates, setDuplicates] = useState<number[]>([]);
  const [inputError, setInputError] = useState<string | null>(null);
  const [showNoDuplicatesMessage, setShowNoDuplicatesMessage] = useState<boolean>(false);

  const findDuplicates = () => {
    try {
      setInputError(null);
      setShowNoDuplicatesMessage(false);

      if (!inputArray.trim()) {
        setInputError('Please input values');
        return;
      }

      const arr = inputArray.split(',').map(Number);
      const occurrences: { [key: number]: number } = {};
      const duplicateValues: number[] = [];

      for (const num of arr) {
        occurrences[num] = (occurrences[num] || 0) + 1;

        if (occurrences[num] === 2) {
          duplicateValues.push(num);
        }
      }

      setDuplicates(duplicateValues);
      setShowNoDuplicatesMessage(duplicateValues.length === 0);
    } catch (error) {
      console.error('Error finding duplicates:', error);
    }
  };

  return (
    <div className="container">
      <h1>Duplicate Finder</h1>
      <div className="input-container">
        <label htmlFor="inputArray">Enter an array (comma-separated):</label>
        <input
          type="text"
          id="inputArray"
          value={inputArray}
          onChange={(e) => setInputArray(e.target.value)}
        />
        {inputError && <p className="error">{inputError}</p>}
      </div>
      <button onClick={findDuplicates}>Find Duplicates</button>

      {duplicates.length > 0 ? (
        <div className="result-container">
          <h2>Duplicates:</h2>
          <ul>
            {duplicates.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ) : showNoDuplicatesMessage ? (
        <p>No duplicate values in the array.</p>
      ) : null}
    </div>
  );
};

export default DuplicateFinder;
