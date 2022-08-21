import { cleanup, render, fireEvent } from '@testing-library/react'
import CurrencyInput from './../components/CurrencyInput'

afterEach(cleanup)

const invalidAmount = '1.0.0.0.'
const validAmount = '100.00'
const invalidNumberRegex = /is not a valid number/i

describe('CurrencyInput', () => {
  it('from valid to invalid amount', async () => {
    let mockClick = jest.fn()
    const { queryByText, getByRole } = render(
      <CurrencyInput
        clickHandler={mockClick}
        disabled={false}
        value={validAmount}
      />
    )

    expect(mockClick).not.toBeCalled()

    // Use queryByText as getByText throws an error
    expect(queryByText(invalidNumberRegex)).toBeNull()

    fireEvent.change(getByRole('textbox', { name: 'Amount' }), {
      target: {
        value: invalidAmount,
      }
    })
  
    expect(queryByText(invalidNumberRegex)).toBeInTheDocument()
  })

  it('from invalid to valid amount', () => {
    let mockClick = jest.fn()
    const { queryByText, getByRole } = render(
      <CurrencyInput
        clickHandler={mockClick}
        disabled={false}
        value={invalidAmount}
      />
    )

    expect(mockClick).not.toBeCalled()

    expect(queryByText(invalidNumberRegex)).toBeInTheDocument()

    fireEvent.change(getByRole('textbox', { name: 'Amount' }), {
      target: {
        value: validAmount,
      }
    })

    expect(queryByText(invalidNumberRegex)).toBeNull()
  })
})