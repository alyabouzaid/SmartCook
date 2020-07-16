import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
    root: {
        width: 250,
    },
    input: {
        width: 55,
    },
});
// TODO: fix slider range (only goes from 0 to 100)
export default function CategorySlider({category}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(50);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > category.maxValue) {
            setValue(category.maxValue);
        }
    };

    return (
        <div className={classes.root}>
            <Typography id={category.name} gutterBottom>
                {category.name}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby={category.name}
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 100,
                            min: 0,
                            max: category.maxValue,
                            type: 'number',
                            'aria-labelledby': "cuisine",
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}