import { render, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  const renderComponent = () => (render(<App />))

  test('Check the app renders', () => {
    const { getByText } = renderComponent()
    expect(getByText(/Currency Converter/i)).toBeInTheDocument()
  })

  test('Ensure visible components', async () => {
    const { queryByText, getByRole, queryByRole } = renderComponent()

    const amount = getByRole('textbox', {
      name: 'Amount'
    })
    expect(amount).toBeInTheDocument()
    expect(amount).toHaveValue('0')

    fireEvent.change(amount, {
      target: {
        value: 105,
      }
    })

    expect(getByRole('combobox', {
      name: 'Convert From'
    })).toBeInTheDocument()
    expect(getByRole('combobox', {
      name: 'Convert To'
    })).toBeInTheDocument()
    expect(queryByText('Convert')).toBeNull()

    waitFor(() => {
      fireEvent.change(getByRole('combobox', {
        name: 'Convert To'
      }), {
        target: {
          value: 'USD',
        }
      })
    })

    // @TODO to tackle this problem!
    expect(queryByRole('Convert')).toBeNull()
  })
})
