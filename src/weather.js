
import { openWeatherApiKey } from '../src/secrets';

/**
 * get the weater for given city 
 */
export async function getWeather(city) {

	const cityQuery = encodeURIComponent(city);

	try {

		const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${openWeatherApiKey}`);

		if (response.ok) {

			return await response.json();

		} else if (response.status === 401) {

			throw new Error("Api key invalid");

		} else {

			throw response.statusText;
		}
	} catch(error) {

		throw new Error(`Weather fetch failed or could not resolve with error: ${error.message}`);
	}
}

