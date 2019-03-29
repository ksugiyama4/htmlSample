pipeline {
  environment {
    registry = "ksugiyama4/docker-test"
    registryCredential = 'dockerhub'
    dockerImage = ''
    dockerLatestImage = ''
  }
  agent any
  tools {nodejs "node" }
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/ksugiyama4/htmlSample'
      }
    }
    stage('Building NodeJS Image') {
       steps {
         sh 'npm install'
       }
    }
    stage('Testing NodeJS Image') {
      steps {
        sh 'npm test'
      }
    }
    stage('Building Docker') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
          //dockerLatestImage = docker.build registry + ":latest"
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
        //sh "docker rmi $registry:latest"
      }
    }
  }
}
