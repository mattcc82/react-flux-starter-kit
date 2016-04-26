"use strict";

//CommonJS pattern
var React = require('react');

var Home = React.createClass({
  render: function(){
    return (
      <div className="jumbotron">
        <h1>Welcome!</h1>
        <p>
          React, React Router & Flux are used here. Feel free to clone from&nbsp;
          <a href="https://github.com/mattcc82/react-flux-starter-kit" target="_blank">
            here
          </a>
        </p>
      </div>
    );
  }
});

module.exports = Home;
