import chalk from 'chalk';
import { TOOLS } from '../tools.js';

/**
 * List all supported AI tools
 */
export function listCommand() {
    console.log('');
    console.log(chalk.cyan.bold('📋 Supported AI Tools\n'));

    console.log(chalk.gray('─'.repeat(60)));

    for (const [key, tool] of Object.entries(TOOLS)) {
        console.log(`${tool.icon} ${chalk.bold.white(tool.name)} ${chalk.gray(`(${key})`)}`);
        console.log(chalk.gray(`   ${tool.description}`));
        if (tool.aliases.length > 0) {
            console.log(chalk.gray(`   Aliases: ${tool.aliases.join(', ')}`));
        }
        console.log('');
    }

    console.log(chalk.gray('─'.repeat(60)));
    console.log(chalk.gray('\n💡 Usage: mcplocate <tool-name>  (e.g., mcplocate cursor)\n'));
}
