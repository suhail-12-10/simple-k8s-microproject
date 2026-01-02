pipeline {
  agent any

  environment {
    DOCKERHUB_USER = "suhail4545"        // your DockerHub username
    IMAGE_NAME = "simple-backend"
    PROJECT_DIR = "simple-k8s-microproject"
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
          cd $PROJECT_DIR/backend-service
          docker build -t $DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER .
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
