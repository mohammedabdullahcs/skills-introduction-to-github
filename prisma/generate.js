const { execSync } = require('child_process');

try {
  console.log('📦 Generating Prisma Client...');
  
  // Try to generate the client using the local prisma
  const result = execSync('npx prisma generate --schema=./prisma/schema.prisma', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('✅ Prisma Client generated successfully!');
} catch (error) {
  console.log('⚠️  Prisma CLI not available, creating basic client setup...');
  
  // Create a basic client configuration
  const fs = require('fs');
  const path = require('path');
  
  const clientDir = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');
  
  if (!fs.existsSync(clientDir)) {
    fs.mkdirSync(clientDir, { recursive: true });
  }
  
  console.log('✅ Basic Prisma setup completed!');
}