import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/lib/toolbar';
import FlatButton from 'material-ui/lib/flat-button';

const toolbarStyle = {
  marginTop: '1em',
  marginBottom: '1em'
};

const boardCfg = {
  pieceTheme: 'chessboard/pieces/{piece}.png',
  position: 'start',
  draggable: true
};

const holderStyle = {
  width: '400px'
};

const Demo = () => {
  function createBoard() {
    /* global ChessBoard */
    ChessBoard('game-holder', boardCfg); // eslint-disable-line new-cap
  }

  return (
    <div className="demo">
      <Toolbar style={toolbarStyle}>
        <ToolbarGroup firstChild={true}>
          <FlatButton label="Generate" primary={true} onClick={createBoard} />
        </ToolbarGroup>
      </Toolbar>
      <div id="game-holder" style={holderStyle}> </div>
    </div>
  );
};

export default Demo;
