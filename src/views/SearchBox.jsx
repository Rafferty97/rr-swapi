import React from 'react';

import {toSingular} from '../util';
import SuggestionsBox from './SuggestionsBox';

const MIN_QUERY_LENGTH = 3;

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
  let i = 0;
  while (strContains(remainingString, needle)) {
    let index = remainingString.toLowerCase().indexOf(needle.toLowerCase());
    if (index !== 0) {
      els.push(<span key={i}>{remainingString.substr(0, index)}</span>);
    }
    els.push(<strong key={i+1}>{remainingString.substr(index, needleLen)}</strong>);
    remainingString = remainingString.substr(index + needleLen);
    i += 2;
  }
  if (remainingString !== '') els.push(<span key={i}>{remainingString}</span>);
  return els;
}

/* Component */

const SearchBox = React.createClass({
  render() {
    let suggestions = this.getSuggestions(),
        query = this.isQueryLongEnough() ? this.state.query.trim() : '',
        isFetching = this.props.isFetching;

    return (
      <div className="ui-search-box">
        <input onChange={this.onChange}></input>
        <SuggestionsBox
          suggestions={suggestions}
          query={query}
          isFetching={isFetching}
          />
      </div>
    );
  },
  getInitialState() {
    return { query: '' };
  },
  onChange(event) {
    let query = event.target.value;
    this.setState({ query });
    if (this.isQueryLongEnough()) {
      this.props.onQuery(query);
    }
  },
  getSuggestions() {
    let query = this.state.query.trim();
    let suggs = this.props.entities;
    suggs = suggs.filter(entity => strContains(entity.name, query));
    suggs = suggs.map(entity => {
      return {
        id: entity.id,
        type: entity.type,
        name: highlightString(entity.name, query)
      };
    });
    return suggs;
  },
  isQueryLongEnough() {
    return this.state.query.trim().length >= MIN_QUERY_LENGTH
  }
});

/* Redux connection */

import { connect } from 'react-redux';
import { newQuery } from '../actions/actions.js';

const mapStateToProps = state => {
  let entities = [];
  ['starships', 'planets', 'people'].forEach((type) => {
    state.get(type).forEach((entity, id) => {
      let typeSing = toSingular(type);
      entities.push({ id, type: typeSing, name: entity.name });
    });
  });
  return {
    entities,
    isFetching: state.getIn(['cache', 'isFetching'])
  };
};

const mapDispatchToProps = {
  onQuery: newQuery
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
