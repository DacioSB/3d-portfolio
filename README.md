# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Great, the workflow file has been created. Now, for the second and most important part:

  Step 2: Configure AWS Credentials and GitHub Secrets

  For the workflow to access your AWS account, you must create a dedicated IAM user and add its
  credentials to your GitHub repository as encrypted secrets.

  1. Create an IAM User in AWS


   * Go to the IAM console (https://console.aws.amazon.com/iam/) in AWS.
   * Create a new user. Give it a descriptive name like github-actions-deployer.
   * For credential type, select Access key - Programmatic access.
   * On the permissions screen, select Attach existing policies directly and then Create policy.
   * Go to the JSON tab and paste the following policy. Remember to replace `YOUR_BUCKET_NAME` with
     your actual S3 bucket name.



    1 {
    2     "Version": "2012-10-17",
    3     "Statement": [
    4         {
    5             "Sid": "AllowS3Sync",
    6             "Effect": "Allow",
    7             "Action": [
    8                 "s3:PutObject",
    9                 "s3:ListBucket",
   10                 "s3:DeleteObject",
   11                 "s3:GetObject",
   12                 "s3:PutObjectAcl"
   13             ],
   14             "Resource": [
   15                 "arn:aws:s3:::YOUR_BUCKET_NAME/*",
   16                 "arn:aws:s3:::YOUR_BUCKET_NAME"
   17             ]
   18         }
   19     ]
   20 }



   * Save the policy, and then attach it to the user you created.
   * After the user is created, copy the Access Key ID and Secret Access Key. You will not be able
     to see the secret key again.

  2. Add Credentials to GitHub Secrets


   * In your GitHub repository, go to Settings > Secrets and variables > Actions.
   * Click New repository secret for each of the following secrets:
       * AWS_ACCESS_KEY_ID: The Access Key ID you copied from AWS.
       * AWS_SECRET_ACCESS_KEY: The Secret Access Key you copied from AWS.
       * AWS_S3_BUCKET_NAME: The name of your S3 bucket (e.g., my-portfolio-website).
       * AWS_REGION: The region your S3 bucket is in (e.g., us-east-1).


  Once you have completed these steps, any push to your main branch will automatically trigger the
   GitHub Action and deploy your site to the S3 bucket. The --delete flag in the aws s3 sync
  command ensures that any files you remove from your project are also removed from the bucket.
  The --acl public-read flag makes the uploaded files publicly accessible, which is necessary for
  a static website.