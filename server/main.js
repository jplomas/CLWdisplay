import { Meteor } from 'meteor/meteor'
import xml2json from 'xml2json'
import { check } from 'meteor/check'

// const xml2json = Meteor.npmRequire( 'xml2json' )

Meteor.startup(() => {
  // anything on startup?
})

const apiPost = (apiUrl, apiData, callback) => {
  try {
    const response = HTTP.post(apiUrl, apiData)
    // Successful call
    callback(null, response)
  } catch (error) {
    // console.log(error.response.statusCode)
    const myError = new Meteor.Error(error.response.statusCode, error.response.content)
    callback(myError, null)
  }
}

const apiGet = (apiUrl, callback) => {
  try {
    const response = HTTP.get(apiUrl)
    // Successful call
    callback(null, response)
  } catch (error) {
    // console.log(error.response.statusCode)
    const myError = new Meteor.Error(error.response.statusCode, error.response.content)
    callback(myError, null)
  }
}

Meteor.methods({

  login() {
    /*
      TODO: takes username and password as input

      Returns: API key for 10mins or error
    */


    // INSERT YOUR API URL HERE
    const apiUrl = ''
    // asynchronous call to API
    // INSERT YOUR API DATA HERE
    const apiData = {
      params: {
        username: '',
        password: '',
      },
    }
    const response = Meteor.wrapAsync(apiPost)(apiUrl, apiData)
    return response
  },

  ICU(apiToken) {
    check(apiToken, String)
    const apiUrl = `https://rbh.clwrota.com/xmlapi/${apiToken}/date/2017-10-21/oncalls/`

    // console.log(apiUrl)
    const response = Meteor.wrapAsync(apiGet)(apiUrl)
    return response
  },

  parseXML(xml) {
    check(xml, String)
    // console.log(xml)
    return xml2json.toJson(xml, { object: true })
  },

})
