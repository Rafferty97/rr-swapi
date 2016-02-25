import React from 'react';

import SearchBox from './SearchBox';

export default React.createClass({
  render() {
    return (
      <div>
        <h1 className="page-title">Star Wars API</h1>
        <SearchBox />
      </div>
    );
  }
});
