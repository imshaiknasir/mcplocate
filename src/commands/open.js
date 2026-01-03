import chalk from 'chalk';
import open from 'open';
import { findTool, getAllToolKeys } from '../tools.js';
import { resolveToolPaths, pathExists } from '../resolver.js';

/**
 * Open MCP config file in default editor
 * @param {string} toolName - Tool name or alias
 * @param {Object} options - Command options
 */
export async function openCommand(toolName, options) {
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

    // Determine which config to open
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
            console.log(chalk.gray(`   ${tool.note}\n`));
        } else {
            console.log(chalk.red(`\n❌ No ${configType.toLowerCase()} config path defined for ${tool.name}\n`));
        }
        process.exit(1);
    }

    const exists = pathExists(targetPath);

    if (!exists) {
        console.log(chalk.yellow(`\n⚠️  ${configType} config not found: ${targetPath}`));
        console.log(chalk.gray(`   Use \`mcplocate edit ${tool.key}\` to create it.\n`));
        process.exit(1);
    }

    console.log(chalk.cyan(`\n🔓 Opening ${tool.name} ${configType.toLowerCase()} config...`));
    console.log(chalk.gray(`   ${targetPath}\n`));

    try {
        await open(targetPath);
        console.log(chalk.green('✓ Opened in default editor\n'));
    } catch (error) {
        console.log(chalk.red(`\n❌ Failed to open file: ${error.message}\n`));
        process.exit(1);
    }
}
