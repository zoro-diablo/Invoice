import { useState } from 'react'
import Invoice from './components/Invoice'
import Form from './components/form'
import './index.css'

function App() {

   const [taxRate, setTaxRate] = useState(15)
   const [discountRate, setDiscountRate] = useState(0)

    const handleFormSubmit = (tax, discount) => {
      setTaxRate(tax)
      setDiscountRate(discount)
    }

  return (
    <div className='app-container'>
      <Invoice taxRate={taxRate} discountRate={discountRate} />
      <Form onFormSubmit={handleFormSubmit} />
    </div>
  )
}

export default App
