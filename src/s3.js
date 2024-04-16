// Load environment variables from .env file
import dotenv from 'dotenv'
dotenv.config();

// Import required modules from AWS SDK v3
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// AWS S3 credentials and region from environment variables
const { S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_REGION } = process.env;

// Create S3 client with provided credentials and region
const s3Client = new S3Client({
    region: S3_REGION,
    endpoint: S3_ENDPOINT,
    credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY
    }
});

// Function to generate presigned URL for an S3 object
export async function generatePresignedUrl(bucketName, objectKey, expirationSeconds = 3600) {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: expirationSeconds });
    return signedUrl;
}

// // Example usage:
// const bucketName = 'your_s3_bucket_name';
// const objectKey = 'path/to/your/file.txt';
// const expirationSeconds = 300; // 5 minutes
// 
// generatePresignedUrl(bucketName, objectKey, expirationSeconds)
//     .then(url => {
//         console.log('Generated presigned URL:', url);
//         // Use the generated URL to provide access to the S3 object
//     })
//     .catch(error => {
//         console.error('Error generating presigned URL:', error);
//     });
// 
