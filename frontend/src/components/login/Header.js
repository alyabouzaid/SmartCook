import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles, withTheme } from "@material-ui/core/styles";
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
    constructor(props) {
        super(props);
    }

// function Header(props) {

    // const classes = useStyles();
    render() {
        const {classes} = this.props;
        return (
            <AppBar className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <Typography style={{textAlign: "left"}} variant="h5" className={classes.websiteTitle}>
                        SmartCook
                    </Typography>
                    {/* </Button> */}
                    <List className="menu-list">
                        {/*{this.props.isAuthenticated ? (*/}
                            <ListItem className="menu-item">

                                <Link to={"/ingredientInventory"}
                                      style={{ textDecoration: 'none', color:"inherit" }}>
                                <Button
                                    href=""
                                    color="inherit"
                                    target="_blank"
                                    size="small"
                                    // onClick={() => { this.props.logIn(pageConstants.INVENTORY_PAGE)}}
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
                                <Link to={"/logIn"}
                                      style={{ textDecoration: 'none', color:"inherit" }}>
                                <Button
                                    href=""
                                    color="inherit"
                                    target="_blank"
                                    size="small"
                                    onClick=""
                                >
                                    Logout
                                </Button>
                                </Link>
                            </ListItem>
                        {/*) : (*/}
                        {/*    <ListItem>*/}
                        {/*        <Button href="" color="inherit" target="_blank" size="small"*/}
                        {/*                onClick={() => { this.props.logIn(pageConstants.LANDING_PAGE)}}>*/}
                        {/*            Home*/}
                        {/*        </Button>*/}
                        {/*        <Button href="" color="inherit" target="_blank" size="small">*/}
                        {/*            About*/}
                        {/*        </Button>*/}
                        {/*        <Button*/}
                        {/*            href=""*/}
                        {/*            color="inherit"*/}
                        {/*            target="_blank"*/}
                        {/*            size="small"*/}
                        {/*            onClick={this.props.login}*/}
                        {/*            // onClick={() => { this.props.logIn(pageConstants.LOG_IN_PAGE)}}*/}
                        {/*        >*/}
                        {/*            Login*/}
                        {/*        </Button>*/}
                        {/*        <Button*/}
                        {/*            href=""*/}
                        {/*            color="inherit"*/}
                        {/*            target="_blank"*/}
                        {/*            size="small"*/}
                        {/*            style={{*/}
                        {/*                color: "#00bfa5",*/}
                        {/*                fontWeight: "bold",*/}
                        {/*            }}*/}
                        {/*            onClick={() => { this.props.logIn(pageConstants.SIGN_UP_PAGE)}}*/}
                        {/*        >*/}
                        {/*            Sign up*/}
                        {/*        </Button>*/}
                        {/*    </ListItem>*/}
                        {/*)}*/}
                    </List>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(useStyles)(Header);
