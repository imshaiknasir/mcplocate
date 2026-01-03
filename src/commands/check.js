import chalk from 'chalk';
import { TOOLS } from '../tools.js';
import { resolveToolPaths, pathExists, getCwd } from '../resolver.js';

/**
 * Check which MCP config files exist on the system
 */
export function checkCommand() {
    console.log('');
    console.log(chalk.cyan.bold('🔍 MCP Configuration File Check\n'));
    console.log(chalk.gray(`Current directory: ${getCwd()}\n`));

    let foundCount = 0;
    let notFoundCount = 0;

    console.log(chalk.gray('─'.repeat(70)));

    for (const [key, tool] of Object.entries(TOOLS)) {
        const paths = resolveToolPaths(tool);
        const results = [];

        // Check user config
        if (paths.user) {
            const exists = pathExists(paths.user);
            if (exists) foundCount++;
            else notFoundCount++;
            results.push({
                type: 'User',
                path: paths.user,
                exists
            });
        }

        // Check project config
        if (paths.projectAbsolute) {
            const exists = pathExists(paths.projectAbsolute);
            if (exists) foundCount++;
            else notFoundCount++;
            results.push({
                type: 'Project',
                path: paths.project,
                exists
            });
        }

        // Check system config
        if (paths.system) {
            const exists = pathExists(paths.system);
            if (exists) foundCount++;
            else notFoundCount++;
            results.push({
                type: 'System',
                path: paths.system,
                exists
            });
        }

        // Print tool header
        console.log(`\n${tool.icon} ${chalk.bold(tool.name)}`);

        // Print results
        for (const result of results) {
            const status = result.exists
                ? chalk.green('✓ Found   ')
                : chalk.gray('○ Not found');
            const pathDisplay = result.path.length > 50
                ? '...' + result.path.slice(-47)
                : result.path;
            console.log(`   ${status} ${chalk.gray(`[${result.type}]`)} ${chalk.white(pathDisplay)}`);
        }

        // Note for tools without user config
        if (!paths.user && tool.note) {
            console.log(chalk.yellow(`   ℹ ${tool.note}`));
        }
    }

    console.log(chalk.gray('\n' + '─'.repeat(70)));
    console.log(`\n📊 Summary: ${chalk.green(foundCount + ' found')}, ${chalk.gray(notFoundCount + ' not found')}\n`);
}
