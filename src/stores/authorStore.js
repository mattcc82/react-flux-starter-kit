"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
//poly fill to ES6 object assign. Glues two objects together and makes a new object with both their properties
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _authors = [];

//create a new store that extends node event emitter
//take empty new object...
//...extend it to use event emitter...
//..combine with the rest of the store
var AuthorStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getAllAuthors: function() {
    return _authors;
  },
  getAuthorById: function(id) {
    //lodash find
    return _.find(_authors, {id: id});
  }
});

Dispatcher.register(function(action){
  switch(action.actionType) {
    //initialize
    case ActionTypes.INITIALIZE:
      _authors = action.initialData.authors;
      AuthorStore.emitChange();
      break;
    //create author
    case ActionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      AuthorStore.emitChange();
      break;
    //update author
    case ActionTypes.UPDATE_AUTHOR:
      var existingAuthor = _.find(_authors, {id: action.author.id});
      var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
      _authors.splice(existingAuthorIndex, 1, action.author);
      AuthorStore.emitChange();
      break;
    //delete author
    case ActionTypes.DELETE_AUTHOR:
      debugger;
      _.remove(_authors, function(author){
        return action.id === author.id;
      });
      AuthorStore.emitChange();
      break;
    default:
      break;
  }
});

module.exports = AuthorStore;
