import React from 'react'
import {
  Box,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CurrencyInput from './components/CurrencyInput'
import ConvertOutput from './components/ConvertOutput'
import MenuCountry from './components/MenuCountry'
import CountryService, { CountryServiceList } from './services/country.service'
import ConversionService from './services/conversion.service'

interface IProps {}

interface IState {
  currencyValue: number,
  convertedValue: number,
  countries: CountryServiceList[],
  from: string,
  seconds: number,
  to: string,
  validInput: boolean,
}

enum Position {
  FROM = 'from',
  TO = 'to'
}

type EventChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

const globalTheme = createTheme({})

const theme = createTheme({
  palette: {
    primary: {
      // Override the primary main theme with a lighter shade
      main: globalTheme.palette.primary.light
    },
  },
})

class App extends React.Component<IProps, IState> {
  conversionService: ConversionService
  timer = 0

  constructor(props: IProps) {
    super(props)

    this.conversionService = new ConversionService()

    this.state = {
      countries: [],
      currencyValue: 0,
      convertedValue: 0,
      from: 'GBP',
      seconds: 0,
      to: '',
      validInput: false,
    }

    // Bind in order to use 'this' in the right context
    this.convert = this.convert.bind(this)
    this.performCountdown = this.performCountdown.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  async componentDidMount() {
    // Prevent multi loading of countries inside MenuCountry component
    this.setState({
      countries: Object.assign(this.state.countries,
        await CountryService.getCountries())
    })
  }

  componentWillUnmount(): void {
    clearInterval(this.timer)
  }

  canPerformConversion(): boolean {
    return this.state.to.length > 2 && this.state.from.length > 2
  }

  async convert(): Promise<void> {
    this.startTimer()

    if(!this.canPerformConversion()) {
      return
    }

    let converted = 0

    try {
      converted = await this.conversionService.convert(this.state.currencyValue,
        this.state.from,
        this.state.to)
    }
    catch (e) {
      // @TODO Some kind of error output
    }
    finally {
      this.setState({
        convertedValue: converted
      })
    }
  }

  isConversionValid(): boolean {
    return this.canPerformConversion() 
      && this.state.currencyValue > 0
      && this.state.convertedValue > 0
  }

  handleInputChange (event: EventChange, validInput: boolean): void {
    const input = parseFloat(event.target.value)
    this.setState({
      currencyValue: input,
      validInput,
    }, () => {
      this.convert()
    })
  }

  handleSelectChange (event: EventChange, position: Position, value: CountryServiceList | null): void {
    const selectedValue = value ? value.code : ''
    this.setState({[position]: selectedValue} as unknown as Pick<IState, keyof IState>, () => {
      this.convert()
    })
  }

  performCountdown(): void {
    let seconds = this.state.seconds - 1
    this.setState({
      seconds: seconds,
    })

    // Clear once complete
    if (seconds === 0) {
      clearInterval(this.timer)
      this.timer = 0
    }
  }

  startTimer() {
    this.setState({seconds: 5}, () => {
      if (this.timer === 0 && this.state.seconds > 0) {
        // TypeScript thinks this is NodeJS.Timer, it's a number
        // @ts-ignore
        this.timer = setInterval(this.performCountdown, 1000)
      }
    })
  }

  render() {
    return (
      <div className='App'>
        <ThemeProvider theme={theme}>
          <Box sx={{m: 4}}>
            <h1>Currency Converter</h1>
            <CurrencyInput
              clickHandler={(e: EventChange, valid: boolean) => this.handleInputChange(e, valid)}
              disabled={!(this.state.to.length > 2)}
              value={this.state.currencyValue.toString()}
            />
            <MenuCountry
              clickHandler={(e: EventChange, newValue: CountryServiceList | null) =>
                this.handleSelectChange(e, Position.FROM, newValue)}
              label='Convert From'
              countries={this.state.countries}
              value={this.state.from}
            />
            <MenuCountry
              clickHandler={(e: EventChange, newValue: CountryServiceList | null) =>
                this.handleSelectChange(e, Position.TO, newValue)}
              label='Convert To'
              countries={this.state.countries}
              value={this.state.to}
            />

            {this.state.validInput ?
              <ConvertOutput
                disabled={this.timer !== 0 || !this.canPerformConversion()}
                clickHandler={this.convert}
                currencyValue={this.state.currencyValue}
                convertedValue={this.state.convertedValue}
                seconds={this.state.seconds}
                from={this.state.from}
                to={this.state.to}
                valid={this.isConversionValid()}
              />
            : null}
          </Box>
        </ThemeProvider>
      </div>
    )
  }
}

export default App
