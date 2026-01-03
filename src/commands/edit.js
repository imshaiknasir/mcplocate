import chalk from 'chalk';
import open from 'open';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { findTool, getAllToolKeys } from '../tools.js';
import { resolveToolPaths, pathExists } from '../resolver.js';

/**
 * Default MCP config template
 */
const DEFAULT_MCP_CONFIG = {
    mcpServers: {
        // Add your MCP servers here
        // "example-server": {
        //   "command": "npx",
        //   "args": ["-y", "@example/mcp-server"]
        // }
    }
};

/**
 * Edit MCP config file (creates if doesn't exist)
 * @param {string} toolName - Tool name or alias
 * @param {Object} options - Command options
 */
export async function editCommand(toolName, options) {
    const tool = findTool(toolName);

    if (!tool) {
        console.log(chalk.red(`\n❌ Unknown tool: "${toolName}"\n`));
        console.log(chalk.gray('Supported tools:'));
        getAllToolKeys().forEach(key => {
            console.log(chalk.cyan(`  • ${key}`));
        });
        process.exit(1);
    }

    const paths = resolveToolPaths(tool);

    // Determine which config to edit
    let targetPath;
    let configType;

    if (options.project) {
        targetPath = paths.projectAbsolute;
        configType = 'Project';
    } else {
        targetPath = paths.user;
        configType = 'User';
    }

    if (!targetPath) {
        if (tool.note) {
            console.log(chalk.yellow(`\n⚠️  ${tool.name} user config is managed via UI.`));
            console.log(chalk.gray(`   ${tool.note}`));
            console.log(chalk.gray(`\n   Use \`mcplocate edit ${tool.key} -p\` to edit project config instead.\n`));
        } else {
            console.log(chalk.red(`\n❌ No ${configType.toLowerCase()} config path defined for ${tool.name}\n`));
        }
        process.exit(1);
    }

    const exists = pathExists(targetPath);

    if (!exists) {
        console.log(chalk.yellow(`\n📝 Creating new ${configType.toLowerCase()} config for ${tool.name}...`));
        console.log(chalk.gray(`   ${targetPath}\n`));

        try {
            // Create directory if needed
            const dir = dirname(targetPath);
            mkdirSync(dir, { recursive: true });

            // Write default config
            writeFileSync(targetPath, JSON.stringify(DEFAULT_MCP_CONFIG, null, 2));
            console.log(chalk.green('✓ Created default MCP config\n'));
        } catch (error) {
            console.log(chalk.red(`\n❌ Failed to create file: ${error.message}\n`));
            process.exit(1);
        }
    } else {
        console.log(chalk.cyan(`\n✏️  Editing ${tool.name} ${configType.toLowerCase()} config...`));
        console.log(chalk.gray(`   ${targetPath}\n`));
    }

    try {
        await open(targetPath);
        console.log(chalk.green('✓ Opened in default editor\n'));
    } catch (error) {
        console.log(chalk.red(`\n❌ Failed to open file: ${error.message}\n`));
        process.exit(1);
    }
}
