import React from 'react';

import Header from '../Header';
import Search from '../Search';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Search />
      </div>
    );
  }
}

export default App;
