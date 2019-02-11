import React, {Component} from 'react';

class RegisterAutoShop extends Component {
    render() {
        return (
            <div>
                <div>
                    <label htmlFor="shop_name">
                    Shop Name:
                    <input
                        type="shop_name"
                        name="shop_name"
                        value={this.props.state.shop_name}
                        onChange={this.props.handleInputChangeFor('shop_name')}
                    />
                    </label>
                </div>
                <div>
                    <label htmlFor="shop_address">
                    Shop Address:
                    <input
                        type="shop_address"
                        name="shop_address"
                        value={this.props.state.shop_address}
                        onChange={this.props.handleInputChangeFor('shop_address')}
                    />
                    </label>
                </div>
                <div>
                    <label htmlFor="shop_number">
                    Shop Number:
                    <input
                        type="shop_number"
                        name="shop_number"
                        value={this.props.state.shop_number}
                        onChange={this.props.handleInputChangeFor('shop_number')}
                    />
                    </label>
                </div>
            </div>
        );
    }
}

export default RegisterAutoShop;