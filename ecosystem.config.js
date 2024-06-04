module.exports = {
  apps: [
    {
      name: 'study-nodejs-mongodb',
      script: 'src/app.ts',
      watch: true,
      watch_delay: 1000,
      ignore_watch: ['*.log'],

      // Logs
      time: true,

      // Control flow:
      autorestart: true
    }
  ]
};
