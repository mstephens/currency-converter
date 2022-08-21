import ConversionService from './../../services/conversion.service'

const responseGbp = {
  base: '',
  date: '',
  time_last_updated: 123,
  rates: {
    EUR: 10.10,
    USD: 9.10,
  },
}

describe('ConversionService', () => {
  const conversionService = new ConversionService()

  test('Valid conversion to EUR', async () => {
    jest.spyOn(ConversionService, 'fetchRates').mockResolvedValue(responseGbp)

    expect(await conversionService.convert(1.00, 'GBP', 'EUR')).toEqual(10.1)
  })

  test('Valid conversion to USD', async () => {
    jest.spyOn(ConversionService, 'fetchRates').mockResolvedValue(responseGbp)

    expect(await conversionService.convert(1.00, 'GBP', 'USD')).toEqual(9.1)
  })

  test('Missing conversion to XXX', async () => {
    jest.spyOn(ConversionService, 'fetchRates').mockResolvedValue(responseGbp)

    await expect(async () => { 
      await conversionService.convert(1.00, 'GBP', 'XXX') 
    }).rejects.toThrowError('Unable to find conversion lookup for currency code XXX.')
  })

  test('Missing rate lookup for XXX', async () => {
    jest.spyOn(ConversionService, 'fetchRates').mockRejectedValue(new Error('Invalid country code.'))

    await expect(async () => { 
      await conversionService.convert(1.00, 'XXX', 'USD') 
    }).rejects.toThrowError('Invalid country code.')
  })
})
