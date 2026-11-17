// src/data/MockData.js

export const MockUser = {
  name: "Nagy Admin",
  initials: "TE",
  role: "Admin",
  team: "Vezetőség",
  position: "Vezető",
  email: "teszt.elek@csapat.hu",
  phone: "+36 30 123 4567",
  birthDate: "2007. 05. 14.",
  coach: "Szabó Gábor"
};

export const mockUsersList = [
  { id: 1, name: "Teszt Elek", email: "teszt.elek@csapat.hu", role: "Játékos", team: "U19" },
  { id: 2, name: "Szabó Gábor", email: "szabo.gabor@csapat.hu", role: "Edző", team: "U19" },
  { id: 3, name: "Kovács Anna", email: "kovacs.anna@csapat.hu", role: "Admin", team: "Vezetőség" },
  { id: 4, name: "Nagy Bence", email: "nagy.bence@csapat.hu", role: "Játékos", team: "U17" },
  { id: 5, name: "Tóth Márton", email: "toth.marton@csapat.hu", role: "Edző", team: "Felnőtt" }
];

// src/data/MockData.js

export const mockTeamSessions = [
  { id: 301, team: "U18", title: "Taktikai Edzés", date: "2026-11-13", startTime: "16:30", endTime: "18:00", location: "1-es Pálya" },
  { id: 302, team: "U18", title: "Bajnoki Mérkőzés vs. Győr", date: "2026-11-15", startTime: "11:00", endTime: "13:00", location: "Fővárosi Stadion" },
  { id: 303, team: "U19", title: "Erőnléti Tréning", date: "2026-11-14", startTime: "10:00", endTime: "11:30", location: "Konditerem" },
  { id: 304, team: "U19", title: "Edzőmérkőzés", date: "2026-11-16", startTime: "17:00", endTime: "19:00", location: "2-es Pálya" },
  { id: 305, team: "Felnőtt", title: "Csapatedzés", date: "2026-11-13", startTime: "18:00", endTime: "20:00", location: "Center Pálya" },
  { id: 306, team: "U17", title: "Labdás technikai edzés", date: "2026-11-13", startTime: "15:00", endTime: "16:30", location: "3-as Pálya" }
];

// src/data/MockData.js

export const mockTransfers = [
  {
    id: 1,
    playerId: 4,
    playerName: "Nagy Bence",
    fromTeam: "U17",
    toTeam: "U18",
    untilDate: "2026-11-20",
    note: "Hétvégi bajnoki mérkőzés és pénteki taktikai edzés"
  }
];