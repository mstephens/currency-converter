import OpenExchangeRates from '../clients/openexchangerates'

export interface CountryServiceList {
  code: string,
  label: string
}

class CountryService {
  static countries: CountryServiceList[] = []
 
  async getCountries(): Promise<CountryServiceList[]> {
    if(!CountryService.countries.length) {
      const resp = await OpenExchangeRates.get<Record<string, string>>('currencies.json')
      CountryService.countries = Object.keys(resp.data).map(key => ({
        code: key,
        label: resp.data[key],
      }))
    }

    return CountryService.countries
  }
}

export default new CountryService()