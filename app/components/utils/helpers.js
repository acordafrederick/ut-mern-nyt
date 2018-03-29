// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// NYTimes API
var nyTimesAPI = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(topic, startYear, endYear) {

    console.log(topic);
    console.log(startYear);
    console.log(endYear);

    // query URL
    var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nyTimesAPI + "&q=";
    var queryURL = queryURLBase + topic + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "0101";

    console.log(queryURL);
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      //if (response.data.results[0]) {
        console.log(response);
        console.log(response.data.response);

        if (response.data.response) {
          return response.data.response;
      } else {
      // If we don't get any results, return an empty string
        return "";
      }
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(topic, url, date) {
    console.log("in postHistory in helpers");
    return axios.post("/api", { topic:topic, date:date, url:url});
  }
};

// We export the API helper
module.exports = helper;
