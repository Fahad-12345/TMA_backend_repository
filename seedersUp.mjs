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

async function runSeeders() {
    const seedersDir = path.join(__dirname, 'seeders'); // Point to the seeders folder
    const seederFiles = await fs.readdir(seedersDir);
    for (const file of seederFiles) {
        if (file.endsWith('.mjs')) {
            const seederPath = path.join(seedersDir, file);
            const { up } = await import(`file://${seederPath}`); // Use file URL format
            
            try {
                await up(sequelize.getQueryInterface(), Sequelize);
                console.log(`Seeder ${file} executed successfully.`);
            } catch (error) {
                console.error(`Failed to execute seeder ${file}:`, error);
                // Optionally, exit on error to prevent further execution
                process.exit(1);
            }
        }
    }

    await sequelize.close();
}

runSeeders().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
