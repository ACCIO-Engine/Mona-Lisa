import path from 'path';
import fs from 'fs';

function readConfigFile() {
    try {
        const filePath = path.join(__dirname, "config.json");
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading config file:", error);
        return null;
    }
}



export default readConfigFile;
