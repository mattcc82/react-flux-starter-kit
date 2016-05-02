"use strict";

var React = require('react');
var Link = require('react-router').Link;
var PropTypes = React.PropTypes;

var NotFoundPage = React.createClass({

  render: function() {
    return (
      <div className="jumbotron">
        <h1>Page Not Found</h1>
        <p>Something messed up</p>
        <Link to="app" className="btn btn-primary btn-lg">Back Home</Link>
      </div>
    );
  }

});

module.exports = NotFoundPage;
