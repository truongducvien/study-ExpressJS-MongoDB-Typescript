import { envConfig } from './env';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  credentials: {
    accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY
  },
  region: envConfig.AWS_REGION
});

export { s3 };
