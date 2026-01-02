pipeline {
  agent any

  environment {
    DOCKERHUB_USER = "suhail4545"
    IMAGE_NAME = "simple-backend"
    KUBECTL = "/usr/local/bin/kubectl"
    KUBECONFIG = "/var/lib/jenkins/.kube/config"
  }

  stages {

    stage('Preflight Checks') {
      steps {
        sh '''
          echo "=== Preflight checks ==="
          which docker
          docker --version
          $KUBECTL version --client
          $KUBECTL get nodes
        '''
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          cd backend-service
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
          $KUBECTL set image deployment/backend-deployment \
          backend=$DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER
        '''
      }
    }
  }
}
