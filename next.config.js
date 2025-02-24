/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // Eğer harici görsel kaynakları kullanıyorsanız
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Build sırasında ESLint hatalarını yoksayar
  },
};
