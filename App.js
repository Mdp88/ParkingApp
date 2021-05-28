import './App.css';
import TextField from '@material-ui/core/TextField';
import {useState, useEffect} from 'react';
import Init from './Init.js'
import Payments from './Payments'
import Change from './Change';


function App() {

  const [today,setToday] = useState(new Date());

  const [entryMinutes, setEntryMinutes] = useState(0);
  const [entryHours, setEntryHours] = useState (0);
  const [billedHours, setBilledHours] = useState (0);
  const [visibility, setVisibility] = useState('fit-content')
  const [yourChange, setYourChange] = useState([{ id: 0, value: 0, qty: 0 }])

  const updateToday=()=>{
   setToday(new Date())
  }
  setInterval(updateToday, 1000);



  const handleEntryTime =(value)=>{

    const time = value.split(':');
    const h = time[0]
    const m = time[1]
    if(h<today.toLocaleTimeString([],{hour: '2-digit'})){
    setEntryHours(h)
    setEntryMinutes(m)
    }
    else if(h===today.toLocaleTimeString([],{hour: '2-digit'}) & m<today.toLocaleTimeString([],{minute: '2-digit'})){
      setEntryHours(h)
      setEntryMinutes(m)
      }
    else {alert('Entry time must be before current time')} 


  }

useEffect(()=>{
  if(today.toLocaleTimeString([],{minute: '2-digit'}) - entryMinutes <= 0){
    setBilledHours(today.toLocaleTimeString([],{hour: '2-digit'}) - entryHours)
  }
  else{
    setBilledHours(today.toLocaleTimeString([],{hour: '2-digit'}) - entryHours +1)
  }

},[entryHours, entryMinutes,today])

  const HandleCashVisibility=()=>{
    if(visibility === 'fit-content'){
      setVisibility('0px')
    }
    if(visibility === '0px'){
      setVisibility('fit-content')
    }

  }


  //mudanza codigo
  


const [currencies, setCurrencies] = useState([])
const [price, setPrice] = useState([])
const [payment, setPayment] = useState([{ id: 1, value: 0, qty: 0 }])
const [currentPayment, setCurrentPayment] = useState(0)


useEffect(()=>{
    const localData = localStorage.getItem('currencies')
    const ar = localData ? JSON.parse(localData) : [{ id: 1, value: 0, qty: 0 }]
    ar.forEach(element => {
    ar[element.id-1].qty = 0
    setPayment(ar)
    })
 },[])

useEffect(() => {
  const localData = localStorage.getItem('currencies')
  return localData ? setCurrencies(JSON.parse(localData)) : setCurrencies([{ id: 1, value: 0, qty: 0 }])},[])

  useEffect(() => {
  const localData = localStorage.getItem('price')
  return localData ? setPrice(localData) : setPrice(1)
  },[])


  useEffect(()=>{
    localStorage.setItem('currencies', JSON.stringify(currencies))
  },[currencies])

useEffect(()=>{
    localStorage.setItem('price', price)

},[price])

const handleAdd = () => {
    if (currencies.length < 6) {
        const id = currencies.length + 1
        setCurrencies([...currencies, { id: id, value: 0, qty: 0 }])
        setPayment([...payment, { id: id, value: 0, qty: 0 }])
    }
}

const handleRemove = () => {
    if (currencies.length > 1) {
        const arr = [...currencies]
        arr.pop()
        setCurrencies(arr)
        const arr2 = [...payment]
        arr2.pop()
        setPayment(arr2)
    }
}

const handleValueChange = (id, value) => {
    const arr = [...currencies]
    arr[id - 1].value = Math.abs(Math.floor(value))
    setCurrencies(arr)
    const arr2 = [...payment]
    arr2[id - 1].value = Math.abs(Math.floor(value))
    setPayment(arr2)
    amount()
}

const handleQtyChange = (id, value) => {
    const arr = [...currencies]
    arr[id - 1].qty = Math.abs(Math.floor(value))
    setCurrencies(arr)
}


const handlePrice = (value) => {
    setPrice(Math.abs(Math.floor(value)))
}

const billedTotal = billedHours*price


//mudanza payment



const handleChange =(e, id)=>{
    const arr = [...payment]
    arr[id-1].qty = Math.abs(Math.floor(e.target.value))
    setPayment(arr)
    amount()
}

const amount=()=>{
    let x = 0
    payment.forEach(element =>{
    x += element.value * element.qty
    })
    setCurrentPayment(x)
 }

 //

 const handlePayment =()=>{
  const curtemp = JSON.stringify(currencies)
  const cur = JSON.parse(curtemp)
  const paytemp = JSON.stringify(payment)
  const pay = JSON.parse(paytemp)
  const change = Math.abs(billedTotal - currentPayment);


  if(change === 0){
    alert('Exact payment: No change')
    changeSetter(change, pay.sort((a, b) => (a.value < b.value) ? 1 : -1), cur)
  }
  else{
    changeSetter(change, pay.sort((a, b) => (a.value < b.value) ? 1 : -1), cur)
  }
  
 }

 const changeSetter=(change, pay, cur)=>{


const tempChange1 = JSON.stringify(pay)
const tempChange = JSON.parse(tempChange1)
  
tempChange.forEach((element)=>{
  element.qty = 0
})

  pay.forEach((element)=>{
    element.qty += cur[element.id-1].qty
  })

for (var i =0; i <pay.length;i++){

  if (change >= pay[i].value){
  if(Math.floor(change/pay[i].value) <= pay[i].qty ){
    const changes = Math.floor(change/pay[i].value)
   change -= changes * pay[i].value
   pay[i].qty -= changes
   tempChange[i].qty = changes

  }
  else{
   change-=pay[i].value * pay[i].qty
    tempChange[i].qty = pay[i].qty
    pay[i].qty = 0
  }
}
else{}
}

if(change === 0){
setYourChange(tempChange.sort((a, b) => (a.id < b.id) ? 1 : -1))
setCurrencies(pay.sort((a, b) => (a.id < b.id) ? -1 : 1), cur)
payment.forEach(element=>{
  element.qty = 0
})
setPayment(payment.sort((a, b) => (a.id < b.id) ? -1 : 1), cur)
amount()
}

else{
  alert('Not enough change for this operation!')
}

 }


  return (
  
    

    <div className="App">
      <h2 className='Cash' onClick={HandleCashVisibility}>Settings <span className="material-icons Cash">
expand_more
</span></h2>
<div>
      <Init 
      visibility={visibility}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
      handlePrice={handlePrice}
      handleQtyChange={handleQtyChange}
      handleValueChange={handleValueChange}
      currencies={currencies}
      price={price}
      ></Init>
            <hr />
</div>
<br />
<div className="Time">

      <div>
        <span>Current Time</span><br />
  <span className='Clock'>{today.toLocaleTimeString()}</span>
  <span className="material-icons">schedule</span>
      </div>
<br /> 
      <TextField
        id="date"
        label="Access time"
        type="time"
        defaultValue="00:00"
        onChange={(e)=>handleEntryTime(e.target.value)}
      />

    </div>
    <p className="Topay">Billable hours: {billedHours} <br />
    Total: ${billedTotal} </p>
    <Payments currencies={currencies} billedTotal={billedTotal} currentPayment={currentPayment} handleChange={handleChange} handlePayment={handlePayment} payment={payment}></Payments>

<h3>Change</h3>
    <Change yourChange={yourChange}></Change>
    </div>

    
  );
}

export default App;
