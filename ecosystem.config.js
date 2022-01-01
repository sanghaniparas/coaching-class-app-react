module.exports = {
  apps: [{
    name: 'admisure frontend',
    script: 'npm run serve',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    // args: 'start',
    instances: 1,
    autorestart: true,
    watch: true,
    // max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    ignore_watch: [
      ".git",
      "logs",
      "node_modules",

    ]
  }]
};
