import React from 'react'
import './App.css'

const Change = ({yourChange}) => {
    return (
        <div>
            {yourChange.map((element) => (
                <div className='Change' key={element.id}>
                    <span>{element.qty} x</span>
                    <br />
                    <span>${element.value}</span>
                </div>
            ))}

        </div>
    )
}

export default Change
