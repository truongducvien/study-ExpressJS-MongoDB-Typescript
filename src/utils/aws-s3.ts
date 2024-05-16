import { envConfig, s3 } from '@/config';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Get file signed url:
const getFileS3 = async (
  fileName: string
): Promise<{ name: string; url: string }> => {
  const command = new GetObjectCommand({
    Bucket: envConfig.AWS_S3_BUCKET_NAME,
    Key: fileName
  });

  const signedUrl = await getSignedUrl(s3, command);

  return {
    name: fileName,
    url: signedUrl
  };
};

export { getFileS3 };
