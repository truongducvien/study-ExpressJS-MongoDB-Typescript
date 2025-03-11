import { envConfig, s3 } from '@/config';
import { BadRequestError } from '@/types';
import { getFileS3, sendError, sendGetSuccess } from '@/utils';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Request, Response } from 'express';

const getPreSignedUrl = async (req: Request, res: Response) => {
  try {
    const fileName = req.query['file-name'] as string;
    if (!fileName)
      throw new BadRequestError('File name is required to get pre-signed url');

    const command = new PutObjectCommand({
      Bucket: envConfig.AWS_S3_BUCKET_NAME,
      Key: `${Date.now().toString()}__${fileName}`
    });
    const preSignedUrl = await getSignedUrl(s3, command, {
      expiresIn: 60
    });
    sendGetSuccess(res, { preSignedUrl });
  } catch (error) {
    sendError(res, error);
  }
};

const getFileUrl = async (req: Request, res: Response) => {
  try {
    const fileKey = req.query['file-key'] as string;
    if (!fileKey)
      throw new BadRequestError('File name is required to get pre-signed url');

    const file = await getFileS3(fileKey);
    sendGetSuccess(res, file);
  } catch (error) {
    sendError(res, error);
  }
};

export { getPreSignedUrl, getFileUrl };
