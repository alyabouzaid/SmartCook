import React from 'react';
import Header from "./Header";
import { TextField } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import "./style.css";

const useStyles = makeStyles({
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
});

export default function SignUp() {
    const classes = useStyles();
    return (
        <div>
            <Header/>
            <Container className={classes.root} maxWidth="sm">
                <div>
                    <TextField label="First Name">Text box</TextField>
                </div>
                <div>
                    <TextField label="Last Name">Text box</TextField>
                </div>
                <div>
                    <TextField label="Password" type={"password"}>Text box</TextField>
                </div>
                <div>
                    <Button
                        href=""
                        color="inherit"
                        target="_blank"
                        size="small"
                        onClick=""
                    >
                        Sign up
                    </Button>
                </div>
            </Container>
        </div>
    );
}