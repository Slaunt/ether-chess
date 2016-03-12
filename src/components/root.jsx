import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';

import Avatar from 'material-ui/lib/avatar';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ActionPermIdentity from 'material-ui/lib/svg-icons/action/perm-identity';
import Paper from 'material-ui/lib/paper';
import {Colors} from 'material-ui/lib/styles';

import Index from './index.jsx';
import About from './about.jsx';
import Profile from './profile.jsx';
import Demo from './demo.jsx';

const hfColor = Colors.teal600;

const appBarStyle = {
  backgroundColor: hfColor
};

const rootStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
  width: '100%',
  height: '100%',
  alignItems: 'center'
};

const padStyle = {
  flexGrow: 1
};

const plainLink = {
  color: 'inherit',
  textDecoration: 'none'
};

const activeLink = {
  color: Colors.orange500
};

const footerStyle = {
  width: '100%',
  fontSize: 'small',
  textAlign: 'center',
  padding: '0.3em',
  paddingTop: '0.6em',
  color: 'white',
  backgroundColor: hfColor
};

const contentStyle = {
  padding: '2em'
};

const avatarStyle = {
  backgroundColor: Colors.blueGrey400
};

let RouteContainer = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    params: React.PropTypes.object
  },

  getInitialState() {
    return {navOpen: false};
  },

  setNav(open) {
    this.setState({navOpen: open});
  },

  render() {
    const NavLink = props => {
      return (
        <MenuItem>
          <Link
            style={plainLink}
            activeStyle={activeLink}
            to={props.to}
            onClick={() => this.setNav(false)}>
            {props.children}
          </Link>
        </MenuItem>
      );
    };

    const You = () => {
      return (
        <Link to="/me">
          <Avatar icon={<ActionPermIdentity />} style={avatarStyle} />
        </Link>
      );
    };

    let Content = this.props.content ? this.props.content.type : Index;

    return (
      <div className="root" style={rootStyle}>
        <LeftNav
          docked={false}
          open={this.state.navOpen}
          onRequestChange={open => this.setState({navOpen: open})}>
          <NavLink to="/demo"> Demo </NavLink>
          <NavLink to="/about"> About </NavLink>
          <div style={padStyle}> </div>
        </LeftNav>
        <AppBar
          style={appBarStyle}
          iconElementRight={<You />}
          title={<Link style={plainLink} to="/"> Ether Chess </Link>}
          onLeftIconButtonTouchTap={() => this.setNav(true)}/>
        <div className="content" style={contentStyle}>
          <Content params={this.props.params} />
        </div>
        <div style={padStyle}> </div>
        <Paper className="site-footer" style={footerStyle} zDepth={5}>
          Hello
        </Paper>
      </div>
    );
  }
});

const Root = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={RouteContainer}>
        <Route path="/about" components={{content: About}} />
        <Route path="/demo" components={{content: Demo}} />
        <Route path="/profile/:address" components={{content: Profile}} />
      </Route>
    </Router>
  );
};

export default Root;
