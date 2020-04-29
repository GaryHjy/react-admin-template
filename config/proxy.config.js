const apiServer = process.env.API_SERVER;

module.exports = {
  '/api': {
    target: apiServer,
    pathRewrite: { 
      '^/api': '' 
    }
  }
}