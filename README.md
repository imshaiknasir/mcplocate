# 🔍 mcplocate

**Find MCP configuration file locations for AI coding tools instantly.**

Tired of searching for where your MCP (Model Context Protocol) config files are stored? `mcplocate` tells you exactly where to find them for all your favorite AI coding assistants.

## Installation

```bash
npm install -g mcplocate
```

## Supported Tools

| Tool | Icon | Aliases |
|------|------|---------|
| **Claude Code** | 🤖 | claude, claude-code, anthropic |
| **Gemini CLI** | ✨ | gemini, gemini-cli, google-gemini |
| **Cursor** | 📝 | cursor, cursor-ide |
| **GitHub Copilot** | 🐙 | copilot, github-copilot, gh-copilot |
| **VS Code** | 💻 | vscode, code, vsc |
| **Antigravity** | 🚀 | antigravity, google-antigravity |
| **Warp** | ⚡ | warp, warp-terminal |

## Usage

### Show MCP path for a specific tool

```bash
mcplocate cursor
mcplocate claude
mcplocate gemini
```

### List all supported tools

```bash
mcplocate list
```

### Check which MCP configs exist on your system

```bash
mcplocate check
```

### Open MCP config in your default editor

```bash
# Open user config
mcplocate open cursor

# Open project config
mcplocate open cursor -p
```

### Edit MCP config (creates if doesn't exist)

```bash
# Create/edit user config
mcplocate edit gemini

# Create/edit project config
mcplocate edit gemini -p
```

## Example Output

```
✨ Gemini CLI MCP Configuration

  User Config:    ~/.gemini/settings.json
                  ✓ exists
  Project Config: .gemini/settings.json
                  ○ not found
  System Config:  /etc/gemini-cli/settings.json
                  ○ not found
```

## MCP Configuration Paths

<details>
<summary>Click to see all paths by OS</summary>

### Claude Code
- **User**: `~/.claude/claude_desktop_config.json`
- **Project**: `.mcp.json`

### Gemini CLI
- **User**: `~/.gemini/settings.json`
- **Project**: `.gemini/settings.json`

### Cursor
- **User**: `~/.cursor/mcp.json`
- **Project**: `.cursor/mcp.json`

### GitHub Copilot CLI
- **User**: `~/.copilot/mcp-config.json`
- **Project**: `.copilot/mcp-config.json`

### VS Code
- **Windows**: `%APPDATA%/Code/User/mcp.json`
- **macOS**: `~/Library/Application Support/Code/User/mcp.json`
- **Linux**: `~/.config/Code/User/mcp.json`
- **Project**: `.vscode/mcp.json`

### Antigravity
- **User**: Managed via UI (Settings > MCP Servers)
- **Project**: `.mcp.json`

### Warp
- **macOS/Windows**: `~/.warp/mcp.json`
- **Linux**: `~/.local/state/warp-terminal/mcp/mcp.json`

</details>

## Contributing

This project uses **Conventional Commits** for automatic versioning. Your commit messages determine the version bump:

| Commit Prefix | Example | Version Bump |
|---------------|---------|--------------|
| `feat:` | `feat: add warp terminal support` | Minor (1.0.0 → 1.1.0) |
| `fix:` | `fix: resolve Windows paths` | Patch (1.0.0 → 1.0.1) |
| `feat!:` | `feat!: breaking API change` | Major (1.0.0 → 2.0.0) |
| `docs:` | `docs: update README` | No release |
| `chore:` | `chore: update dependencies` | No release |

Releases are automated via GitHub Actions when commits are pushed to `main`.

## License

MIT
