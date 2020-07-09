import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import pic from "../landingPage/landingPage.jpg";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Header from "../login/Header";

import { Input, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
  },
  rootCard: {
    width: 500,
  },
  rootCardTitle: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

export default function FoodPicturesCreatePost(props) {
  const classes = useStyles();

  return (
    <div>
      <Header />

      <div className={classes.rootContainer}>
        <Card className={classes.rootCard}>
          <Typography
            className={classes.rootCardTitle}
            variant="h5"
            component="p"
          >
            Food picture post
          </Typography>
          <form
            className={classes.description}
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   makeComment(e.target[0].value, item._id);
            // }}
          >
            <TextField
              multiline
              rows={5}
              type="text"
              placeholder="Enter post description"
              value=""
              //   onChange={(e) => setDescription(e.target.value)}
            />
          </form>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            //   onClick={handleClick}
          >
            Upload Pic
          </Button>
          <input
            type="file"
            // onChange={handleChange}
            style={{ display: "none" }}
          />
          <CardMedia
            className={classes.media}
            // image={}
            title="Paella dish"
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            SUBMIT POST
          </Button>
        </Card>
      </div>
    </div>
  );
}
