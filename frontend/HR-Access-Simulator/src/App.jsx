import { useState } from "react";
import axios from "axios";

function App() {
  const [results, setResults] = useState([]);

  const handleSimulate = async () => {
    try {
      const res = await axios.get("http://localhost:5000/simulate");
      console.log("Simulation results:", res.data);
      setResults(res.data);
    } catch (err) {
      console.error("Error calling backend:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>HR Access Simulator</h1>

      <button
        onClick={handleSimulate}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Simulate Access
      </button>

      {results.length > 0 && (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", marginTop: "10px" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Room</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, index) => (
              <tr key={index}>
                <td>{r.id}</td>
                <td>{r.room}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
