import chalk from 'chalk';
import { findTool, getAllToolKeys } from '../tools.js';
import { resolveToolPaths, pathExists } from '../resolver.js';

/**
 * Show MCP path(s) for a specific tool
 * @param {string} toolName - Tool name or alias
 */
export function showCommand(toolName) {
    const tool = findTool(toolName);

    if (!tool) {
        console.log(chalk.red(`\n❌ Unknown tool: "${toolName}"\n`));
        console.log(chalk.gray('Supported tools:'));
        getAllToolKeys().forEach(key => {
            console.log(chalk.cyan(`  • ${key}`));
        });
        console.log(chalk.gray('\nRun `mcplocate list` for more details.\n'));
        process.exit(1);
    }

    const paths = resolveToolPaths(tool);

    // Header
    console.log('');
    console.log(chalk.cyan.bold(`${tool.icon} ${tool.name} MCP Configuration\n`));

    // User config
    if (paths.user) {
        const exists = pathExists(paths.user);
        const status = exists ? chalk.green('✓ exists') : chalk.yellow('○ not found');
        console.log(`  ${chalk.bold('User Config:')}    ${chalk.white(paths.user)}`);
        console.log(`                  ${status}`);
    } else if (tool.note) {
        console.log(`  ${chalk.bold('User Config:')}    ${chalk.gray('(managed via UI)')}`);
    }

    // Project config
    if (paths.project) {
        const exists = pathExists(paths.projectAbsolute);
        const status = exists ? chalk.green('✓ exists') : chalk.yellow('○ not found');
        console.log(`  ${chalk.bold('Project Config:')} ${chalk.white(paths.project)}`);
        console.log(`                  ${status}`);
    }

    // System config (if exists)
    if (paths.system) {
        const exists = pathExists(paths.system);
        const status = exists ? chalk.green('✓ exists') : chalk.gray('○ not found');
        console.log(`  ${chalk.bold('System Config:')}  ${chalk.white(paths.system)}`);
        console.log(`                  ${status}`);
    }

    console.log('');

    // Note if exists
    if (tool.note) {
        console.log(chalk.yellow(`📝 Note: ${tool.note}\n`));
    }

    // Copy hint
    console.log(chalk.gray(`💡 Tip: Run \`mcplocate open ${tool.key}\` to open the config file\n`));
}
