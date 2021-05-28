import React from 'react'
import './App.css'

const Init = ({visibility, handleAdd, handleRemove, handleValueChange, handleQtyChange, handlePrice, currencies, price}) => {



    return (
        <div className='InitContainer'  style={{height : visibility}}>
            <p>Insert available and accepted denominations below </p>
            <div className='CurrencyContainer'>
                {currencies.map((coin) => (<div className='Currency' key={coin.id}>
                    <span className='Label'>Value</span>
                    <input className='Value' type='number' min='0' value={Math.abs(Math.floor(coin.value))} onChange={(e) => handleValueChange(coin.id, e.target.value)} />
                    <span className='Label'>Qty.</span>
                    <input className='Qty' type='number' min='0' value={Math.abs(Math.floor(coin.qty))} onChange={(e) => handleQtyChange(coin.id, e.target.value)} /></div>))}
            </div>
            <div className='Controls'>
            <span className="material-icons Add" onClick={handleAdd}>
                add_circle
            </span>
            <span className="material-icons Remove" onClick={handleRemove}>
                remove_circle
            </span>
            </div>
            <div>
                <span>Cost per hour ($)</span>
                <input id='PriceSetter' type="number" name="CostPH" min='0' value={Math.abs(Math.floor(price))} onChange={(e)=>handlePrice(e.target.value)} />
            </div>
        </div>
    )
}

export default Init
