pipeline {
  agent any

  environment {
    DOCKERHUB_USER = "suhail4545"
    IMAGE_NAME = "simple-backend"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          eval $(minikube docker-env)
          docker build -t $DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER backend-service
        '''
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker push $DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          kubectl set image deployment/backend-deployment \
          backend=$DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER
        '''
      }
    }
  }
}
