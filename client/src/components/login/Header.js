import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { loadUserData } from "../../actions/userActions";
import Settings from "./settings";
import pic from "../../pictures/smartcookLogo.png";
import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = (theme) => ({
  appbar: {
    color: "secondary",
    position: "sticky",
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  websiteTitle: {
    flex: 1,
    marginLeft: 15,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
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
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.primary.main,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    justifyContent: "center",
  },
}))(MenuItem);

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      isOpen: false,
    };
  }

  componentDidMount() {
    this.props.loadUserData();
  }

  handleClickOpenDropDownMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClickCloseDropDownMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleClickOpenSettingsIcon = () => {
    this.setState({ isOpen: true });
  };

  handleClickCloseSettingsIcon = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.appbar} color="secondary">
        <Toolbar className={classes.toolbar}>
          <img src={pic} style={{ width: 50, height: 50 }}></img>
          <Typography
            style={{ textAlign: "left", fontFamily: "Grand Hotel" }}
            variant="h4"
            className={classes.websiteTitle}
          >
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "inherit",
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
                  to={"/journalView"}
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

                <Button
                  href=""
                  color="inherit"
                  target="_blank"
                  size="small"
                  onClick={this.handleClickOpenDropDownMenu}
                >
                  Food Pictures
                </Button>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClickCloseDropDownMenu}
                >
                  <StyledMenuItem>
                    <Link
                      to={"/foodPicAllPost"}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      All posts
                    </Link>
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <Link
                      to={"/foodPicMyPost"}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      My posts
                    </Link>
                  </StyledMenuItem>
                </StyledMenu>

                <Button
                  href="/auth/logout"
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

                <IconButton
                  className={classes.settingsIcon}
                  onClick={this.handleClickOpenSettingsIcon}
                >
                  <SettingsIcon
                    style={{
                      color: "#00bfa5",
                    }}
                  />
                </IconButton>

                {this.state.isOpen ? (
                  <Settings
                    isOpen={this.state.isOpen}
                    isClose={this.handleClickCloseSettingsIcon}
                  />
                ) : null}

                {this.props.userInfo.userUploadedPic ? (
                  <Tooltip title={this.props.userInfo.email} placement="bottom">
                    <Avatar
                      className={classes.avatar}
                      alt={this.props.userInfo.fullName}
                      src={this.props.userInfo.userUploadedPic}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title={this.props.userInfo.email} placement="bottom">
                    <Avatar
                      className={classes.avatar}
                      alt={this.props.userInfo.fullName}
                      src={this.props.userInfo.googleDefaultPic}
                    />
                  </Tooltip>
                )}
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

                <Button
                  href="/auth/google"
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
  return { userInfo: state.userStore };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, { loadUserData })
)(Header);
