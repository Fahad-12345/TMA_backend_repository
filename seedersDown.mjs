import { Sequelize } from 'sequelize';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    development: {
        username: "postgres",
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

async function undoSeeders() {
    const seedersDir = path.join(__dirname, 'seeders'); // Point to the migrations folder
    const seedersFiles = await fs.readdir(seedersDir);

    // Sort files in reverse order to undo in the correct sequence
    seedersFiles.sort().reverse();

    for (const file of seedersFiles) {
        if (file.endsWith('.mjs')) {
            const seedersPath = path.join(seedersDir, file);
            const { down } = await import(`file://${seedersPath}`); // Use file URL format
            await down(sequelize.getQueryInterface(), Sequelize);
            console.log(`Seeder ${file} undone.`);
        }
    }

    await sequelize.close();
}

undoSeeders().catch((error) => {
    console.error('Migration undo failed:', error);
    process.exit(1);
});
