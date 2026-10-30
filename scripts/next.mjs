import { loadEnvFile } from 'node:process';
import { spawn } from 'node:child_process';

try {
  loadEnvFile('.env');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const command = process.argv[2] ?? 'dev';
const args = ['node_modules/next/dist/bin/next', command];
if (command === 'dev') args.push('--webpack');
args.push(...process.argv.slice(3));

const child = spawn(process.execPath, args, {
  stdio: 'inherit',
  env: process.env,
});
child.on('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
