/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fortbux.com',
                port: '',
                pathname: '**/*',
            },
            {
                protocol: 'https',
                hostname: 'static.wikia.nocookie.net',
                port: '',
                pathname: '**/*',
            },
        ],
    },

    webpack: (config) => {
        // SVG Handling
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i
        return config
    },

    sassOptions: {
        includePaths: ['components', 'lib'],
        prependData: `@import "lib/styles/global.scss";`,
    },

    experimental: {
        turbo: {
            rules: {
                // Option format
                '*.md': [
                    {
                        loader: '@mdx-js/loader',
                        options: {
                            format: 'md',
                        },
                    },
                ],
                // Option-less format
                '*.mdx': ['@mdx-js/loader'],
            },
        },
    },

    async redirects() {
        return [
            {
                permanent: true,
                source: '/leaderboard',
                destination: '/leaderboard/weekly',
            },
        ]
    },
}

export default nextConfig
