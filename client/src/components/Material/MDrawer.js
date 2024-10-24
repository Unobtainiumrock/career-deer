// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';

// const styles = {
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// };

// class TemporaryDrawer extends React.Component {
//   state = {
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   };

//   toggleDrawer = (side, open) => () => {
//     this.setState({
//       [side]: open,
//     });
//   };

//   render() {
//     const { classes } = this.props;

//     const sideList = (
//       <div className={classes.list}>
//         <List>{mailFolderListItems}</List>
//         <Divider />
//         <List>{otherMailFolderListItems}</List>
//       </div>
//     );

//     const fullList = (
//       <div className={classes.fullList}>
//         <List>{mailFolderListItems}</List>
//         <Divider />
//         <List>{otherMailFolderListItems}</List>
//       </div>
//     );

//     return (
//       <div>
//         <Button onClick={this.toggleDrawer('left', true)}><i className="fas fa-bars"></i></Button>
//         <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
//           <div
//             tabIndex={0}
//             role="button"
//             onClick={this.toggleDrawer('left', false)}
//             onKeyDown={this.toggleDrawer('left', false)}
//           >
//             {sideList}
//           </div>
//         </Drawer>
//         <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
//           <div
//             tabIndex={0}
//             role="button"
//             onClick={this.toggleDrawer('top', false)}
//             onKeyDown={this.toggleDrawer('top', false)}
//           >
//             {fullList}
//           </div>
//         </Drawer>
//         <Drawer
//           anchor="bottom"
//           open={this.state.bottom}
//           onClose={this.toggleDrawer('bottom', false)}
//         >
//           <div
//             tabIndex={0}
//             role="button"
//             onClick={this.toggleDrawer('bottom', false)}
//             onKeyDown={this.toggleDrawer('bottom', false)}
//           >
//             {fullList}
//           </div>
//         </Drawer>
//         <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
//           <div
//             tabIndex={0}
//             role="button"
//             onClick={this.toggleDrawer('right', false)}
//             onKeyDown={this.toggleDrawer('right', false)}
//           >
//             {sideList}
//           </div>
//         </Drawer>
//       </div>
//     );
//   }
// }

// TemporaryDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(TemporaryDrawer);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles'; // Updated import
import Drawer from '@mui/material/Drawer'; // Updated import
import Button from '@mui/material/Button'; // Updated import
import List from '@mui/material/List';     // Updated import
import Divider from '@mui/material/Divider'; // Updated import
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer('left', false)}
        onKeyDown={this.toggleDrawer('left', false)}
      >
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    const fullList = (
      <div
        className={classes.fullList}
        role="presentation"
        onClick={this.toggleDrawer('top', false)}
        onKeyDown={this.toggleDrawer('top', false)}
      >
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer('left', true)}>
          <i className="fas fa-bars"></i>
        </Button>
        <Drawer
          anchor="left"
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
        >
          {sideList}
        </Drawer>
        <Drawer
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer('top', false)}
        >
          {fullList}
        </Drawer>
        <Drawer
          anchor="bottom"
          open={this.state.bottom}
          onClose={this.toggleDrawer('bottom', false)}
        >
          {fullList}
        </Drawer>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
        >
          {sideList}
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
