import React, {Component} from 'react';

class ListItem extends Component {
    render() {
        return (
                <tr>
                    <td>{this.props.x.sensor_name}</td>
                    <td>{this.props.x.sensor_enabled}</td>
                    <td>{this.props.x.sensor_description}</td>
                </tr>
        );
    }
}

export default ListItem;