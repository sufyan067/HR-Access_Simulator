# HR Access Simulator

This project is a take-home assessment for **Innovaxel Fall Internship 2025**.  
It simulates employee access to secure rooms in a building based on access levels, room timings, and cooldown periods.

---

##  Tech Stack
- **Frontend:** React (Vite)  
- **Backend:** Node.js + Express  
- **Data Source:** JSON file (no database required)

---

##  Project Structure
HR-Access-Simulator/
│
├── backend/ # Express backend (access rules + API)
│ ├── employees.json
│ ├── rules.js
│ └── server.js
│
├── frontend/ # React frontend (UI + simulate button)
│ └── src/
│ ├── App.jsx
│ └── ...
│
└── README.md # Main branch README (this file)




---

##  Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/sufyan067/HR-Access_Simulator.git
cd HR-Access-Simulator


## Usage
1. Load employees from `employees.json`.
2. Click the **Simulate Access** button.
3. Results will display:
   - ✅ Granted: with reason (e.g., "Access granted to ServerRoom")
   - ❌ Denied: with reason (e.g., "Denied: Below required level")

## Branching Strategy
- **main branch** → contains only `README.md`
- **dev branch** → contains all application code (frontend + backend) with 5+ meaningful commits
