
# Weather Dashboard

This project was developed with ReactJS and `@salesforce/lightning-design-system`. It was bootstraped with [Create React App](https://github.com/facebook/create-react-app) to avoid tooling with webpack. 

While I would have loved to spend a significant amount of time properly injecting asset dependencies from the lightning design system into the build pipeline (webpack), I chose to copy them directly out of the package into a public folder. This application is susceptible to code rot when the lightning design system is updated, therefore it should not be used as an example for using the lightning design system. It was inteded for prototype and demonstration purpose only - that I am capable of writing clean enough code and am comfortable learning a new technology.

Future Todo: add the weather forecast as an accordion expandable from each card.

## To Run This Application:

You need a key from open weather api to run it. Once you've obtained a free trial api key from https://openweathermap.org/, you can add yours to the project like this:

```bash
echo "export const openWeatherApiKey = '<your api key here';" >> /path/to/project/src/secrets.js
```

or create a file in the src directory called `secrets.js` and add the export for `openWeatherApiKey` with your key.

Once you've done that, and you've run `yarn install`, you should be able to start the application with a `yarn start`. The application will be bundled and then served via ExpressJS.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

https://facebook.github.io/create-react-app/docs/deployment
