import './css/App.css'
import { useState } from 'react'
import { Register } from './components/Register'
import { Chat } from './components/Chat'
import { Login } from './components/Login'
function App() {
  const [form, setForm] = useState(1);
  function setVal(v){
    setForm(v);
  }
  function checkForm(){
    if(form==2){
      return (<Chat setVal={setVal} />);
    }else if(form==1){
      return (<Login setVal={setVal} />)
    }else{
      return (<Register setVal={setVal} />)
    }
  }
  
  return (
    <>
      {checkForm()}
    </>
  )
}

export default App
