import * as fs from 'fs';
import morgan from 'morgan';

const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });

const logger = () => {
  return morgan('combined', { stream: accessLogStream });
};

export default logger;
