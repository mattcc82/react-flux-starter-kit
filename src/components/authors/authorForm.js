"use strict";

var React = require('react');
var TextInput = require('../common/textInput');
var PropTypes = React.PropTypes;

var AuthorForm = React.createClass({
  propTypes: {
    author: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
  },
  render: function() {
    return (
      <div className="container-fluid">
        <h1>Manage Authors</h1>
        <div className="row">
          <form className="col-xs-6">
            <TextInput
              name="firstName"
              label="First Name"
              value={this.props.author.firstName}
              onChange={this.props.onChange}
              error={this.props.errors.firstName} />
            <TextInput
              name="lastName"
              label="Last Name"
              value={this.props.author.lastName}
              onChange={this.props.onChange}
              error={this.props.errors.lastName} />
            <input
              type="submit"
              value="Save"
              className="btn btn-default"
              onClick={this.props.onSave} />
          </form>
        </div>
      </div>
    );
  }

});

module.exports = AuthorForm;
