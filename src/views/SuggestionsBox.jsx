import React from 'react';

export default React.createClass({
  render() {
    let suggestions = [];

    /* Push each suggestion item */
    this.props.suggestions.forEach((sugg) => {
      suggestions.push(
        <li key={ sugg.id } className="ui-suggestion-item">
          { sugg.name }
        </li>
      );
    });

    /* If there are no suggestions */
    if (suggestions.length === 0) {
      suggestions.push(
        <li key={-1} className="ui-suggestion-item no-results">
          No results were found.
        </li>
      );
    }

    return <ul className="suggestion-box">{ suggestions }</ul>;
  }
});
