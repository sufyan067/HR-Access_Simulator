function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function simulateAccess(employees) {
  const rooms = {
    "ServerRoom": { minLevel: 2, open: "09:00", close: "11:00", cooldown: 15 },
    "Vault": { minLevel: 3, open: "09:00", close: "10:00", cooldown: 30 },
    "R&D Lab": { minLevel: 1, open: "08:00", close: "12:00", cooldown: 10 }
  };

  const lastAccess = {};
  const results = [];

  for (const emp of employees) {
    const room = rooms[emp.room];
    if (!room) {
      results.push({ ...emp, status: "Denied", reason: "Invalid room" });
      continue;
    }

    const req = toMinutes(emp.request_time);

    if (emp.access_level < room.minLevel) {
      results.push({ ...emp, status: "Denied", reason: "Below required level" });
      continue;
    }

    if (req < toMinutes(room.open) || req > toMinutes(room.close)) {
      results.push({ ...emp, status: "Denied", reason: "Room closed" });
      continue;
    }

    const key = `${emp.id}-${emp.room}`;
    if (lastAccess[key] !== undefined && (req - lastAccess[key]) < room.cooldown) {
      results.push({ ...emp, status: "Denied", reason: `Cooldown not finished (${room.cooldown} mins)` });
      continue;
    }

    lastAccess[key] = req;
    results.push({ ...emp, status: "Granted", reason: `Access granted to ${emp.room}` });
  }

  return results;
}

module.exports = { simulateAccess };
