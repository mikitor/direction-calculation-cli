const rp = require('request-promise-native');
const args = require('yargs').argv;
const dotenv = require('dotenv');
dotenv.config();

const TRAVEL_MODES = ['driving', 'walking', 'bicycling', 'transit'];

const prettyPrintJSON = json => console.log(JSON.stringify(json, null, 4));
const calculationFunction = (total, current) => {
  if (current && current.distance && current.duration) {
    return {
      totalDistance: total.totalDistance + current.distance.value,
      totalDuration: total.totalDuration + current.duration.value,
      count: total.count + 1,
      averageDistance: (total.totalDistance / total.count) | 0,
      averageDuration: (total.totalDuration / total.count) | 0
    };
  } else {
    return {
      totalDistance: total.distance,
      totalDuration: total.duration,
      count: total.count,
      averageDistance: total.averageDistance | 0,
      averageDuration: total.averageDuration | 0
    };
  }
};
const initialValues = { totalDistance: 0, totalDuration: 0, count: 0, averageDistance: 0, averageDuration: 0 };

if (!process.env.API_KEY) {
  console.log('Please add an API_KEY to your .env file.');
}

if (!args.origins) {
  return console.log('Please specify origin location(s).');
}
if (!args.destinations) {
  return console.log('Please specify destination location(s).');
}
if (!args.mode) {
  return console.log('Please specify a travel mode.');
}
if (!TRAVEL_MODES.includes(args.mode)) {
  return console.log('Please choose a valid travel mode.');
}

const options = {
  uri: `https://maps.googleapis.com/maps/api/distancematrix/json?mode=${args.mode}&key=${process.env.API_KEY}&origins=${args.origins}&destinations=${args.destinations}`,
  json: true
};

rp.get(options)
  .then(data =>
    data.rows.map((row, index) => {
      return {
        origin: data.origin_addresses[index],
        destination: data.destination_addresses[index],
        calculations: row.elements.reduce(calculationFunction, initialValues),
        details: row.elements
      };
    })
  )
  .then(prettyPrintJSON);
