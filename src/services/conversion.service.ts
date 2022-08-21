import moment from 'moment'
import ExchangeRateApi from '../clients/exchangerate-api'

export interface ResponseRates {
  base: string,
  date: string,
  time_last_updated: number,
  rates: Record<string, number>
}

export default class Conversion {
  static rates: Record<string, ResponseRates> = {}

  static async fetchRates(from: string): Promise<ResponseRates> {
    if(!Conversion.rates.hasOwnProperty(from) 
      || moment().subtract(1, 'minute').isAfter(Conversion.rates[from].time_last_updated)) {
        Conversion.rates[from] = await (await ExchangeRateApi.get<ResponseRates>(`/${from}`)).data
    }
    return Conversion.rates[from]
  }

  async convert(convert: number, from: string, to: string): Promise<number> {
    const rates = await Conversion.fetchRates(from)

    if(rates.rates.hasOwnProperty(to)) {
      return ((convert || 0) * rates.rates[to])
    }

    throw new Error(`Unable to find conversion lookup for currency code ${to}.`)
  }
}
