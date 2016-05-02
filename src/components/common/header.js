"use strict";

//CommonJS pattern
var React = require('react');
var Router = require('react-router');
var Link = Router.Link; //reference to react router Link

//use react-router Links to defined routes in routes.js instead of hrefs
var Header = React.createClass({
  render: function(){
    var style = {
      'maxWidth': '25px',
      'height': 'auto'
    };
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <Link to="app" className="navbar-brand">
            <img src="images/logo.png" style={style} alt="React / Flux Starterkit" />
          </Link>
          <ul className="nav navbar-nav">
            <li><Link to="app">Home</Link></li>
            <li><Link to="authors">Authors</Link></li>
            <li><Link to="about">About</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
