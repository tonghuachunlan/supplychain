export const config = {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/supplychain',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiration: '24h',
}; 