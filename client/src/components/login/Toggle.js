import React from 'react';
import compose from "recompose/compose";
import {connect} from "react-redux";
import {changeColor} from "../../actions/colorActions";
import Switch from '@material-ui/core/Switch';

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
    return { color: state.colorStore };
};

export default compose(connect(mapStateToProps, { changeColor })
)(Toggle);