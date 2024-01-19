import { useState } from 'react'
import PropTypes from 'prop-types'

const SubForm = ({ onFormSubmit }) => {
  const [taxRate, setTaxRate] = useState(0)
  const [discountRate, setDiscountRate] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    onFormSubmit(taxRate, discountRate)
  }
  return (
    <div className='app-container1'>
      <button className='review-button'>Review Invoice</button>
      <div className='input-container'>
        <form onSubmit={handleSubmit}>
          <div className='input-field'>
            <label htmlFor='inputField1'>Tax rate:</label>
            <div className='input-with-button'>
              <input
                type='number'
                id='inputField1'
                onChange={(e) => setTaxRate(e.target.value)}
              />
              <button className='percentage-button' type='submit'>
                %
              </button>
            </div>
          </div>
          <div className='input-field'>
            <label htmlFor='inputField2'>Discount rate:</label>
            <div className='input-with-button'>
              <input
                type='number'
                id='inputField2'
                onChange={(e) => setDiscountRate(e.target.value)}
              />
              <button className='percentage-button' type='submit'>
                %
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

SubForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

export default SubForm
