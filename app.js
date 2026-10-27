const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let students = [
  { id: 1, name: 'Harshitha', course: 'CSE', year: 3 }
];
let nextId = 2;

app.get('/health', (req, res) => res.json({ status: 'UP' }));

app.get('/api/students', (req, res) => res.json(students));

app.get('/api/students/:id', (req, res) => {
  const s = students.find(x => x.id === Number(req.params.id));
  if (!s) return res.status(404).json({ error: 'Student not found' });
  res.json(s);
});

app.post('/api/students', (req, res) => {
  const { name, course, year } = req.body;
  if (!name || !course) {
    return res.status(400).json({ error: 'name and course are required' });
  }
  const student = { id: nextId++, name, course, year: year || 1 };
  students.push(student);
  res.status(201).json(student);
});

app.put('/api/students/:id', (req, res) => {
  const s = students.find(x => x.id === Number(req.params.id));
  if (!s) return res.status(404).json({ error: 'Student not found' });
  const { name, course, year } = req.body;
  if (name) s.name = name;
  if (course) s.course = course;
  if (year) s.year = year;
  res.json(s);
});

app.delete('/api/students/:id', (req, res) => {
  const idx = students.findIndex(x => x.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Student not found' });
  students.splice(idx, 1);
  res.status(204).end();
});

module.exports = app;
