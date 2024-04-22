// Load environment variables from .env file
import dotenv from 'dotenv'
dotenv.config();

// TODO: the SDK version after MagaluCloud fix an issue with signatures, before that
// having awscli installed will be a requirement :(
// // Import required modules from AWS SDK v3
// import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
//
// // AWS S3 credentials and region from environment variables
// const { S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_REGION } = process.env;
//
// // Create S3 client with provided credentials and region
// const s3Client = new S3Client({
//     region: S3_REGION,
//     endpoint: S3_ENDPOINT,
//     credentials: {
//         accessKeyId: S3_ACCESS_KEY_ID,
//         secretAccessKey: S3_SECRET_ACCESS_KEY
//     }
// });
//
// generate a presign GET URL using JS lib aws-sdk
// async function awsSdkGeneratePresignedUrl(bucketName, objectKey, expirationSeconds) {
//     const command = new GetObjectCommand({
//         Bucket: bucketName,
//         Key: objectKey
//     });
//
//     const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: expirationSeconds });
//     return signedUrl;
// }

import util from 'node:util';
import { exec as nodeExec } from 'node:child_process';
const exec = util.promisify(nodeExec)

// generate a presign GET URL using command line tool aws cli
async function awsCliGeneratePresignedUrl(bucketName, objectKey, expirationSeconds) {
  //set credentials for the vending-machine profile
  await exec(`aws configure --profile vending-machine set aws_access_key_id ${ process.env.S3_ACCESS_KEY_ID }`)
  await exec(`aws configure --profile vending-machine set aws_secret_access_key ${ process.env.S3_SECRET_ACCESS_KEY }`)
  const args = [
    `s3://${ bucketName }/${ objectKey }`,
    '--profile vending-machine',
    `--expires-in ${ expirationSeconds }`,
    `--endpoint-url ${ process.env.S3_ENDPOINT }`,
    `--region ${ process.env.S3_REGION }`,
  ]
  return exec(`aws s3 presign ${ args.join(' ') }`)
}

// Function to generate presigned URL for an S3 object
export async function generatePresignedUrl(bucketName, objectKey, expirationSeconds = 3600) {
    console.log({bucketName, objectKey})
    const {stdout: signedUrl} = await awsCliGeneratePresignedUrl(bucketName, objectKey, expirationSeconds)
    // const signedUrl = await awsSdkGeneratePresignedUrl(bucketName, objectKey, expirationSeconds)
    return signedUrl.replace(/\n/g, '');
}
