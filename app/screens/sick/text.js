import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default class TestText extends React.Component {

    getProps() {
        const { fontSize, color, fontWeight } = this.props;
        return {
            fontSize,
            color,
            fontWeight,
        };
    }

    render() {
        return (
            <Text style={this.getProps()} {...this.getProps()}>{this.props.children}</Text>
        );
    }
}

TestText.defaultProps = {
    fontSize: 16,
    color: 'red',
    fontWeight: 'normal'
};

