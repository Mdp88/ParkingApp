import React from 'react'
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import './App.css'

const Payments = ({ currencies, billedTotal, currentPayment, handleChange, handlePayment, payment }) => {




    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (currentPayment < billedTotal) {
            setDisabled(true)
        }
        else { setDisabled(false) }

    }, [currentPayment, billedTotal])


    return (
        <div>
            <h3>Paid with</h3>
            <div>
                {payment.map((cash) => (
                    <div className='Payment' key={cash.id}>
                        <span>${cash.value}</span>
                        <br />
                        <input type="number" min="0" className='PaymentInput' value={Math.abs(Math.floor(cash.qty))} onChange={(e) => handleChange(e, cash.id)} />
                    </div>
                ))}
            </div>
            <br /><br />
            <div className="PaymentAmount">${currentPayment}</div><Button variant="outlined" color="primary" size="large" disabled={disabled} onClick={handlePayment}>Pay</Button>
        </div>
    )
}

export default Payments
