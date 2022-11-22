// const baseEndpoint = 'https://api-gate2.movieglu.com/';
// const apiVersion = 'v200'
// const authorization = 'Basic UkhUTjpYQk5RaDBDNGhPamM=';
// const client = 'RHTN';
// const apikey = 'qnpVdOgChm42R0SlChf4OgIAJS6b5ZN2QHGKUFv4';
// const datetime = new Date(Date.now()).toISOString();
// const territory = 'US';

const moviegluCall = {
  baseEndpoint: 'https://api-gate2.movieglu.com/',
  apiVersion: 'v200',
  authorization: 'Basic UkhUTjpYQk5RaDBDNGhPamM=',
  client: 'RHTN',
  apikey: 'qnpVdOgChm42R0SlChf4OgIAJS6b5ZN2QHGKUFv4',
  datetime: new Date(Date.now()).toISOString(),
  territory: 'US'
}

const moviegluSandbox = {
  baseEndpoint: 'https://api-gate2.movieglu.com/',
  apiVersion: 'v200',
  authorization: 'Basic UkhUTl9YWDpPWDVQeDNKS0NVY1Q=',
  client: 'RHTN',
  apikey: 'Fvn2jSwMsT4NBd1JVtz9u9lnwhsnaZQs2wP8Nmq8',
  datetime: new Date(Date.now()).toISOString(),
  territory: 'XX'
}

async function fetchMovieGluData(query) {
  const response = await fetch(`${moviegluSandbox.baseEndpoint}?q=${query}`, {
    "headers": {
        "api-version": moviegluSandbox.apiVersion,
        "Authorization": moviegluSandbox.authorization,
        "client": moviegluSandbox.client,
        "x-api-key": moviegluSandbox.apikey,
        "device-datetime": moviegluSandbox.datetime,
        "territory": moviegluSandbox.territory,
    },
});
  const data = await response.json();
  return data;
}