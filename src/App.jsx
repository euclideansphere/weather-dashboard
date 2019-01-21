import React, { Component } from 'react';
import {
} from '@salesforce/design-system-react';

import WeatherCard from './WeatherCard';
import Header from './Header';
import './App.css';

// import { getWeather } from './weather';

const cities = [
	'Milwaukee',
	'Chicago',
	'Dallas',
	'Minneapolis'
];

class App extends Component {
	state = { temperatureUnits: 'f' }

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

		// cities.forEach(async (city) => {

		// 	const weather = await getWeather(city);

		// 	this.setState({
		// 		// computed property names allow us to add more cities later without
		// 		// object nesting in state
		// 		["weather" + city]: weather
		// 	});
		// });

		// test data so I don't burn out my key
		this.setState({
			"weatherChicago": this.mapWeatherToState({"coord":{"lon":-87.62,"lat":41.88},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"base":"stations","main":{"temp":263.77,"pressure":1026,"humidity":58,"temp_min":262.05,"temp_max":265.65},"visibility":16093,"wind":{"speed":6.7,"deg":350,"gust":10.8},"clouds":{"all":40},"dt":1548017700,"sys":{"type":1,"id":4861,"message":0.0037,"country":"US","sunrise":1547989950,"sunset":1548024682},"id":4887398,"name":"Chicago","cod":200}),
			"weatherMilwaukee": this.mapWeatherToState({"coord":{"lon":-87.92,"lat":43.03},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"base":"stations","main":{"temp":261.32,"pressure":1028,"humidity":45,"temp_min":260.15,"temp_max":262.55},"visibility":16093,"wind":{"speed":6.7,"deg":10,"gust":9.3},"clouds":{"all":20},"dt":1548017520,"sys":{"type":1,"id":4908,"message":0.0044,"country":"US","sunrise":1547990210,"sunset":1548024567},"id":5263045,"name":"Milwaukee","cod":200}),
			"weatherMinneapolis": this.mapWeatherToState({"coord":{"lon":-93.27,"lat":44.98},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":259.75,"pressure":1031,"humidity":47,"temp_min":258.65,"temp_max":261.15},"visibility":16093,"wind":{"speed":1.96,"deg":59.0038},"clouds":{"all":1},"dt":1548017760,"sys":{"type":1,"id":4900,"message":0.0064,"country":"US","sunrise":1547991830,"sunset":1548025517},"id":5037649,"name":"Minneapolis","cod":200}),
			"weatherDallas": this.mapWeatherToState({"coord":{"lon":-96.8,"lat":32.78},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02d"}],"base":"stations","main":{"temp":280,"pressure":1026,"humidity":39,"temp_min":278.75,"temp_max":281.45},"visibility":16093,"wind":{"speed":2.1,"deg":140},"clouds":{"all":5},"dt":1548017520,"sys":{"type":1,"id":4249,"message":0.0041,"country":"US","sunrise":1547990883,"sunset":1548028151},"id":4684888,"name":"Dallas","cod":200})
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
				<Header />
				{cards}
			</>
		);
	}
}

export default App;
