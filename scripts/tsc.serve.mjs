import { spawn } from 'child_process';

export const createTscServer = async () => {
  const tsc = spawn(
    'npx tsc',
    ['--noEmit --watch --skipLibCheck --pretty --project tsconfig.json'],
    {
      shell: true
    }
  );
  tsc.stdout.on('data', (data) => {
    console.info(`${data}`);
  });
  tsc.on('error', (error) => {
    console.error(`error: ${error.message}`);
  });
};

export default createTscServer;
