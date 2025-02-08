/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    basePath: '/doge-dashboard', // Replace with your repo name
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig 