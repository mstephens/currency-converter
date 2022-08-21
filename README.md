# Co-Op Currency App
Simple application to convert currencies using realtime exchange rates. 


## Build

  npm run build

## Start and watch
Realtime development can be acheived with:

  npm run start

## Testing

  npm run test

## Improvements
With further time enhancements would include:

### Features
- Display currency symbol of `from` currency in numeric input field
- The OpenExchangeRates API has a `convert` endpoint which can be used in their premium services which would allow conversion without needing to manually convert/lookup
- Parameterise URLs and configuration for deployment (e.g. an OpenExchangeRates dev/QA endpoint)
- More advanced validation

### UI
- Further enchancements and nice to haves
- Look into the DOM rendering slowness with the MUI Autocomplete component used

### Testing
- Tests for services, e.g. `CountryService`
- Additional component unit tests
- End to end tests

### Deployment
- Build pipeline to AWS

## Notes

React develpoment is fairly new to me, where I'm curently working on a project at home to boost knowledge in this area. 

I write with Vue.js and TypeScript on a daily basis at work in addition to at home, where examples of projects can be provided on request. e.g. the source code for `www.cakerider.uk` or `paddler.canoeslalom.co.uk`.