module.exports = {
  apps: [
    {
      name: 'supplychain-api',
      script: 'dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'database-backup',
      script: 'dist/scripts/backup.js',
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '0 0 * * *', // 每天凌晨执行
      watch: false,
      autorestart: false
    }
  ]
}; 