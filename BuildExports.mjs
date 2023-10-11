import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { PowerHelper as helper } from '@knighttower/js-utility-functions/index.mjs';

/**
 * Reads a file and returns the names of the exported modules.
 * @param {string} filePath
 * @returns {Object} Object containing arrays of named exports and the default export
 */
function getExports(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const directExports =
        content.match(/export\s+(const|let|var|function|class)\s+(\w+)|export\s+(\w+)|export\s*{([^}]+)}/g) || [];
    const defaultExport = content.match(/export\s+default\s+(class|function)?\s*(\w+)|(\w+)\s+as\s+default/) || [];
    const aliases = content.match(/export\s*{([^}]+)}/g) || [];

    let namedExports = [];

    directExports.forEach((exp) => {
        const parts = exp.replace('export ', '').split(' ');
        if (parts.length === 1) {
            namedExports.push(parts[0]);
        } else if (parts.length === 2) {
            namedExports.push(parts[1]);
        } else {
            const innerExports = parts[2].slice(1, -1).split(',');
            innerExports.forEach((e) => {
                const [original, alias] = e.trim().split(' as ');
                namedExports.push(alias || original);
            });
        }
    });

    let defaultExportName = null;

    if (defaultExport) {
        defaultExportName = defaultExport[2] || defaultExport[3];
    }

    // throw new Error('stop');
    // Adding aliases
    aliases.forEach((aliasLine) => {
        const parts = aliasLine.replace('export {', '').replace('}', '').split(',');
        parts.forEach((part) => {
            part = part.trim();
            if (part.includes(' as ')) {
                const [original, alias] = helper.getChunks(part, ' as ');
                if (alias && alias !== 'default') {
                    alias = alias.trim();
                    console.log('___ log ___', alias);
                    if (!namedExports.includes(alias)) {
                        namedExports.push(alias);
                    }
                }
            } else {
                console.log(part);
                namedExports.push(part);
            }
        });
    });

    console.log(aliases, namedExports);

    // throw new Error('stop');
    // Remove 'default' from named exports
    namedExports = namedExports.filter((name) => name !== 'default' && name !== defaultExportName);

    return {
        named: Array.from(new Set(namedExports)), // Remove duplicates
        default: defaultExportName,
    };
}

/**
 * Generates the content for the index.js file.
 * @param {Object} allExports - An object containing information about all exports
 * @returns {string} - The content for the index.js file
 */
function generateIndexContent(allExports) {
    let imports = '';
    let exports = '';

    for (const [filePath, { named, default: defaultExport }] of Object.entries(allExports)) {
        const moduleName = path.basename(filePath).replace(/\.js|\.mjs/, '');
        const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

        if (named.length > 0) {
            imports += `import * as _${moduleName} from './${relativePath}';\n`;
            named.forEach((name) => {
                if (name) {
                    exports += `export const ${name} = _${moduleName}.${name};\n`;
                }
            });
        }

        if (defaultExport) {
            imports += `import ${defaultExport} from './${relativePath}';\n`;
            exports += `export { ${defaultExport} };\n`;
        }
    }

    return `${imports}\n${exports}`;
}

/**
 * Main function to generate the index.js file.
 */
export function generateIndex() {
    const directory = process.argv.includes('--dir') ? process.argv[process.argv.indexOf('--dir') + 1] : './src';
    // Synchronously fetch all file paths within a directory and its subdirectories
    // that have a .js or .mjs extension
    const filePaths = glob.sync(`${directory}/**/*.{js,mjs}`);

    console.log(directory);
    const allExports = {};

    filePaths.forEach((filePath) => {
        if (path.basename(filePath) === 'index.mjs') {
            return;
        }
        allExports[filePath] = getExports(filePath);
    });

    const indexContent = generateIndexContent(allExports);
    fs.writeFileSync(path.join(process.cwd(), 'index.mjs'), indexContent);
    console.log('index generated');
}

// generateIndex();
