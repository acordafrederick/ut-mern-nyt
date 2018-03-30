var React = require("react");
var helpers = require("../utils/helpers");

// Results component
var Results = React.createClass({
  handleSave: function(event) {
    var x = event.target.value;
    helpers.postHistory(this.props.results[x].snippet, this.props.results[x].web_url).then(function() {
  });
  },

  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">

          {this.props.results &&
            this.props.results.map((search, i) => {
            return (
              <div>
                <p key={i}>
                  <a href={search.web_url} target="_blank">{search.snippet}</a>
                  <button className="btn-default saveButton" value={i} onClick={this.handleSave}>Save</button>
                </p>
                <hr className="line"/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = Results;
