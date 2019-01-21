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
		let formattedTemp = temperature;
		if (!isNaN(formattedTemp) && isFinite(formattedTemp) && !Number.isInteger(formattedTemp))
				formattedTemp = formattedTemp.toFixed(2);
		if (tempUnits === 'f') {
			return <>{`${formattedTemp} \u00b0F`}</>;
		} else if (tempUnits === 'c') {
			return <>{`${formattedTemp} \u00b0C`}</>;
		} else {
			return <>{`${formattedTemp} K;`}</>;
		}
	};

	const	getTemperatureFromKelvin = (temperature) => {
		if (tempUnits === 'f') {
			return temperature * 9 / 5 - 459.67;
		} else if (tempUnits === 'c') {
			return temperature - 273.15;
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
				<div className="slds-region_narrow">
					<dl className="slds-dl_horizontal">
						<dt className="slds-dl_horizontal__label slds-text-color_weak">Current Temperature</dt>
						<dd className="slds-dl_horizontal__detail" title="Current Temperature">
							{toTemperatureWithUnits(getTemperatureFromKelvin(temp))}
						</dd>
						<dt className="slds-dl_horizontal__label slds-text-color_weak">High</dt>
						<dd className="slds-dl_horizontal__detail" title="High Temperature">
							{toTemperatureWithUnits(getTemperatureFromKelvin(maxTemp))}
						</dd>
						<dt className="slds-dl_horizontal__label slds-text-color_weak">Low</dt>
						<dd className="slds-dl_horizontal__detail" title="Low Temperature">
							{toTemperatureWithUnits(getTemperatureFromKelvin(minTemp))}
						</dd>
						<dt className="slds-dl_horizontal__label slds-text-color_weak">Humidity</dt>
						<dd className="slds-dl_horizontal__detail" title="High Temperature">
							{`${humidity}%`}
						</dd>
					</dl>
				</div>
			</div>
		);
	}

	return (
		<Card
			id={cityName}
			className="slds-size_medium"
			key={cityName}
			heading={cityName}>
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