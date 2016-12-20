import React, { Component } from 'react';
import MapView from 'react-native-maps';

class CustomMarker extends Component {
	render() {
		return (
			<MapView.Marker
			{...this.props}
			onPress={this.showCallout.bind(this)}
			/>
		);
	}
}

export default CustomMarker;
