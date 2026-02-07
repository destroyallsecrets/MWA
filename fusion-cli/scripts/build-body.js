const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log('Building Fusion Body (Rust)...');
  execSync('npx napi build --release', { stdio: 'inherit', cwd: 'src/body-rust' });
} catch (e) {
  console.error('Failed to build Rust body. Ensure Rust and Cargo are installed.');
}
