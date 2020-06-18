import React from 'react';
import Header from "./Header";
import { TextField } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import pic from "./landingPage.jpg";


const useStyles = (theme) => ({
    root: {
        width: 400,
        height: 300,
        position: "relative",
        background: "white",
        marginTop: 200,
        marginRight: "auto",
        marginLeft: "auto",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        textAlign: "center",
        fontSize: 18,
    },
    back: {
        backgroundImage: `url(${pic})`,
        backgroundSize: 'cover',
        height: 1000,
    },
});

// export default function LogIn() {
class LogIn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.back}>
                <Header/>
                <Container className={classes.root} maxWidth="sm">
                    <div>
                        <TextField label="Username">Text box</TextField>
                    </div>
                    <div>
                        <TextField label="Password" type={"password"}>Text box</TextField>
                    </div>
                    <div>
                        <Link to={"/"}
                              style={{ textDecoration: 'none', color:"inherit" }}>
                        <Button
                            href=""
                            color="inherit"
                            target="_blank"
                            size="small"
                            // onClick={() => { this.props.logIn(pageConstants.LANDING_PAGE)}}>
                        >
                            Log in
                        </Button>
                        </Link>
                    </div>
                    <div>
                        <Button
                            href=""
                            color="inherit"
                            target="_blank"
                            size="small"
                            onClick=""
                        >
                            Forgot Password?
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default withStyles(useStyles)(LogIn);