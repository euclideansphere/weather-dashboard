import React from 'react';
import PropTypes from 'prop-types';

const WeatherCardGrid = ({ children }) => {
	return (
		<div className="slds-p-around_large">
			<div className="slds-grid slds-grid_align-center slds-gutters slds-wrap">
				{children.map((childCard, idx) => 
					<div key={idx} className="slds-col slds-shrink">
						{childCard}
					</div>
				)}
			</div>
		</div>
	);
}

WeatherCardGrid.propTypes = {
	// force children - how to force that they are weathercards without 
	// typescript type inference?
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
}

export default WeatherCardGrid;
