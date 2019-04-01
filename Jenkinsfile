pipeline {
  environment {
    registry = "ksugiyama4/docker-test"
    registryCredential = 'dockerhub'
    dockerImage = ''
    dockerLatestImage = ''
    TAG='latest'
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
    stage('Installing mysql Package') {
       steps {
         sh 'npm install mysql'
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
          dockerLatestImage = docker.build registry + ":$TAG"
        }
      }
    }
    stage('Deploying Docker') {
      steps{
         script {
            docker.withRegistry( '', registryCredential ) {
            dockerLatestImage.push()
          }
        }
      }
    }
    stage('Remove Unused Docker') {
      steps{
        //sh "docker rmi $registry"
        sh "docker rmi $registry:$TAG"
      }
    }
  }
}
