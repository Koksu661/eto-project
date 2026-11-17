export const mockEvents = [
  { id: 101, title: "Orvosi vizsgálat", date: "2026-11-16", startTime: "18:00", endTime: "20:00", location: "Fővárosi Stadion", description: "Kötelező részvétel." },
  { id: 102, title: "Taktikai Edzés", date: "2026-11-19", startTime: "14:00", endTime: "16:00", location: "1-es Pálya", description: "Videós elemzés és pontrúgások." },
  { id: 103, title: "Erőnléti Tréning", date: "2026-11-19", startTime: "10:00", endTime: "11:30", location: "Konditerem", description: "Rehabilitáció és törzsizom-erősítés." },
  { id: 104, title: "Erőnléti Tréning", date: "2026-11-20", startTime: "10:00", endTime: "11:30", location: "Konditerem", description: "Rehabilitáció és törzsizom-erősítés." }
];
export const MockUser = {
  name: "Teszt Elek",
  initials: "TE",
  role: "player",
  team: "U19",
  position: "Középpályás",
  email: "teszt.elek@csapat.hu",
  phone: "+36 30 123 4567",
  birthDate: "2007. 05. 14.",
  coach: "Szabó Gábor"
};

export const mockUsersList = [
  {
    id: 1,
    name: "Teszt Elek",
    initials: "TE",
    email: "idk@gmail.com",
    role: "player",
    team: "U19",
    position: "Középpályás",
    phone: "+36 30 123 4567",
    birthDate: "2007. 05. 14.",
    coach: "Szabó Gábor"
  },
  {
    id: 2,
    name: "Nagy Ádám",
    initials: "NA",
    email: "idk@gmail.com",
    role: "player",
    team: "U19",
    position: "Védő",
    phone: "+36 30 987 6543",
    birthDate: "2006. 09. 22.",
    coach: "Szabó Gábor"
  },
]

export const mockAuthUsers = [
  {
    id: 1,
    name: "Teszt Elek",
    initials: "TE",
    email: "jatekos@csapat.hu",
    password: "123",
    role: "player",
    team: "U19",
    position: "Középpályás",
    phone: "+36 30 123 4567",
    birthDate: "2007. 05. 14.",
    coach: "Szabó Gábor"
  },
  {
    id: 2,
    name: "Szabó Gábor",
    initials: "SZG",
    email: "edzo@csapat.hu",
    password: "123",
    role: "coach",
    team: "U19",
    phone: "+36 30 987 6543",
    birthDate: "1985. 09. 22."
  },
  {
    id: 3,
    name: "Kovács Anna",
    initials: "KA",
    email: "admin@csapat.hu",
    password: "123",
    role: "admin",
    team: "Vezetőség",
    phone: "+36 20 555 8899",
    birthDate: "1990. 02. 10."
  }
];

// src/data/MockData.js


export const mockAdminSessions = [
  {
    id: 101,
    team: 'U19',
    coach: 'Szabó Gábor',
    title: 'Taktikai és labdakihozatali edzés',
    date: '2026. 11. 13.',
    time: '18:00 - 19:30',
    avgRating: 4.5,
    avgEmoji: '🔥',
    checkedIn: ['Teszt Elek', 'Nagy Ádám', 'Kiss Bence', 'Varga Dániel'],
    cancelled: [{ name: 'Tóth Márk', reason: 'Betegség / láz' }, { name: 'Kovács Péter', reason: 'Munkahelyi elfoglaltság' }],
    noResponse: ['Horváth Zoltán', 'Molnár Gergő'],
    ratings: [
      { player: 'Teszt Elek', score: 5, emoji: '🔥', comment: 'Nagyon jó tempójú edzés volt!' },
      { player: 'Nagy Ádám', score: 4, emoji: '😎', comment: 'Kemény futások a végén, de hasznos.' },
    ],
  },
  {
    id: 102,
    team: 'U17',
    coach: 'Farkas Péter',
    title: 'Állóképességi alapozás',
    date: '2026. 11. 13.',
    time: '16:30 - 18:00',
    avgRating: 2.3,
    avgEmoji: '🥴',
    checkedIn: ['Balogh Levente', 'Papp Kristóf'],
    cancelled: [],
    noResponse: ['Kerekes Tamás'],
    ratings: [
      {
        player: 'Balogh Levente',
        score: 2,
        emoji: '🥴',
        comment: 'Túl hosszú volt a bemelegítés, kevés labdás rész.',
      },
    ],
  },
  {
    id: 103,
    team: 'Felnőtt',
    coach: 'Horváth István',
    title: 'Mérkőzés előtti átmozgató edzés',
    date: '2026. 11. 13.',
    time: '19:00 - 20:30',
    avgRating: 4.8,
    avgEmoji: '🔥',
    checkedIn: ['Németh Gergely', 'Kovács Tamás', 'Szűcs Bálint', 'Mészáros Dávid'],
    cancelled: [{ name: 'Lakatos Péter', reason: 'Munkahelyi elfoglaltság' }],
    noResponse: [],
    ratings: [
      { player: 'Németh Gergely', score: 5, emoji: '🔥', comment: 'Tökéletes ráhangolódás a hétvégére.' },
      { player: 'Kovács Tamás', score: 5, emoji: '🔥', comment: 'Szuper pontrúgás-gyakorlás.' },
    ],
  },
];

