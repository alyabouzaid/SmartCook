import React from 'react';
import Switch from '@material-ui/core/Switch';
import compose from "recompose/compose";
import {connect} from "react-redux";
import {changeColor} from "../../actions/colorActions";

class Toggle extends React.Component {

    render() {

        const handleThemeChange = () => {
            let test = this.props.color;
            this.props.changeColor(!test);
        };

        return (
            <div>
                <Switch
                    checked={this.props.color}
                    onChange={handleThemeChange}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //name is by convention
    return { color: state.colorStore }; //now it will appear as props
};

export default compose(connect(mapStateToProps, { changeColor })
)(Toggle);