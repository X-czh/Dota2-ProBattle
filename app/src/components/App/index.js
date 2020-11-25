import React from 'react';
import { Dropdown, Header, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Body from '../Body';
import MyHeader from '../MyHeader';
import Footer from '../Footer';
import ItemApp from '../ItemApp';
import HeroApp from '../HeroApp';
import AddMatch from '../AddMatch';
import DeleteMatch from '../DeleteMatch';
import SearchMatch from '../SearchMatch';
import UpdateMatch from '../UpdateMatch';
import WinChance from '../WinChance';

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
            <Dropdown text="Match" pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Header>Search</Dropdown.Header>
                  <Dropdown.Item
                    text="Search by match ID"
                    as = { Link }
                    name="searchMatchByMatchID"
                    to="/searchMatchByMatchID"
                  />
                  <Dropdown.Item
                    text="Search by account ID"
                    as = { Link }
                    name="searchMatchByAccountID"
                    to="/searchMatchByAccountID" 
                  />
                <Dropdown.Header>Add</Dropdown.Header>
                  <Dropdown.Item
                    text="Add by match ID"
                    as = { Link }
                    name="addMatchByMatchID"
                    to="/addMatchByMatchID"
                  />
                  <Dropdown.Item
                    text="Add by account ID"
                    as = { Link }
                    name="addMatchByAccountID"
                    to="/addMatchByAccountID" 
                  />
                <Dropdown.Header>Update</Dropdown.Header>
                <Dropdown.Item
                  text="Update start time"
                  as = { Link }
                  name="updateMatch"
                  to="/updateMatch"
                />
                <Dropdown.Header>Delete</Dropdown.Header>
                <Dropdown.Item
                  text="Delete match"
                  as = { Link }
                  name="deleteMatch"
                  to="/deleteMatch" 
                />
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown text="Battle Guide" pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Header>Basic</Dropdown.Header>
                <Dropdown.Item
                text="Opponents' signature heroes"
                as = { Link }
                name="HeroApp"
                to="/HeroApp" />
                <Dropdown.Header>Advanced</Dropdown.Header>
                <Dropdown.Item
                text="Winning Chance Prediction"
                as = { Link }
                name="WinChance"
                to="/WinChance" />
              </Dropdown.Menu>
            </Dropdown>
           
          </Menu>
          {/* <Body /> */}

          <Switch>
            <Route path="/" component={ Body } exact />
            <Route path="/item" >
              <ItemApp />
            </Route>
            <Route path="/searchMatchByMatchID">
              <SearchMatch searchType="MatchID" />
            </Route>
            <Route path="/searchMatchByAccountID">
              <SearchMatch searchType="AccountID" />
            </Route>
            <Route path="/addMatchByMatchID">
              <AddMatch addType="MatchID" />
            </Route>
            <Route path="/addMatchByAccountID">
              <AddMatch addType="AccountID" />
            </Route>
            <Route path="/updateMatch">
              <UpdateMatch />
            </Route>
            <Route path="/deleteMatch">
              <DeleteMatch />
            </Route>
            <Route path="/HeroApp">
              <HeroApp />
            </Route>
            <Route path="/WinChance">
              <WinChance />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
