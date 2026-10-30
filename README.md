# Student Management Application: DevOps Lab Project

A simple Student Management app built with Node.js and Express, used to practise a complete DevOps workflow: Git/GitHub, Jenkins, Docker, Kubernetes and automated testing.

Repository: https://github.com/Sriharshitha156/student-management_devopslabproject

## Project Progress

| # | Task | Status |
|---|------|--------|
| 1 | Application Development (Node.js + Express) | Done |
| 2 | Git and GitHub | Done |
| 3 | Jenkins CI job | Done |
| 4 | Docker (Dockerfile, image, container) | Done |
| 5 | Kubernetes (Deployment + Service) | Done |
| 6 | Automated Testing (Jest + Supertest) | Done |

## Tech Stack

- Node.js, Express
- Jest + Supertest (testing)
- Git and GitHub
- Jenkins (Windows service)
- Docker Desktop
- Kubernetes (Docker Desktop)

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

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| GET | /api/students | List all students |
| GET | /api/students/:id | Get one student |
| POST | /api/students | Add a student |
| PUT | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |

---

## Task 1: Application Development (Done)

Steps:

1. Installed Node.js (LTS) and checked it with node -v and npm -v.
2. Installed the dependencies (Express, Jest, Supertest).
3. Started the app and opened it in the browser.

Commands:

    npm install
    npm start

Result: the app runs at http://localhost:3000. Students can be added and deleted from the page, and the API returns JSON at /api/students.

![App running](https://github.com/user-attachments/assets/baabe0cf-c91c-49ab-844b-5805ebd962ac)

Note: students are stored in memory, so the list resets when the app restarts.

## Task 2: Git and GitHub (Done)

Steps:

1. Created an empty public repository on GitHub.
2. Initialised Git in the project folder and made the first commit.
3. Connected the repository to GitHub and pushed.
4. Created a branch, changed the README, merged the branch into main and pushed.

Commands:

    git init
    git add .
    git commit -m "Initial commit: student management app"
    git branch -M main
    git remote add origin https://github.com/Sriharshitha156/student-management_devopslabproject.git
    git push -u origin main
    git checkout -b feature/update-readme
    git diff
    git add .
    git commit -m "update README"
    git checkout main
    git merge feature/update-readme
    git push
    git log --oneline

![Git push](screenshots/02-git-push.png)

![Git branch, merge and log](screenshots/03-git-branch-merge-log.png)

Result: the code is on GitHub and git log --oneline shows the commit history.

![GitHub repository](screenshots/04-github-repo.png)

## Task 3: Jenkins (Done)

Steps:

1. Used the Jenkins already installed on Windows (http://localhost:8080).
2. Created a Pipeline job named student-management-pipeline.
3. Set Definition to "Pipeline script from SCM", SCM to Git, branch to */main and Script Path to Jenkinsfile.
4. Enabled Poll SCM with H/2 * * * * so a push starts a build automatically.
5. Clicked Build Now and checked the Console Output.

![Jenkins job configuration](screenshots/05-jenkins-config.png)

Pipeline stages (defined in the Jenkinsfile): Checkout, Install (npm ci), Test (npm test) and Docker Build (docker build). The Jenkinsfile uses bat commands because Jenkins runs on Windows.

Problems fixed:

- Port 8080 was already used by the existing Jenkins, so a Docker-based Jenkins could not start on it. Used the existing Jenkins instead.
- Jenkins failed with "No such DSL method pipeline" because Windows PowerShell added a hidden BOM character to the Jenkinsfile. Rewrote the file as UTF-8 without BOM.
- Jenkins failed with "docker is not recognized" because the Jenkins service does not have Docker in its PATH. Used the full path to docker.exe inside the Jenkinsfile.

Result: all stages are green and the console ends with Finished: SUCCESS. A push to GitHub starts a new build automatically.

![Jenkins stage view](screenshots/06-jenkins-stage-view.png)

![Jenkins console output](screenshots/07-jenkins-console.png)

![Jenkins automatic build](screenshots/08-jenkins-auto-build.png)

## Task 4: Docker (Done)

The Dockerfile starts from node:18-alpine, installs the dependencies with npm ci, copies the code, exposes port 3000 and starts the app with node server.js.

Steps:

1. Built the image.
2. Ran a container from the image and mapped port 3000.
3. Checked the container, its logs and the API.
4. Opened the app in the browser.

Commands:

    docker build -t student-management:latest .
    docker images
    docker run -d -p 3000:3000 --name student-app student-management:latest
    docker ps
    docker logs student-app
    curl.exe http://localhost:3000/api/students

![Docker build](https://github.com/user-attachments/assets/955c2fba-5298-4d22-9289-e65d9cb99c20)

![Docker images and containers](https://github.com/user-attachments/assets/1977d3ba-5173-412c-991d-36da27c803dd)

Result: the app runs inside a container at http://localhost:3000.

![App running in Docker](screenshots/11-docker-browser.png)

## Task 5: Kubernetes (Done)

The app runs on the Kubernetes cluster built into Docker Desktop.

- k8s/deployment.yaml: a Deployment that runs 2 replicas of the student-management:latest image, with a readiness probe on /health. imagePullPolicy is IfNotPresent so the local image is used.
- k8s/service.yaml: a NodePort Service that sends traffic from port 30080 to port 3000 of the pods.

Steps:

1. Enabled Kubernetes in Docker Desktop (Settings, Kubernetes, Create cluster).
2. Checked that the node was Ready.
3. Applied the Deployment and the Service.
4. Checked the pods and the Service, then opened the app in the browser.
5. Scaled the Deployment and deleted a pod to show that Kubernetes replaces it automatically.

![Kubernetes cluster ready](https://github.com/user-attachments/assets/e61a0b71-c65e-45ee-86c5-280b86a379e9)

Commands:

    kubectl get nodes
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    kubectl get deployments
    kubectl get pods
    kubectl get svc
    kubectl scale deployment student-management --replicas=3
    kubectl delete pod <pod-name>
    kubectl logs deployment/student-management

![Kubernetes deployment, pods and service](https://github.com/user-attachments/assets/9566dc36-7d6a-4505-8fba-5531d4d5b11c)

![Kubernetes self-healing](https://github.com/user-attachments/assets/25460bee-dd72-4560-b7ad-de6e279d562a)

Result: 2 pods are Running (1/1) and the app opens at http://localhost:30080.

![App running on Kubernetes](screenshots/15-k8s-browser.png)

## Task 6: Automated Testing (Done)

Framework: Jest + Supertest, a standard REST API testing setup for Node.js.

Test cases in tests/student.test.js:

1. GET /api/students returns 200 and a list.
2. POST /api/students creates a student and returns 201.
3. POST /api/students with missing fields returns 400.
4. GET /api/students/:id with an unknown id returns 404.
5. DELETE /api/students/:id removes a student, and a later GET returns 404.

Run the tests:

    npm test

![Test results](https://github.com/user-attachments/assets/d4ed5cd3-c174-42ff-9543-c27b2a13b522)

Result: 5 of 5 tests pass locally and in the Test stage of the Jenkins pipeline.

![Tests in Jenkins](screenshots/17-jenkins-test-stage.png)

## Pipeline Summary

Code is pushed to GitHub, Jenkins checks it out, installs the dependencies, runs the tests and builds the Docker image, and Kubernetes runs the containerised app.
