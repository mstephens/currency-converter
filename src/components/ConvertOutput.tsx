import React from 'react'
import {
  Button,
  ButtonGroup,
  FormControl,
  Typography,
} from '@mui/material'

type IProps = {
  clickHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  convertedValue: number,
  currencyValue: number,
  disabled: boolean,
  seconds: number,
  from: string,
  to: string,
  valid: boolean,
}

const ConvertOutput: React.FC<IProps> = ({
  clickHandler,
  convertedValue,
  currencyValue,
  disabled,
  seconds,
  from,
  to,
  valid,
}) =>
  <FormControl fullWidth sx={{ m: 1 }}>    
    {seconds > 0 && convertedValue > 0 ?
      <>
        <Typography variant='h4' color='primary'>
        {`${currencyValue.toFixed(2)} ${from}
        is the equivalent to ${convertedValue.toFixed(2)} ${to}`}
        </Typography>

        <Typography variant='h6' color='error' sx={{ mt: 1 }}>
          {`Conversion expires in ${seconds} seconds`}
        </Typography>
      </>
    : <>
      {convertedValue > 0 ?
        <Typography variant='h6' color='error'>
          Your conversion has expired, click to refresh
        </Typography>
      : null}
      </>
    }

    {valid ?
      <ButtonGroup variant="outlined" sx={{ mt: 2 }}>
        <Button
          onClick={clickHandler}
          disabled={disabled}>Convert {from} to {to}</Button>
      </ButtonGroup>
    : null}
  </FormControl>

export default ConvertOutput