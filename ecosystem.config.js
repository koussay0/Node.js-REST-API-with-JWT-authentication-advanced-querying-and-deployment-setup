module.exports = {
  apps: [
    {
      name: "ideas-api",
      script: "./server.js",
      instances: "max",
      exec_mode: "cluster",
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 80,
      },
    },
  ],
};
