import { getFileUrl, getPreSignedUrl } from '@/controllers/file.controller';
import * as express from 'express';

const fileRouter = express.Router();

fileRouter.get('/pre-signed-url', getPreSignedUrl);

fileRouter.get('/signed-url', getFileUrl);

export default fileRouter;
