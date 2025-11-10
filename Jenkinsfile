pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'portfolio-website'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        APP_PORT = '6000' // Port on host machine
        CONTAINER_PORT = '6000' // Port inside container
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo '✅ Code checked out successfully'
            }
        }
        
        stage('Fetch Env Files') {
            steps {
                // Pull down environment files from Jenkins credentials
                withCredentials([
                    file(credentialsId: 'PORTFOLIO_ENV', variable: 'ENV_FILE')
                ]) {
                    sh '''
                        echo "📦 Placing .env.production..."
                        cp "$ENV_FILE" .env.production
                        chmod 600 .env.production
                    '''
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh '''
                    docker build --no-cache -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                '''
            }
        }
        
        stage('Deploy with Docker') {
            steps {
                echo '🚀 Deploying application...'
                sh '''
                    # Stop & remove existing container; ignore if nothing running
                    docker stop portfolio-container || true
                    docker rm portfolio-container || true
                    
                    # Run new container with environment file
                    docker run -d \
                        --name portfolio-container \
                        -p ${APP_PORT}:${CONTAINER_PORT} \
                        -e PORT=${CONTAINER_PORT} \
                        --env-file .env.production \
                        --restart unless-stopped \
                        ${DOCKER_IMAGE}:latest
                '''
            }
        }
        
        stage('Health Check') {
            steps {
                echo '🏥 Running health check...'
                sh '''
                    sleep 10
                    curl -f http://localhost:${APP_PORT} || exit 1
                    echo "✅ Application is healthy!"
                '''
            }
        }
        
        stage('Cleanup') {
            steps {
                echo '🧹 Cleaning up old images...'
                sh '''
                    # Remove dangling images
                    docker image prune -f || true
                '''
            }
        }
    }
    
    post {
        success {
            echo '🚀 Portfolio deployment successful!'
        }
        failure {
            echo '❌ Portfolio deployment failed! Check logs.'
        }
        always {
            cleanWs()
        }
    }
}
