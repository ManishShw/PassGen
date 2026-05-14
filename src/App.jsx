import React, { use } from 'react'
import { useState,useEffect,useRef } from 'react'

function App() {
  const [login, setLogin] = useState(false)
  const [length, setlength] = useState(4)
  const [character, setcharacter] = useState(false)
  const [number, setnumber] = useState(false)
  const [password, setPassword] = useState('')
  const header = useRef()

  setInterval(() => {
    header.current.style.color=`#${Math.floor(Math.random()*16777215).toString(16)}`
    document.body.style.backgroundColor=`#${Math.floor(Math.random()*16777215).toString(16)}`
  }, 1000);

  useEffect(()=>{
    setPassword('')
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(character){
      str+='+!@#$%^&*()_'
    }
    if(number){
      str+='0123456789'
    }
    for(let i=0;i<length;i++){
      let randomIndex = Math.floor(Math.random()*str.length+1)
      setPassword((prev)=>prev+str[randomIndex])
    }
  },[length, character, number,setPassword])

  return (
    <>
    {login ? (
      <button className='flex justify-end ml-auto bg-red-500 hover:bg-red-700 border-red-500 border-2 text-white p-2 m-2 rounded-lg cursor-pointer ' onClick={() => setLogin(!login)}>Logout</button>
    ) : (
      <button className='flex justify-end ml-auto bg-blue-500 hover:bg-blue-700 border-blue-500 border-2 text-white p-2 m-2 rounded-lg cursor-pointer ' onClick={() => setLogin(!login)}>Login</button>
    )}
    <div className='text-center bg-black text-white mt-50 mx-auto w-[50%] h-1/2 border-2 border-gray-500 p-5 rounded-lg '>
      <h1 ref={header} className='text-center my-4 text-xl md:text-2xl '>Password Generator</h1>
      <div className='flex flex-col justify-center items-center'>
        <input type="text" placeholder='Password' readOnly className='border-2 w-1/2 h-auto' value={password}/>
        <button className={`bg-green-500 hover:bg-green-700 border-green-500 border-2 text-white p-2 m-2 rounded-lg ${login ? "cursor-pointer" : "cursor-not-allowed"}`} onClick={(e)=>navigator.clipboard.writeText(password) } disabled={!login}>
          Copy
        </button>
      </div>
      <div className='flex flex-col justify-centre items-center mt-5'>
        <input className='w-half' type="Range" max={100} min={4} onChange={(e)=>{setlength(e.target.value)}}/>
        <label>length({length})</label>
        <input className='cursor-pointer' type="checkbox" onChange={()=>{setcharacter((prev)=>!prev)}}/>
        <label>Character</label>
        <input className='cursor-pointer' type="checkbox" onChange={()=>{setnumber((prev)=>!prev)}}/>
        <label>Numbers</label>
      </div>
    </div>  
    </>
  )
}

export default App
