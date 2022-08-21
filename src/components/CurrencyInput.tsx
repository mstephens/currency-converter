import React from 'react'
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { SyncAlt } from '@mui/icons-material'
import { isNumeric } from '../utils/maths'

type IProps = {
  clickHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, valid: boolean) => void,
  disabled: boolean,
  value: string,
}

type IState = {
  fieldErrorMessage: string,
}

export default class CurrencyInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      fieldErrorMessage: '',
    }
  }

  componentDidMount() {
    this.validate(this.props.value.toString())
  }

  isValid(value: string): boolean {
    const valid = /^\d+(\.\d{0,2})?$/.test(value)
    return isNumeric(value) && parseInt(value) > 0 && valid
  }

  onFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    this.validate(e.target.value)
  }

  validate(value: string): void {
    let fieldErrorMessage
    if(parseInt(value) === 0) {
      fieldErrorMessage = 'Enter a number greater than zero'
    } else {
      fieldErrorMessage = !this.isValid(value) ? `${value} is not a valid number` : ''
    }

    this.setState({ fieldErrorMessage })
  }

  render() {
    let errorComponent

    if(this.state.fieldErrorMessage.length > 0) {
      errorComponent = <FormHelperText error>{this.state.fieldErrorMessage}</FormHelperText>
    }
  
    return (
    <div>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor='currencyInput'>Amount</InputLabel>
        <OutlinedInput
          id='currencyInput'
          disabled={this.props.disabled}
          onChange={(e) => { this.onFieldChange(e); this.props.clickHandler(e, this.isValid(e.target.value)) }}
          onFocus = {(e) => e.target.value = ''}
          endAdornment={<InputAdornment position='end'><SyncAlt /></InputAdornment>}
          label='Amount'
          defaultValue={this.props.value || ''}
        />

        {errorComponent}
      </FormControl>
    </div>
  )}
}