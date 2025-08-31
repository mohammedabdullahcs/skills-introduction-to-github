const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

async function setupDatabase() {
  try {
    console.log('🗃️  Setting up SQLite database...');

    const dbPath = path.join(__dirname, 'dev.db');
    const migrationPath = path.join(__dirname, 'migrations', '001_init', 'migration.sql');

    // Remove existing database if it exists
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log('🗑️  Removed existing database');
    }

    // Read migration SQL
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Create database and run migration
    const db = new sqlite3.Database(dbPath);
    
    await new Promise((resolve, reject) => {
      db.exec(migrationSQL, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ Database schema created successfully');
          resolve();
        }
      });
    });

    db.close();
    console.log('🎉 Database setup completed!');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
}

setupDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });