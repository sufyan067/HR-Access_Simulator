import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

  // JSON file load karna
  useEffect(() => {
    fetch("/employees.json")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>HR Access Simulator</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Access Level</th>
            <th>Request Time</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.id}</td>
              <td>{emp.access_level}</td>
              <td>{emp.request_time}</td>
              <td>{emp.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
