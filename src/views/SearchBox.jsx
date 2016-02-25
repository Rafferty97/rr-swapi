import React from 'react';
import {connect} from 'react-redux';

import SuggestionsBox from './SuggestionsBox';

function strContains(haystack, needle) {
  return ( haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1);
}

function highlightString(haystack, needle) {
  if (needle === '') {
    return [haystack];
  }
  let remainingString = haystack;
  let needleLen = needle.length;
  let els = [];
  while (strContains(remainingString, needle)) {
    let index = remainingString.toLowerCase().indexOf(needle.toLowerCase());
    els.push(remainingString.substr(0, index));
    els.push(<strong>{remainingString.substr(index, needleLen)}</strong>);
    remainingString = remainingString.substr(index + needleLen);
  }
  if (remainingString !== '') els.push(remainingString);
  return els;
}

const SearchBox = React.createClass({
  render() {
    let suggestions = this.getSuggestions();
    return (
      <div className="ui-search-box">
        <input onChange={ this.onChange }></input>
        <SuggestionsBox suggestions={ suggestions } />
      </div>
    );
  },
  getInitialState() {
    return { query: '' };
  },
  onChange(event) {
    this.setState({ query: event.target.value });
  },
  getSuggestions() {
    let query = this.state.query.trim();
    let suggs = this.props.data;
    suggs = suggs.filter(person => strContains(person.name, query));
    suggs = suggs.map(person => {
      return { id: person.id, name: highlightString(person.name, query) };
    });
    return suggs;
  }
});

function mapStateToProps(state) {
  return {
    data: state.get('persons').map((person, id) => {
      return { id, name: person.name };
    }).toArray()
  };
}

export default connect(mapStateToProps)(SearchBox);
