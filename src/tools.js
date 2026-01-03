/**
 * Tool definitions with MCP configuration paths for each AI coding tool
 * Paths are defined per OS: win32, darwin (macOS), linux
 */

export const TOOLS = {
    claude: {
        name: 'Claude Code',
        description: 'Anthropic\'s Claude AI coding assistant',
        icon: '🤖',
        paths: {
            user: {
                win32: '~/.claude/claude_desktop_config.json',
                darwin: '~/.claude/claude_desktop_config.json',
                linux: '~/.claude/claude_desktop_config.json'
            },
            project: '.mcp.json'
        },
        aliases: ['claude-code', 'claudecode', 'anthropic'],
        docs: 'https://docs.anthropic.com/en/docs/claude-code'
    },

    gemini: {
        name: 'Gemini CLI',
        description: 'Google\'s Gemini AI command-line interface',
        icon: '✨',
        paths: {
            user: {
                win32: '~/.gemini/settings.json',
                darwin: '~/.gemini/settings.json',
                linux: '~/.gemini/settings.json'
            },
            project: '.gemini/settings.json',
            system: {
                win32: 'C:\\ProgramData\\gemini-cli\\settings.json',
                darwin: '/Library/Application Support/GeminiCli/settings.json',
                linux: '/etc/gemini-cli/settings.json'
            }
        },
        aliases: ['gemini-cli', 'geminicli', 'google-gemini'],
        docs: 'https://github.com/google-gemini/gemini-cli'
    },

    cursor: {
        name: 'Cursor',
        description: 'AI-powered code editor',
        icon: '📝',
        paths: {
            user: {
                win32: '~/.cursor/mcp.json',
                darwin: '~/.cursor/mcp.json',
                linux: '~/.cursor/mcp.json'
            },
            project: '.cursor/mcp.json'
        },
        aliases: ['cursor-ide', 'cursoride'],
        docs: 'https://docs.cursor.com/context/model-context-protocol'
    },

    copilot: {
        name: 'GitHub Copilot CLI',
        description: 'GitHub\'s AI pair programmer CLI',
        icon: '🐙',
        paths: {
            user: {
                win32: '~/.copilot/mcp-config.json',
                darwin: '~/.copilot/mcp-config.json',
                linux: '~/.copilot/mcp-config.json'
            },
            project: '.copilot/mcp-config.json'
        },
        aliases: ['github-copilot', 'gh-copilot', 'copilot-cli'],
        docs: 'https://docs.github.com/en/copilot'
    },

    vscode: {
        name: 'VS Code',
        description: 'Visual Studio Code with MCP support',
        icon: '💻',
        paths: {
            user: {
                win32: '%APPDATA%/Code/User/mcp.json',
                darwin: '~/Library/Application Support/Code/User/mcp.json',
                linux: '~/.config/Code/User/mcp.json'
            },
            project: '.vscode/mcp.json'
        },
        aliases: ['code', 'visual-studio-code', 'vsc'],
        docs: 'https://code.visualstudio.com/docs'
    },

    antigravity: {
        name: 'Antigravity',
        description: 'Google\'s AI-powered coding assistant',
        icon: '🚀',
        paths: {
            user: {
                win32: null, // Managed via UI
                darwin: null,
                linux: null
            },
            project: '.mcp.json'
        },
        aliases: ['anti-gravity', 'google-antigravity'],
        docs: 'https://antigravity.google',
        note: 'User-level MCP config is managed through the Antigravity UI. Use the "..." menu > "MCP Servers" to configure.'
    },

    warp: {
        name: 'Warp',
        description: 'AI-powered terminal with MCP support',
        icon: '⚡',
        paths: {
            user: {
                win32: '~/.warp/mcp.json',
                darwin: '~/.warp/mcp.json',
                linux: '~/.local/state/warp-terminal/mcp/mcp.json'
            },
            project: null
        },
        aliases: ['warp-terminal', 'warpterminal'],
        docs: 'https://docs.warp.dev',
        note: 'MCP servers can also be managed via Settings > AI > Manage MCP servers in Warp.'
    }
};

/**
 * Find a tool by name or alias
 * @param {string} query - Tool name or alias
 * @returns {Object|null} - Tool config or null if not found
 */
export function findTool(query) {
    const normalized = query.toLowerCase().trim();

    // Direct match
    if (TOOLS[normalized]) {
        return { key: normalized, ...TOOLS[normalized] };
    }

    // Search aliases
    for (const [key, tool] of Object.entries(TOOLS)) {
        if (tool.aliases.includes(normalized)) {
            return { key, ...tool };
        }
    }

    return null;
}

/**
 * Get all tool keys
 * @returns {string[]} - Array of tool keys
 */
export function getAllToolKeys() {
    return Object.keys(TOOLS);
}
