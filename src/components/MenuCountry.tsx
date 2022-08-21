import React from 'react'
import CurrencyFlag from 'react-currency-flags'
import type { CountryServiceList } from './../services/country.service'
import {
  Autocomplete,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'

type IProps = {
  clickHandler: (e: any, value: CountryServiceList | null) => void,
  countries: CountryServiceList[],
  label: string,
  value: string,
}

export default class MenuCountry extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      countries: []
    }
  }

  render() {
    const selectedValue = this.props.countries.find(item => item.code === this.props.value)
    return(
      <FormControl fullWidth sx={{ m: 1 }}>
        <Autocomplete
          value={selectedValue || null}
          disablePortal
          onChange={(e, newValue) => { this.props.clickHandler(e, newValue) }}
          options={this.props.countries}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label={this.props.label}
              variant='outlined'
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <ListItemIcon>
                    <CurrencyFlag currency={selectedValue ? selectedValue.code : ''} svg />
                  </ListItemIcon>
                )
              }}
              placeholder={'Search for currency'}
              fullWidth
            />
          )}
          renderOption={(props, option, { selected }) => (
            <MenuItem {...props} key={`currency-${option.code}`}>
              <ListItemIcon>
                <CurrencyFlag currency={option.code} svg />
              </ListItemIcon>
              
              <ListItemText>{option.label}</ListItemText>
              <Typography variant='body2' color='text.secondary'>{option.code}</Typography>
            </MenuItem>
          )}
        />
      </FormControl>
    )
  }
}
