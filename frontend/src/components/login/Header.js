import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { loadUserData } from "../../actions/userActions";
import { useLocation } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "../../index.css";

const useStyles = (theme) => ({
  appbar: {
    backgroundColor: "#e0f2f1",
    // "#e3f2fd",
    color: "black",
    position: "sticky",
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  websiteTitle: {
    flex: 1,
    marginLeft: 15,
  },
});

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.loadUserData();
  }

  handleClick(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { pathname } = window.location.pathname;

    return (
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            style={{ textAlign: "left" }}
            variant="h5"
            className={classes.websiteTitle}
          >
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "inherit",
                // fontFamily: "Grand Hotel",
                // fontSize: 30,
              }}
            >
              SmartCook
            </Link>
          </Typography>

          <List className="menu-list">
            {this.props.userInfo.isLoggedIn ? (
              <ListItem className="menu-item">
                <NavLink
                  to={"/ingredientInventory"}
                  activeClassName="selected"
                  activeStyle={{
                    borderBottom: "2px solid #43AA8B",
                  }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button href="" color="inherit" target="_blank" size="small">
                    Inventory
                  </Button>
                </NavLink>

                <NavLink
                  to={"/recommendation"}
                  activeClassName="selected"
                  activeStyle={{
                    borderBottom: "2px solid #43AA8B",
                  }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button
                    href=""
                    color="inherit"
                    target="_blank"
                    size="small"
                    onClick=""
                  >
                    Recommender
                  </Button>
                </NavLink>

                <NavLink
                  to={"/journal"}
                  activeClassName="selected"
                  activeStyle={{
                    borderBottom: "2px solid #43AA8B",
                  }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button
                    href=""
                    color="inherit"
                    target="_blank"
                    size="small"
                    onClick=""
                  >
                    Journal
                  </Button>
                </NavLink>

                {/* <div>
                  <Button
                    href=""
                    color="inherit"
                    target="_blank"
                    size="small"
                    onClick={this.handleClick}
                  >
                    Journal
                  </Button>
                  <StyledMenu
                    id="customized-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                    <StyledMenuItem>
                      <ListItem button component="a" href="/journal">
                        <ListItemText primary="Journal editor" />
                      </ListItem>
                    </StyledMenuItem>
                    <StyledMenuItem>
                      
                      <ListItem button component="a" href="/journalView">
                        <ListItemText primary="Collections" />
                      </ListItem>
                    </StyledMenuItem>
                  </StyledMenu>
                  </div> */}

                <Button
                  href=""
                  color="inherit"
                  target="_blank"
                  size="small"
                  onClick={this.handleClick}
                >
                  Food Pictures
                </Button>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <StyledMenuItem>
                    {/* <ListItemIcon>
                          <SendIcon fontSize="small" />
                        </ListItemIcon> */}
                    <ListItem button component="a" href="/foodPicNewPost">
                      <ListItemText primary="New post" />
                    </ListItem>
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItem button component="a" href="/foodPicAllPost">
                      <ListItemText primary="All posts" />
                    </ListItem>
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItem button component="a" href="foodPicMyPost">
                      <ListItemText primary="My posts" />
                    </ListItem>
                  </StyledMenuItem>
                </StyledMenu>

                <Button
                  href="http://localhost:9000/auth/logout"
                  color="inherit"
                  target="_self"
                  size="small"
                  onClick=""
                  style={{
                    color: "#00bfa5",
                  }}
                >
                  Logout
                </Button>
              </ListItem>
            ) : (
              <ListItem>
                <NavLink
                  to={"/"}
                  activeClassName="selected"
                  activeStyle={{
                    borderBottom: "2px solid #43AA8B",
                  }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button href="" color="inherit" target="_self" size="small">
                    Home
                  </Button>
                </NavLink>

                <NavLink
                  to={"/about"}
                  activeClassName="selected"
                  activeStyle={{
                    borderBottom: "2px solid #43AA8B",
                  }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button href="" color="inherit" target="_blank" size="small">
                    About
                  </Button>
                </NavLink>

                <Button
                  href="http://localhost:9000/auth/google"
                  color="inherit"
                  target="_self"
                  size="small"
                  style={{
                    color: "#00bfa5",
                    fontWeight: "bold",
                  }}
                  onClick=""
                >
                  Log In | Register
                </Button>
              </ListItem>
            )}
          </List>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  //name is by convention
  return { userInfo: state.userStore }; //now it will appear as props
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, { loadUserData })
)(Header);
