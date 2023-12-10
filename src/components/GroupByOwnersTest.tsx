import React, { useState } from 'react';

interface GroupByOwnersTestProps {}

const GroupByOwnersTest: React.FC<GroupByOwnersTestProps> = () => {
  const [files, setFiles] = useState<string>('');
  const [result, setResult] = useState<any>(null); // Adjust the type as needed
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGroupByOwners = async () => {
    try {
      setLoading(true);
      setError(null);

      const parsedFiles = JSON.parse(files);

      const response = await fetch('http://localhost:8000/api/group-by-owners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: parsedFiles }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Error processing files. Please check the console for more details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Challenge 4: Group By Owners Test</h2>
      <div className="input-container">
        <label htmlFor="files">Enter files (JSON format):</label>
        <textarea
          id="files"
          value={files}
          onChange={(e) => setFiles(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleGroupByOwners} disabled={loading}>
        Group By Owners
      </button>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GroupByOwnersTest;
