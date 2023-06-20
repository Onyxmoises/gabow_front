/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_SERVER: 'http://localhost:3000', // Cambia la URL a tu servidor API
  },
  serverRuntimeConfig: {
    // Aquí puedes configurar el límite de carga
    api: {
      bodyParser: {
        sizeLimit: '50MB',
      },
    },
  },
}

module.exports = nextConfig
