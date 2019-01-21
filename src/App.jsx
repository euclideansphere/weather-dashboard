import React, { Component } from 'react';
import {
} from '@salesforce/design-system-react';

import WeatherCard from './WeatherCard';
import WeatherCardGrid from './WeatherCardGrid';
import Header from './Header';
import './App.css';

import { getWeather } from './weather';

const cities = [
	'Milwaukee',
	'Chicago',
	'Dallas',
	'Minneapolis'
];

class App extends Component {
	state = { temperatureUnits: 'f', temperatureUnitLabel: '\u00b0F' }

	onTempUnitChange = () => {
		if (this.state.temperatureUnits === 'f') {
			this.setState({
				temperatureUnits: 'c',
				temperatureUnitLabel: '\u00b0C',
			});
		} else if (this.state.temperatureUnits === 'c') {
			this.setState({
				temperatureUnits: 'f',
				temperatureUnitLabel: '\u00b0F',
			});
		}
	}

	mapWeatherToState = (response) => {
		const weather = response.weather[0];
		const icon = `http://openweathermap.org/img/w/${weather.icon}.png`
		const temperature = response.main.temp;
		const minTemperature = response.main.temp_min;
		const maxTemperature = response.main.temp_max;
		const humidity = response.main.humidity;

		const stateValue = {
			current: weather.main,
			currentDescription: weather.description,
			currentIconUri: icon,
			temperature: temperature,
			minTemperature: minTemperature,
			maxTemperature: maxTemperature,
			humidity: humidity
		};

		return stateValue;
	}

	async componentDidMount() {
		cities.forEach(async (city) => {

			const weather = await getWeather(city);

			console.log(weather);

			this.setState({
				// computed property names allow us to add more cities later without
				// object nesting in state
				["weather" + city]: this.mapWeatherToState(weather)
			});
		});
	}

	render() {

		const state = this.state;

		const cards = cities.map((cityName) => {
			const stateKey = "weather" + cityName;

			if (!(stateKey in state)) {
				return (
					<WeatherCard
						key={cityName}
						loading={true} />
				);
			} else {
				const weather = state[stateKey]; 
				return (
					<WeatherCard
						key={cityName}
						loading={false}
						cityName={cityName}
						currentDescription={weather.currentDescription}
						currentIconUri={weather.currentIconUri}
						tempUnits={this.state.temperatureUnits}
						temp={weather.temperature}
						minTemp={weather.minTemperature}
						maxTemp={weather.maxTemperature}
						humidity={weather.humidity}
					/>
				);
			}
		});

		return (
			<>
				<Header
					temperatureUnitLabel={state.temperatureUnitLabel}
					onTemperatureUnitButtonClick={this.onTempUnitChange} />
				<WeatherCardGrid>
					{cards}
				</WeatherCardGrid>
			</>
		);
	}
}

export default App;
