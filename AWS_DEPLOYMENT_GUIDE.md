# AWS Deployment Guide

Deploy the resume analyzer using AWS Console.

## Prerequisites
- AWS Account with admin permissions

## 1. S3 Bucket

**Console**: https://console.aws.amazon.com/s3/

1. Create bucket: `resume-analyzer-uploads-[unique-suffix]`
2. Add CORS policy in Permissions → CORS:
```json
[{
  "AllowedHeaders": ["*"],
  "AllowedMethods": ["GET", "PUT", "POST"],
  "AllowedOrigins": ["*"]
}]
```

## 2. IAM Role

**Console**: https://console.aws.amazon.com/iam/

1. Create role for Lambda service
2. Attach policies:
   - `AmazonS3FullAccess`
   - `ComprehendFullAccess` 
   - `AWSLambdaBasicExecutionRole`
3. Name: `ResumeAnalyzerLambdaRole`

## 3. Lambda Function

**Console**: https://console.aws.amazon.com/lambda/

1. Create function:
   - Name: `resume-analyzer`
   - Runtime: Node.js 18.x
   - Role: `ResumeAnalyzerLambdaRole`
2. Upload `backend/function.zip`
3. Set environment variable:
   - `S3_BUCKET`: your-bucket-name
4. Configure:
   - Timeout: 30 seconds
   - Memory: 512 MB

## 4. Clerk Authentication

**Console**: https://clerk.com/

1. Create Clerk account and application:
   - Application name: `resume-analyzer`
   - Choose authentication methods: Email, Google (optional)
2. Get API keys from Dashboard:
   - Publishable key
   - Secret key
3. Configure allowed origins: `http://localhost:3000`

## 5. Amazon Comprehend

**Console**: https://console.aws.amazon.com/comprehend/

1. Verify service is available in your region
2. No additional setup required - accessed via IAM role

## 6. API Gateway

**Console**: https://console.aws.amazon.com/apigateway/

1. Create REST API: `resume-analyzer-api`
2. Create resource: `/analyze`
3. Create POST method:
   - Integration: Lambda Function
   - Function: `resume-analyzer`
4. Enable CORS on `/analyze`
5. Deploy to stage: `prod`
6. Note the invoke URL

## 7. CloudWatch

**Console**: https://console.aws.amazon.com/cloudwatch/

1. Logs automatically created for Lambda function
2. Monitor `/aws/lambda/resume-analyzer` log group
3. Set up alarms (optional):
   - Lambda errors
   - API Gateway 4xx/5xx errors

## 8. Frontend Setup

Install Clerk:
```bash
npm install @clerk/clerk-react
```

Create `.env`:
```env
REACT_APP_API_ENDPOINT=https://your-api-id.execute-api.region.amazonaws.com/prod
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx
```

## 9. Test

1. Run `npm start`
2. Upload a resume file
3. Verify analysis results

## Troubleshooting

- **CORS errors**: Check S3 and API Gateway CORS settings
- **Permissions**: Verify IAM role policies
- **Timeouts**: Increase Lambda timeout
- **Comprehend errors**: Check service quotas and region availability
- **Logs**: Check CloudWatch `/aws/lambda/resume-analyzer` log group