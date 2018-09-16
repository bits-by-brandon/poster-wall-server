module.exports = {
  apps : [{
    name      : 'poster-wall',
    script    : './dist/index.js',
    wait_ready: true,
    listen_timeout: 3000,
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '192.81.214.130',
      ref  : 'origin/master',
      repo : 'git@github.com:brandondc741/poster-wall-server.git',
      path : '/var/www/public/poster-wall.brandonchang.me',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
