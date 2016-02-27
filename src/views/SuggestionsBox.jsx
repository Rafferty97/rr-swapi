import React from 'react';

const MAX_SUGGESTIONS = 10;

export default React.createClass({
  render() {
    let suggestions = [];
    let fetching = this.props.isFetching;
    let excess_suggs = 0;

    /* Don't display if there is no query */

    if (this.props.query.trim() === '') {
      return <ul className="suggestion-box hidden"></ul>;
    }

    /* Push each suggestion item */
    this.props.suggestions.forEach((sugg) => {
      if (suggestions.length >= MAX_SUGGESTIONS) {
        excess_suggs++;
        return;
      }
      suggestions.push(
        <li key={sugg.id} className="ui-suggestion-item">
          {sugg.name}
          <div className="entity-type">{sugg.type}</div>
        </li>
      );
    });

    /* Excess suggestions */
    if (excess_suggs > 0) {
      suggestions.push(
        <li key={-2} className="ui-suggestion-item excess-items">
          + <strong>{excess_suggs}</strong> additional results
        </li>
      );
    }

    /* If there are no suggestions */
    if (suggestions.length === 0 && !fetching) {
      suggestions.push(
        <li key={-1} className="ui-suggestion-item no-results">
          No results were found for "{this.props.query}".
        </li>
      );
    }
    else if (fetching) {
      suggestions.push(
        <li key={-1} className="ui-suggestion-item fetching">
          Loading...
        </li>
      );
    }

    return <ul className="suggestion-box">{suggestions}</ul>;
  }
});
