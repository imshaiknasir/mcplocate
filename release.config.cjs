/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ['main'],
    plugins: [
        // Analyze commits to determine version bump
        ['@semantic-release/commit-analyzer', {
            preset: 'conventionalcommits',
            releaseRules: [
                { type: 'feat', release: 'minor' },
                { type: 'fix', release: 'patch' },
                { type: 'perf', release: 'patch' },
                { type: 'refactor', release: 'patch' },
                { type: 'docs', release: false },
                { type: 'style', release: false },
                { type: 'chore', release: false },
                { type: 'test', release: false },
                { type: 'ci', release: false },
                { breaking: true, release: 'major' },
            ],
        }],
        // Generate release notes from commits
        ['@semantic-release/release-notes-generator', {
            preset: 'conventionalcommits',
            presetConfig: {
                types: [
                    { type: 'feat', section: '✨ Features' },
                    { type: 'fix', section: '🐛 Bug Fixes' },
                    { type: 'perf', section: '⚡ Performance' },
                    { type: 'refactor', section: '♻️ Refactoring' },
                    { type: 'docs', section: '📚 Documentation', hidden: true },
                    { type: 'chore', section: '🔧 Maintenance', hidden: true },
                ],
            },
        }],
        // Update package.json version and publish to NPM
        // Using Trusted Publishers (OIDC) - configured in package.json publishConfig
        ['@semantic-release/npm', {
            provenance: true
        }],
        // Create GitHub release
        '@semantic-release/github',
        // Commit version bump back to repo
        ['@semantic-release/git', {
            assets: ['package.json', 'package-lock.json'],
            message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        }],
    ],
};
