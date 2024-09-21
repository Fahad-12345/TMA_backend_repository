import { Sequelize } from 'sequelize';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    development: {
        username: "fahad",
        password: "12345",
        database: "TMA",
        host: "127.0.0.1",
        dialect: "postgres" 
    },
};

const environment = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect } = config[environment];

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
});

async function undoMigrations() {
    const migrationsDir = path.join(__dirname, 'migrations'); // Point to the migrations folder
    const migrationFiles = await fs.readdir(migrationsDir);

    // Sort files in reverse order to undo in the correct sequence
    migrationFiles.sort().reverse();

    for (const file of migrationFiles) {
        if (file.endsWith('.mjs')) {
            const migrationPath = path.join(migrationsDir, file);
            const { down } = await import(`file://${migrationPath}`); // Use file URL format
            await down(sequelize.getQueryInterface(), Sequelize);
            console.log(`Migration ${file} undone.`);
        }
    }

    await sequelize.close();
}

undoMigrations().catch((error) => {
    console.error('Migration undo failed:', error);
    process.exit(1);
});
