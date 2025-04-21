
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// In-memory users store for demo purposes
let users = [];

app.use(cors());
app.use(bodyParser.json());

// Auth endpoints
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    profileComplete: false,
    enrolledCourses: [],
    profilePicture: null
  };
  users.push(newUser);
  res.json({ message: 'Signup successful', user: newUser });
});

app.post('/api/auth/signin', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/users', (req, res) => {
  res.json(users.map(({ password, ...u }) => u)); // Don't return passwords
});

app.get('/', (req, res) => {
  res.send('Skillwise backend is running.');
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
