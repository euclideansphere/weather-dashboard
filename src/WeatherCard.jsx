import React from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	MediaObject,
	Spinner,
} from '@salesforce/design-system-react';


const WeatherCard = ({
	loading,
	cityName,
	currentDescription,
	currentIconUri,
	tempUnits,
	temp,
	minTemp,
	maxTemp,
	humidity,
}) => {
	const toTemperatureWithUnits = (temperature) => {
		if (tempUnits === 'f') {
			return <>{`${temperature} \u00b0F`}</>;
		} else if (tempUnits === 'c') {
			return <>{`${temperature} \u00b0C;`}</>;
		} else {
			return <>{`${temperature} K;`}</>;
		}
	};

	const	getTemperatureFromKelvin = (temperature) => {
		if (tempUnits === 'f') {
			return temperature * 9 / 5 + 459.67;
		} else if (this.state.temperatureUnits === 'c') {
			return temperature - 237.15;
		} else {
			return temperature;
		}
	};

	let body;
	if (!!loading) {
		body = (
			<div style={{ position: 'relative', height: '5rem' }}>
				<Spinner size="small" variant="base" assistiveText={{ label: 'loading...' }} />
			</div>
		);
	} else {
		body = (
			<div>
				<MediaObject
					figure={
						<span
							className="slds-icon_container"
							title={currentDescription}>
							<img
								alt={currentDescription}
								className="slds-icon slds-icon-text-default"
								src={currentIconUri} />
						</span>
					}
					verticalCenter={true}
					body={currentDescription}
				/>
				<dl className="slds-list_inline">
					<dt className="slds-item_label slds-text-color_weak">Current Temperature</dt>
					<dd className="slds-item_detail" title="High Temperature">
						{toTemperatureWithUnits(getTemperatureFromKelvin(temp))}
					</dd>
					<dt className="slds-item_label slds-text-color_weak">High</dt>
					<dd className="slds-item_detail" title="High Temperature">
						{toTemperatureWithUnits(getTemperatureFromKelvin(maxTemp))}
					</dd>
					<dt className="slds-item_label slds-text-color_weak">Low</dt>
					<dd className="slds-item_detail" title="Low Temperature">
						{toTemperatureWithUnits(getTemperatureFromKelvin(minTemp))}
					</dd>
					<dt className="slds-item_label slds-text-color_weak">Humidity</dt>
					<dd className="slds-item_detail" title="High Temperature">
						{`${humidity}%`}
					</dd>
				</dl>
			</div>
		);
	}

	return (
		<Card id={cityName} key={cityName} heading={cityName}>
			<div className="slds-card__body slds-card__body_inner">
				{body}
			</div>
		</Card>
	);
}

WeatherCard.propTypes = {
	loading: PropTypes.bool.isRequired,
	cityName: PropTypes.string,
	currentDescription: PropTypes.string,
	currentIconUri: PropTypes.string,
	tempUnits: PropTypes.oneOf(['f', 'c', 'k' ]), // let's hope scientists don't come up with a unit that starts with 'u'
	temp: PropTypes.number,
	minTemp: PropTypes.number,
	maxTemp: PropTypes.number,
	humidity: PropTypes.number,
};

export default WeatherCard;