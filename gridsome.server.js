// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')
const gitName = 'leozhang007'

async function getFollowings(addCollection) {
  const collection = addCollection('following')
  const { data } = await axios.get(`https://api.github.com/users/${gitName}/following`)
  if (data) {
    for (const item of data) {
      collection.addNode(item)
    }
  }
}

async function getFollowers (addCollection) {
  const collection = addCollection('followers')
  let { data } = await axios.get(`https://api.github.com/users/${gitName}/followers`)
  if (!data || !data.length) {
    data = [{
      avatar_url: '',
      html_url: '',
      login: '',
      id: '-1',
    }]
  }
  if (data) {
    for (const item of data) {
      collection.addNode(item)
    }
  }
}

async function getUser (addCollection) {
  const collection = addCollection('user')
  const { data } = await axios.get(`https://api.github.com/users/${gitName}`)
  if (data) {
    collection.addNode(data)
  }
}

async function getProjects (addCollection) {
  const collection = addCollection('project')
  const { data } = await axios.get(`https://api.github.com/users/${gitName}/repos`)
  if (data && data) {
    for (const item of data) {
      collection.addNode(item)
    }
  }
}

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    await getFollowings(addCollection)
    await getFollowers(addCollection)
    await getUser(addCollection)
    await getProjects(addCollection)
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
