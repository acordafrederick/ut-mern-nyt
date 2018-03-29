// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { term: "", startYear: "", endYear: ""};
  },

  // This function will respond to the user input
  handleChange: function(event) {

    this.setState({ term: event.target.value });

  },

  // This function will respond to the user input
  handleChangeStartYear: function(event) {

    this.setState({ startYear: event.target.value });

  },

  // This function will respond to the user input
  handleChangeEndYear: function(event) {

    this.setState({ endYear: event.target.value });

  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.term, this.state.startYear, this.state.endYear);
    
    this.setState({ term: "", startYear: "", endYear: ""});
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Query</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <h4 class="text-center">Search Topic</h4>
              <input
                value={this.state.term}
                type="text"
                className="form-control"
                id="term"
                onChange={this.handleChange}
                required
              />
              <h4 class="text-center">Start Year</h4>
              <input
                value={this.state.startYear}
                type="text"
                className="form-control"
                id="startYear"
                onChange={this.handleChangeStartYear}
                required
              />
              <h4 class="text-center">End Year</h4>
              <input
                value={this.state.endYear}
                type="text"
                className="form-control"
                id="endYear"
                onChange={this.handleChangeEndYear}
                required
              />
              <br />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
