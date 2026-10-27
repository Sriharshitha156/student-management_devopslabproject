pipeline {
    agent any

    environment {
        IMAGE_NAME = 'student-management'
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install') {
            steps { bat 'npm ci' }
        }
        stage('Test') {
            steps { bat 'npm test' }
        }
        stage('Docker Build') {
            steps { bat '"C:/Users/P SRIHARSHITHA/AppData/Local/Programs/DockerDesktop/resources/bin/docker.exe" build -t %IMAGE_NAME%:%IMAGE_TAG% -t %IMAGE_NAME%:latest .' }
        }
    }

    post {
        success { echo 'Build succeeded' }
        failure { echo 'Build failed' }
    }
}