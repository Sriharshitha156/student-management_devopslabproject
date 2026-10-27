pipeline {
    agent any

    tools {
        nodejs 'node18'   // Manage Jenkins > Tools > NodeJS installations (name must match)
    }

    environment {
        IMAGE_NAME = 'student-management'
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install') {
            steps { sh 'npm ci' }
        }
        stage('Test') {
            steps { sh 'npm test' }
        }
        stage('Docker Build') {
            steps { sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG -t $IMAGE_NAME:latest .' }
        }
    }

    post {
        success { echo 'Build succeeded' }
        failure { echo 'Build failed' }
    }
}
