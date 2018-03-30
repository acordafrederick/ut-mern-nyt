var React = require("react");

var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  getInitialState: function() {
    return { searchTerm: "", startYear: "", endYear: "", results: [], history: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      if (response !== this.state.history) {
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.searchTerm !== prevState.searchTerm) {
      helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear).then(function(data) {
        if (data !== this.state.results) {
          this.setState({ results: data.docs });
            // After we've done the post... then get the updated history
            helpers.getHistory().then(function(response) {
              this.setState({ history: response.data });
            }.bind(this));
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
        <div className="w3-card-4">
          <header className="w3-container w3-light-blue">
            <h2>New York Times</h2>
          </header>
          <div className="row">
            <div className="w3-container">
              <Form setTerm={this.setTerm} />
            </div>
          </div>
          <div className="row">
            <div className="w3-container">
              <Results results={this.state.results} />
            </div>
          </div>
          <div className="row">
            <div className="w3-container">
              <History history={this.state.history} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
