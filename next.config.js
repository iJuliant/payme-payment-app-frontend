module.exports = {
  env: {
    APP_NAME: "payme",
    BASEURL: "http://localhost:3004/backend4/api/v1/",
    IMGURL: "http://localhost:3004/backend4/api/"
  },
  async rewrites() {
    return [
      {
        source: '/signin',
        destination: '/auth/signin'
      },
      {
        source: '/signup',
        destination: '/auth/signup'
      },
      {
        source: '/createpin',
        destination: '/auth/createpin'
      },
      {
        source: '/forgetpass',
        destination: '/auth/forgetpass'
      }
    ]
  }
}