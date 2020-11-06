import React from 'react';
import Body from '../Body';
import MyHeader from '../MyHeader';
import Footer from '../Footer';
import ItemApp from '../ItemApp';
import SearchHero from '../SearchHero';
import AddMatch from '../AddMatch';
import DeleteMatch from '../DeleteMatch'
import { Dropdown, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


class App extends React.Component {
  componentDidMount() {
    document.title = "Dota2 ProBattle"
  }

  constructor(props) {
    super(props);
    this.state = { activeItem: '' };
  }

  render() {
    const { activeItem } = this.state

    return (
      <div className="App">
        <Router>
          <MyHeader />
          <Menu>
            <Menu.Item 
              as={ Link }
              name="item"
              active={activeItem === 'item'}
              to="/item"
              onClick={this.handleItemClick}>
              Items
            </Menu.Item>
            {/* <Menu.Item 
              as={ Link }
              name="hero"
              active={activeItem === 'hero'}
              to="/hero"
              onClick={this.handleItemClick}>
              Hero
            </Menu.Item> */}
            <Dropdown text="Match" pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Item
                text="Add match"
                as = { Link }
                name="addMatch"
                to="/addMatch" />
                <Dropdown.Item
                text="Delete match"
                as = { Link }
                name="deleteMatch"
                to="/deleteMatch" />
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown text="Battle Guide" pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Header>Basic</Dropdown.Header>
                <Dropdown.Item>Opponents' signature heroes</Dropdown.Item>
                <Dropdown.Header>Advanced</Dropdown.Header>
                <Dropdown.Item>Winning Chance Prediction</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
           
          </Menu>
          {/* <Body /> */}

          <Switch>
            <Route path="/" component={ Body } exact />
            <Route path="/item" >
              <ItemApp />
            </Route>
            {/* <Route path="/hero" >
              <SearchHero />
            </Route> */}
            <Route path="/addMatch">
              <AddMatch />
            </Route>
            <Route path="/deleteMatch">
              <DeleteMatch />
            </Route>
          </Switch>
        </Router>
        
        <Footer />
      </div>
    );
  }
}

export default App;
