// rules.js

function simulateAccess(employees) {
  const rooms = {
    ServerRoom: { minLevel: 2, open: "09:00", close: "11:00", cooldown: 15 },
    Vault: { minLevel: 3, open: "09:00", close: "10:00", cooldown: 30 },
    "R&D Lab": { minLevel: 1, open: "08:00", close: "12:00", cooldown: 10 },
  };

  const lastAccess = {}; // track cooldown per employee per room
  const results = [];

  for (let emp of employees) {
    const { id, access_level, request_time, room } = emp;
    const rule = rooms[room];

    // Agar room exist hi nahi karta
    if (!rule) {
      results.push({
        ...emp,
        status: "Denied",
        reason: `Denied: Room ${room} not found`,
      });
      continue;
    }

    // 1. Access level check
    if (access_level < rule.minLevel) {
      results.push({
        ...emp,
        status: "Denied",
        reason: "Denied: Below required access level",
      });
      continue;
    }

    // 2. Time check
    if (request_time < rule.open || request_time > rule.close) {
      results.push({
        ...emp,
        status: "Denied",
        reason: `Denied: Room closed at ${request_time}`,
      });
      continue;
    }

    // 3. Cooldown check
    const last = lastAccess[`${id}-${room}`];
    if (last) {
      const diff = timeDiffMinutes(last, request_time);
      if (diff < rule.cooldown) {
        results.push({
          ...emp,
          status: "Denied",
          reason: `Denied: Cooldown period (${rule.cooldown} min) not passed`,
        });
        continue;
      }
    }

    // ✅ Agar sab pass ho gaya → Access Granted
    results.push({
      ...emp,
      status: "Granted",
      reason: `Access granted to ${room}`,
    });

    // update last access time
    lastAccess[`${id}-${room}`] = request_time;
  }

  return results;
}

// Helper → calculate minutes difference
function timeDiffMinutes(t1, t2) {
  const [h1, m1] = t1.split(":").map(Number);
  const [h2, m2] = t2.split(":").map(Number);
  return (h2 * 60 + m2) - (h1 * 60 + m1);
}

module.exports = { simulateAccess };