export const mockActiveTransfers = [
  {
    id: 1,
    player: 'Kiss Bence',
    fromTeam: 'U17',
    toTeam: 'U19',
    until: '2026. 11. 18.',
    expiringSoon: false,
  },
  {
    id: 2,
    player: 'Varga Dániel',
    fromTeam: 'U19',
    toTeam: 'Felnőtt',
    until: '2026. 11. 14.',
    expiringSoon: true,
  },
  {
    id: 3,
    player: 'Varga Dániel',
    fromTeam: 'U19',
    toTeam: 'Felnőtt',
    until: '2026. 11. 14.',
    expiringSoon: true,
  },
  {
    id: 4,
    player: 'Varga Dániel',
    fromTeam: 'U19',
    toTeam: 'Felnőtt',
    until: '2026. 11. 14.',
    expiringSoon: true,
  },
];

export const mockAdminStatsy = {
  daily: {
    attendanceRate: 88,
    checkedInCount: 42,
    cancelledCount: 6,
    avgRating: 4.6,
    avgEmoji: '🔥',
    label: 'Mai nap alapján',
  },
  weekly: {
    attendanceRate: 84,
    checkedInCount: 196,
    cancelledCount: 37,
    avgRating: 4.3,
    avgEmoji: '😊',
    label: 'Utolsó 7 nap alapján',
  },
  monthly: {
    attendanceRate: 81,
    checkedInCount: 780,
    cancelledCount: 183,
    avgRating: 4.1,
    avgEmoji: '😎',
    label: 'Utolsó 30 nap alapján',
  },
  all: {
    attendanceRate: 83,
    checkedInCount: 3420,
    cancelledCount: 701,
    avgRating: 4.4,
    avgEmoji: '🔥',
    label: 'Teljes szezon alapján',
  },
};

export const mockArchivedSessions = [
  {
    id: 201,
    team: 'Felnőtt',
    coach: 'Horváth István',
    coachId: 12,
    title: 'Taktikai labdabirtoklás',
    date: '2026-11-12',
    time: '18:00 - 19:30',
    avgRating: 4.5,
    avgEmoji: '🔥',
    attendeeIds: [12, 24, 31, 45, 52],
    checkedIn: ['Németh Gergely', 'Kovács Tamás', 'Szűcs Bálint', 'Mészáros Dávid'],
    cancelled: [{ name: 'Lakatos Péter', reason: 'Munkahelyi elfoglaltság' }],
    noResponse: [],
    ratings: [
      { player: 'Németh Gergely', score: 5, emoji: '🔥', comment: 'Nagyon jó tempójú edzés volt!' },
      { player: 'Kovács Tamás', score: 4, emoji: '😎', comment: 'Hasznos labdatartási gyakorlatok.' },
    ],
  },
  {
    id: 202,
    team: 'U19',
    coach: 'Szabó Gábor',
    coachId: 2,
    title: 'Állóképességi futás & sprint',
    date: '2026-11-10',
    time: '16:30 - 18:00',
    avgRating: 2.7,
    avgEmoji: '🥴',
    attendeeIds: [1, 2, 61, 62, 68],
    checkedIn: ['Teszt Elek', 'Nagy Ádám', 'Kiss Bence'],
    cancelled: [{ name: 'Tóth Márk', reason: 'Betegség / láz' }],
    noResponse: ['Horváth Zoltán'],
    ratings: [
      { player: 'Teszt Elek', score: 3, emoji: '😐', comment: 'Elég kemény volt a végén.' },
      { player: 'Nagy Ádám', score: 2, emoji: '🥴', comment: 'Túl sok futás, kevés labda.' },
    ],
  },
  {
    id: 203,
    team: 'U17',
    coach: 'Farkas Péter',
    coachId: 18,
    title: 'Pontrúgások és befejezések',
    date: '2026-11-08',
    time: '17:00 - 18:30',
    avgRating: 4.8,
    avgEmoji: '🔥',
    attendeeIds: [18, 71, 74, 79, 83],
    checkedIn: ['Balogh Levente', 'Papp Kristóf', 'Kerekes Tamás'],
    cancelled: [],
    noResponse: [],
    ratings: [
      { player: 'Balogh Levente', score: 5, emoji: '🔥', comment: 'Szuper kapura lövő gyakorlatok!' },
    ],
  },
];


export const mockTeamSessions = [
  {
    id: 101,
    team: 'U17',
    title: 'Technikai és passzgyakorlatok',
    date: '2026-11-18',
    startTime: '16:00',
    endTime: '17:30',
    location: 'ETO Park - 2-es pálya',
  },
  {
    id: 102,
    team: 'U18',
    title: 'Taktikai edzés & pontrúgások',
    date: '2026-11-18',
    startTime: '17:30',
    endTime: '19:00',
    location: 'ETO Park - 1-es pálya',
  },
  {
    id: 103,
    team: 'U18',
    title: 'Felkészülési mérkőzés',
    date: '2026-11-21',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Centerpálya',
  },
  {
    id: 104,
    team: 'U19',
    title: 'Erőnléti és labdabirtoklási edzés',
    date: '2026-11-19',
    startTime: '18:00',
    endTime: '19:30',
    location: 'ETO Park - Műfüves pálya',
  },
  {
    id: 105,
    team: 'Felnőtt',
    title: 'Zártkapus edzőmeccs',
    date: '2026-11-20',
    startTime: '15:00',
    endTime: '17:00',
    location: 'Stadion',
  },
];