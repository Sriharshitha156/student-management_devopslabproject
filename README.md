# Student Management Application: DevOps Lab Project

A simple Student Management app built with Node.js and Express, used to practise a complete DevOps workflow: Git/GitHub, Jenkins, Docker, Kubernetes and automated testing.

## Project Progress

| # | Task | Status |
|---|------|--------|
| 1 | Application Development (Node.js + Express) | Done |
| 2 | Git and GitHub | Done |
| 3 | Jenkins CI job | In progress |
| 4 | Docker (Dockerfile, image, container) | Pending |
| 5 | Kubernetes (Deployment + Service) | Pending |
| 6 | Automated Testing (Jest + Supertest) | Tests written, 5 passing locally; will run in Jenkins |

## Tech Stack

- Node.js, Express
- Jest + Supertest (testing)
- Git and GitHub
- Jenkins
- Docker
- Kubernetes (Minikube)

## Project Structure

    student-management/
    |-- app.js                  # REST API
    |-- server.js               # starts the server on port 3000
    |-- public/index.html       # simple web UI
    |-- tests/student.test.js   # automated tests
    |-- Dockerfile
    |-- Jenkinsfile
    |-- k8s/
    |   |-- deployment.yaml
    |   `-- service.yaml
    `-- package.json

## Run Locally

    npm install
    npm test
    npm start

Open http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| GET | /api/students | List all students |
| GET | /api/students/:id | Get one student |
| POST | /api/students | Add a student |
| PUT | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |

## Task 2: Git Commands Demonstrated

    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <repo-url>
    git push -u origin main
    git checkout -b feature/update-readme
    git diff
    git merge feature/update-readme
    git log --oneline

## Task 3: Jenkins (in progress)

- Jenkins runs in a Docker container on port 8080
- Pipeline stages: Checkout, Install, Test, Docker Build
- The pipeline is defined in the Jenkinsfile

## Next Steps

- Finish the Jenkins pipeline and enable automatic builds
- Build and run the Docker image
- Deploy to Kubernetes using a Deployment and a NodePort Service

Jenkins auto build test
