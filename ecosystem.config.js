module.exports = {
  apps: [
    {
      name: 'study-nodejs-mongodb',
      script: 'src/app.ts',
      watch: ['server'],
      watch_delay: 1000,
      ignore_watch: ['*.log'],

      // Logs
      time: true,

      // Control flow:
      autorestart: true
    }
  ]
};
