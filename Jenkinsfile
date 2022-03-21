pipeline {
    agent any

    environment {
        BUCKET_NAME = 's3://creativegang-s3-frontend'
        WORKSPACE_PATH = '/var/lib/jenkins/workspace/gc-frontend-s3_publisher/build' 
    }

    stages {
        
        stage ('git checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/DavidYao-Z/P3-TestRepo-FE.git']]])
            }
        }

        stage('Install packages') {
            steps {
                echo "Installing packages ..."
                //Install the packages from package.json
                sh 'rm package-lock.json'
                sh 'npm install'
            }
        }
                
        stage('Build') {
            steps {
                echo "Building ..."
                echo "Running job: ${env.JOB_NAME}\n Build: ${env.BUILD_ID} - ${env.BUILD_URL}\nPepeline: ${env.RUN_DISPLAY_URL}"
                sh 'CI=false npm run build'
            }
        }

        stage('Deploy to UAT') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                echo 'Deploying to AWS S3 ...'
                sh 'aws s3 rm ${BUCKET_NAME} --recursive'
                sh 'aws s3 cp ${WORKSPACE_PATH} ${BUCKET_NAME} --recursive'
            }
        }    
    }
}

