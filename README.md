# Student Management Application - DevOps Lab Project

A simple Student Management app built with Node.js and Express, used to practise a DevOps workflow: Git/GitHub, Jenkins, Docker, Kubernetes and automated testing.

## Project Progress

| # | Task | Status |
|---|------|--------|
| 1 | Application Development (Node.js + Express) | Done |
| 2 | Git and GitHub | Done |
| 3 | Jenkins CI job | In progress |
| 4 | Docker | Pending |
| 5 | Kubernetes | Pending |
| 6 | Automated Testing (Jest + Supertest) | Tests written, 5 passing locally |

## Run Locally

    npm install
    npm test
    npm start

Open http://localhost:3000

## API Endpoints

- GET /health
- GET /api/students
- GET /api/students/:id
- POST /api/students
- PUT /api/students/:id
- DELETE /api/students/:id

## Next Steps

- Finish the Jenkins pipeline
- Build and run the Docker image
- Deploy to Kubernetes
