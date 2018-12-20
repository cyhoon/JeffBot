require('dotenv').config();

import botServer from './botServer';

try {
  new botServer().start();
} catch (error) {
  console.error('Fail execute bot server');
  console.error(`Error message: ${error.message}`);
}
