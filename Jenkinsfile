pipeline {
  environment {
    registry = "ksugiyama4/docker-test"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
  tools {nodejs "node" }
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/ksugiyama4/htmlSample'
      }
    }
    stage('Building Image') {
       steps {
         sh 'npm install'
       }
    }
    stage('Testing Image') {
      steps {
        sh 'npm test'
      }
    }
    stage('Building Docker') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploying Docker') {
      steps{
         script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused Docker') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
  }
}
