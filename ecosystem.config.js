module.exports = {
  apps: [
    {
      name: 'rihla-global',
      script: 'dist/index.cjs',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_memory_restart: '500M',
      exp_backoff_restart_delay: 100,
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.git'],
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};
