import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { withStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

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

class Header extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isAuthenticated: true,
        };
    }

    componentDidMount () {
        fetch('http://localhost:9000/auth/user')
            .then(res => res.text())
            .then(res => {
                const user = JSON.parse(res);
                console.log(user);
                if (user) {
                    this.setState({isAuthenticated: user.isLoggedIn});
                }
            })
            .catch(err => err);
    }

    render() {
        const {classes} = this.props;
        return (
            <AppBar className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <Typography style={{textAlign: "left"}} variant="h5" className={classes.websiteTitle}>
                        <Link to={"/"}
                              style={{ textDecoration: 'none', color:"inherit" }}>
                            SmartCook
                        </Link>
                    </Typography>
                    <List className="menu-list">
                        {this.state.isAuthenticated ? (
                            <ListItem className="menu-item">

                                <Link to={"/ingredientInventory"}
                                      style={{ textDecoration: 'none', color:"inherit" }}>
                                    <Button
                                        href=""
                                        color="inherit"
                                        target="_blank"
                                        size="small"
                                    >
                                        Inventory
                                    </Button>
                                </Link>

                                <Link to={"/recommendation"}
                                      style={{ textDecoration: 'none', color:"inherit" }}>
                                    <Button
                                        href=""
                                        color="inherit"
                                        target="_blank"
                                        size="small"
                                        onClick=""
                                    >
                                        Recommender
                                    </Button>
                                </Link>

                                <Button
                                    href=""
                                    color="inherit"
                                    target="_blank"
                                    size="small"
                                    onClick=""
                                >
                                    Journal
                                </Button>
                                <Button
                                    href=""
                                    color="inherit"
                                    target="_blank"
                                    size="small"
                                    onClick=""
                                >
                                    Food Pictures
                                </Button>
                                <Button
                                    href="http://localhost:9000/auth/logout"
                                    color="inherit"
                                    target="_self"
                                    size="small"
                                    onClick=""
                                >
                                    Logout
                                </Button>
                            </ListItem>
                        ) : (
                            <ListItem>
                                <Link to={"/"}
                                      style={{ textDecoration: 'none', color:"inherit" }}>
                                    <Button
                                        href=""
                                        color="inherit"
                                        target="_self"
                                        size="small"
                                    >
                                        Home
                                    </Button>
                                </Link>
                                <Button href="" color="inherit" target="_blank" size="small">
                                    About
                                </Button>
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

export default withStyles(useStyles)(Header);
