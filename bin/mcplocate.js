#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { showCommand } from '../src/commands/show.js';
import { listCommand } from '../src/commands/list.js';
import { checkCommand } from '../src/commands/check.js';
import { openCommand } from '../src/commands/open.js';
import { editCommand } from '../src/commands/edit.js';
import { TOOLS } from '../src/tools.js';

// ASCII Art Banner
const banner = `
${chalk.cyan('╔═══════════════════════════════════════════════════════════╗')}
${chalk.cyan('║')}  ${chalk.bold.magenta('🔍 mcplocate')} - ${chalk.gray('MCP Configuration File Locator')}         ${chalk.cyan('║')}
${chalk.cyan('╚═══════════════════════════════════════════════════════════╝')}
`;

program
    .name('mcplocate')
    .description('Find MCP configuration file locations for AI coding tools')
    .version('1.0.0')
    .addHelpText('before', banner);

// Default command: mcplocate <tool>
program
    .argument('[tool]', 'Tool name to look up (e.g., cursor, claude, gemini)')
    .action((tool) => {
        if (tool) {
            showCommand(tool);
        } else {
            console.log(banner);
            program.help();
        }
    });

// List command: mcplocate list
program
    .command('list')
    .alias('ls')
    .description('List all supported AI tools')
    .action(listCommand);

// Check command: mcplocate check
program
    .command('check')
    .description('Check which MCP config files exist on your system')
    .action(checkCommand);

// Open command: mcplocate open <tool>
program
    .command('open <tool>')
    .description('Open MCP config file in your default editor')
    .option('-p, --project', 'Open project-level config instead of user config')
    .action(openCommand);

// Edit command: mcplocate edit <tool>
program
    .command('edit <tool>')
    .description('Edit MCP config file (creates if it doesn\'t exist)')
    .option('-p, --project', 'Edit project-level config instead of user config')
    .action(editCommand);

program.parse();

