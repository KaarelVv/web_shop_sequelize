import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { sequelize } from '../utils/db.js';

// ESM does not provide __dirname directly, so we derive it from import.meta.url.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache loaded models so we only scan/import once.
const models = {};

export async function loadModels() {
    // If models are already loaded, return the cached object.
    if (!Object.keys(models).length) {
        // Read all files in the current models directory.
        const files = fs.readdirSync(__dirname);
        for (const filename of files) {
            // Load every model file except this index file.
            if (filename !== 'index.js' && filename.endsWith('.js')) {
                const moduleUrl = pathToFileURL(path.join(__dirname, filename)).href;
                const imported = await import(moduleUrl);
                const model = imported.default;
                // Register model by model name, e.g. "Product".
                if (model?.name) {
                    models[model.name] = model;
                }
            }
        }
        // Run model associations after all models are registered.
        for (const model of Object.values(models)) {
            if (typeof model.associate === 'function') {
                model.associate(models);
            }
        }
        // Expose sequelize instance with the models object.
        models.sequelize = sequelize;
    }

    // Return loaded models (and sequelize) to callers.
    return models;
}



