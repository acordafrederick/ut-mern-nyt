var React = require("react");

var History = React.createClass({

  handleDelete: function(event) {
    var x = event.target.value;
    helpers.deleteHistory(this.props.results[x].snippet, this.props.results[x].web_url, this.props.results[x].pub_date).then(function() {
  });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-center">
          { this.props.history &&
            this.props.history.map(function(search, i) {
              return (
                <div>
                  <p key={i}><a href={search.url} target="_blank">{search.topic}</a> - {search.date}</p>
                  <button className="btn-default deleteButton" value={i} onClick={this.handleDelete}>Delete</button>
                </div>
              );
            })}

        </div>
      </div>
    );

  }
});

// Export the component back for use in other files
module.exports = History;
