import React from 'react';
import PropTypes from 'prop-types';

/**
 * I really want this to wrap at mobile breakpoints but that seams
 * not in the spirit of the design system.
 */
const WeatherCardGrid = ({ children }) => {
	return (
		<div className="slds-p-around_large">
			<div className="slds-grid slds-grid_align-center slds-gutters slds-wrap">
				{children.map((childCard) => 
					<div className="slds-col slds-shrink">
						{childCard}
					</div>
				)}
			</div>
		</div>
	);
}

WeatherCardGrid.propTypes = {
	// force children - how to force that they are weathercards?
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
}

export default WeatherCardGrid;