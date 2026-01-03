import { homedir } from 'os';
import { resolve, join } from 'path';
import { existsSync } from 'fs';

/**
 * Get the current platform
 * @returns {'win32'|'darwin'|'linux'}
 */
export function getPlatform() {
    return process.platform;
}

/**
 * Expand path variables like ~ and %APPDATA%
 * @param {string} path - Path with variables
 * @returns {string} - Expanded absolute path
 */
export function expandPath(path) {
    if (!path) return null;

    let expanded = path;
    const home = homedir();

    // Expand ~ to home directory
    if (expanded.startsWith('~/')) {
        expanded = join(home, expanded.slice(2));
    } else if (expanded.startsWith('~\\')) {
        expanded = join(home, expanded.slice(2));
    } else if (expanded === '~') {
        expanded = home;
    }

    // Expand Windows environment variables
    if (process.platform === 'win32') {
        // %APPDATA%
        expanded = expanded.replace(/%APPDATA%/gi, process.env.APPDATA || join(home, 'AppData', 'Roaming'));
        // %USERPROFILE%
        expanded = expanded.replace(/%USERPROFILE%/gi, home);
        // %LOCALAPPDATA%
        expanded = expanded.replace(/%LOCALAPPDATA%/gi, process.env.LOCALAPPDATA || join(home, 'AppData', 'Local'));
    }

    return resolve(expanded);
}

/**
 * Resolve a tool's paths for the current platform
 * @param {Object} toolConfig - Tool configuration from tools.js
 * @returns {Object} - Resolved paths { user, project, system? }
 */
export function resolveToolPaths(toolConfig) {
    const platform = getPlatform();
    const result = {};

    // Resolve user path
    if (toolConfig.paths.user) {
        const userPath = toolConfig.paths.user[platform];
        result.user = userPath ? expandPath(userPath) : null;
        result.userRaw = userPath;
    }

    // Resolve project path (just return as-is, it's relative)
    if (toolConfig.paths.project) {
        result.project = toolConfig.paths.project;
        result.projectAbsolute = resolve(process.cwd(), toolConfig.paths.project);
    }

    // Resolve system path if exists
    if (toolConfig.paths.system) {
        const systemPath = toolConfig.paths.system[platform];
        result.system = systemPath ? expandPath(systemPath) : null;
        result.systemRaw = systemPath;
    }

    return result;
}

/**
 * Check if a path exists
 * @param {string} path - Path to check
 * @returns {boolean}
 */
export function pathExists(path) {
    if (!path) return false;
    try {
        return existsSync(path);
    } catch {
        return false;
    }
}

/**
 * Get the current working directory
 * @returns {string}
 */
export function getCwd() {
    return process.cwd();
}
