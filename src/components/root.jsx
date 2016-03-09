import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

const rootStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
  width: '100%',
  height: '100%',
  alignItems: 'center'
}

const toolbarStyle = {
  margin: '2em',
  width: '90%'
}

const padStyle = {
  flexGrow: 1
}

const footerStyle = {
  width: '100%',
  fontSize: 'small',
  color: '#ccc',
  textAlign: 'center'
}

const holderStyle = {
  width: '400px'
}

const boardCfg = {
  position: 'start',
  draggable: true
}

let board;
function createBoard() {
  board = ChessBoard('game-holder', boardCfg);
}

const Root = () => {
  return (
      <div className="root" style={rootStyle}>
        <AppBar title="Ehess" />
        <Toolbar style={toolbarStyle}>
          <ToolbarGroup firstChild={true}>
          <FlatButton label="Generate" primary={true} onClick={createBoard} />
          </ToolbarGroup>
        </Toolbar>
        <div id="game-holder" style={holderStyle}> </div>
        <div className="pad" style={padStyle}> </div>
        <div className="footer" style={footerStyle}> Credits </div>
      </div>
      );
};

export default Root;
