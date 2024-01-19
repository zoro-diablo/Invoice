import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'

const Invoice = ({ taxRate, discountRate }) => {
  const [logo, setLogo] = useState(null)
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [clientCity, setClientCity] = useState('')
  const [clientCountry, setClientCountry] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [date, setDate] = useState('')
  const [dueDate, setdueDate] = useState('')
  const [invoiceTitle, setInvoiceTitle] = useState('')
  const [data, setData] = useState([])
  const [addFormData, setAddFormData] = useState({
    desc: '',
    qty: '',
    rate: '',
  })
  const [subtotal, setSubtotal] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [rate, setRate] = useState(0)
  const [salesTax, setSalesTax] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const total = data.reduce((sum, item) => sum + item.qty * item.rate, 0)
    setSubtotal(total)
  }, [data])

  useEffect(() => {
    const salesTaxValue = subtotal / taxRate
    setSalesTax(salesTaxValue)
    setTotal(subtotal + salesTaxValue)
  }, [subtotal, taxRate])

  useEffect(() => {
    setTotal(subtotal + salesTax - discountRate)
  }, [subtotal, salesTax, discountRate])

  console.log(quantity, rate)

  const handleAddFormChange = (event) => {
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    if (fieldName === 'qty') {
      setQuantity(parseFloat(fieldValue) || 0)
    } else if (fieldName === 'rate') {
      setRate(parseFloat(fieldValue) || 0)
    }

    setAddFormData(newFormData)
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault()

    const newFormData = {
      id: nanoid(),
      desc: addFormData.desc,
      qty: addFormData.qty,
      rate: addFormData.rate,
      amount: (
        parseFloat(addFormData.qty) * parseFloat(addFormData.rate)
      ).toFixed(2),
    }

    const newDataArr = [...data, newFormData]
    document.getElementById('desc').value = ''
    document.getElementById('qty').value = ''
    document.getElementById('rate').value = ''
    setData(newDataArr)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className='main app-root'>
      <img
        src='/print.svg'
        alt='printer'
        width={40}
        className='print no-print'
        onClick={handlePrint}
      />
      <div className='container print-container'>
        <div className='header'>
          <div className='header-info'>
            <input
              style={{ display: 'none' }}
              id='logo-upload'
              type='file'
              accept='image/*'
              onChange={(e) => {
                setLogo(URL.createObjectURL(e.target.files[0]))
              }}
            />
            {!logo && (
              <label htmlFor='logo-upload' className='custom-file-upload'>
                Upload Logo
              </label>
            )}
            {logo && <img src={logo} alt='Logo' width={80} />}

            <input
              type='text'
              className='company-name'
              placeholder='Your Company'
              value={company}
              onChange={(e) => {
                setCompany(e.target.value)
              }}
            />
            <input
              type='text'
              placeholder='Your Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <input
              type='text'
              placeholder="Company's Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
              }}
            />
            <input
              type='text'
              placeholder='City, State Zip'
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
              }}
            />
            <div className='select-wrapper'>
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value)
                }}
              >
                <option value=''>Select a state</option>
                <option value='Andhra Pradesh'>Andhra Pradesh</option>
                <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                <option value='Assam'>Assam</option>
              </select>
            </div>
          </div>
          <div>
            <input
              type='text'
              className='heading'
              placeholder='INVOICE'
              value={invoiceTitle}
              onChange={(e) => {
                setInvoiceTitle(e.target.value)
              }}
            />
          </div>
        </div>
        <div className='header-two'>
          <div>
            <h4>Bill to :</h4>
            <div className='header-info'>
              <input
                type='text'
                placeholder="Your Client's Name"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value)
                }}
              />
              <input
                type='text'
                placeholder="Client's Address"
                value={clientAddress}
                onChange={(e) => {
                  setClientAddress(e.target.value)
                }}
              />
              <input
                type='text'
                placeholder='City, State Zip'
                value={clientCity}
                onChange={(e) => {
                  setClientCity(e.target.value)
                }}
              />
              <div className='select-wrapper'>
                <select
                  value={clientCountry}
                  onChange={(e) => {
                    setClientCountry(e.target.value)
                  }}
                >
                  <option value=''>Select a Country</option>
                  <option value='United States'>United States</option>
                  <option value='India'>India</option>
                  <option value='Russia'>Russia</option>
                </select>
              </div>
            </div>
          </div>
          <div className='header-info-two'>
            <div className='sub-header'>
              <div className='sub-heading'>Invoice#</div>
              <input
                type='text'
                className='sub-content'
                placeholder='INV-12'
                value={invoiceNumber}
                onChange={(e) => {
                  setInvoiceNumber(e.target.value)
                }}
              />
            </div>
            <div className='sub-header'>
              <div className='sub-heading'>Invoice Date</div>
              <div className='sub-content-date'>
                <input
                  type='date'
                  className='date-picker'
                  placeholder='2024-01-17'
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className='sub-header'>
              <div className='sub-heading'>Due Date</div>
              <div className='sub-content-date'>
                <input
                  type='date'
                  className='date-picker'
                  placeholder='2024-01-17'
                  value={dueDate}
                  onChange={(e) => {
                    setdueDate(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='container-two'>
          <table className='table-container'>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.desc}</td>
                  <td>{item.qty}</td>
                  <td>{item.rate}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type='text'
                    name='desc'
                    onChange={handleAddFormChange}
                    id='desc'
                  />
                </td>
                <td>
                  <input
                    type='text'
                    name='qty'
                    onChange={handleAddFormChange}
                    id='qty'
                  />
                </td>
                <td>
                  <input
                    type='text'
                    name='rate'
                    onChange={handleAddFormChange}
                    id='rate'
                  />
                </td>
                <td>
                  <div className='amount'></div>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <div className='btn' onClick={handleAddFormSubmit}>
              <h5 className='plus'>+</h5>
              <h5 className='plus-text'>Add Line Item</h5>
            </div>
          </div>
        </div>
        <div className='container-three'>
          <div className='box'>
            <div className='col-one'>
              <div>SubTotal</div>
              <div className='value'>{subtotal.toFixed(2)}</div>
            </div>
            <div className='col-one'>
              <div>Sale Tax ( {taxRate} % )</div>
              <div className='value'>{salesTax.toFixed(2)}</div>
            </div>
            <div className='col-one'>
              <div>Discount</div>
              <div className='value'>{discountRate}</div>
            </div>
            <div className='col-one three'>
              <div>Total</div>
              <div className='value'> $ {total.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Invoice.propTypes = {
  taxRate: PropTypes.number.isRequired,
  discountRate: PropTypes.number.isRequired,
}

export default Invoice
