pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'portfolio-website'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
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
                    file(credentialsId: 'PORTFOLIO_ENV_PRODUCTION', variable: 'ENV_FILE')
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
                    
                    # Run new container
                    docker run -d \
                        --name portfolio-container \
                        -p 3000:3000 \
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
                    curl -f http://localhost:3000 || exit 1
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
