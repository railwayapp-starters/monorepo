/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    RAILWAY_GIT_COMMIT_SHA: process.env.RAILWAY_GIT_COMMIT_SHA,
    RAILWAY_GIT_BRANCH: process.env.RAILWAY_GIT_BRANCH,
    RAILWAY_GIT_COMMIT_MESSAGE: process.env.RAILWAY_GIT_COMMIT_MESSAGE,
    RAILWAY_STATIC_URL: process.env.RAILWAY_STATIC_URL,
  },
};
