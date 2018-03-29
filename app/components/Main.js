// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state 
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", startYear: "", endYear: "", results: [], history: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function(prevProps, prevState) {
    console.log("In componentDidUpdate"); 
    console.log("prevProps = " + prevProps);
    console.log("prevState = "+ prevState.searchTerm);
    if (this.state.searchTerm !== prevState.searchTerm) { // run only if search term has changed
      // Run the query for the address
      helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear).then(function(data) {
        if (data !== this.state.results) {
          console.log("Article", data);
          this.setState({ results: data.docs });
          
          console.log(data.docs[0].snippet, data.docs[0].web_url, data.docs[0].pub_date);

          // // After we've received the result... then post the search term to our history.
          //   helpers.postHistory(data.docs[0].snippet, data.docs[0].web_url, data.docs[0].pub_date).then(function() {
          //   console.log("Updated!");
          

            // After we've done the post... then get the updated history
            helpers.getHistory().then(function(response) {
              console.log("Current History", response.data);

              console.log("History", response.data);

              this.setState({ history: response.data });

            }.bind(this));
        //  }.bind(this));
        }
      }.bind(this));
    } // if 
  },
  // This function allows childrens to update the parent.
  setTerm: function(term,startYear,endYear) {
    this.setState({ searchTerm: term, startYear:startYear, endYear:endYear });
  },
  // Here we render the function
  render: function() {
    return (
       // <div className="container">
       <div>
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Article Finder</h2>
            <p className="text-center">
              <em>Enter a search topic</em>
            </p>
          </div>

          <div>

            <Form setTerm={this.setTerm}/>

          </div>

          <div>

            <Results results={this.state.results} />

          </div>

        </div>

        <div className="row">

          <History history={this.state.history} />

        </div>

       </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
