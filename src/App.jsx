import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+"
    for(let i=0; i<=length; i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
    }
    setPassword(pass)
    

  },[length,numberAllowed,charAllowed])

  // useRef hook
  const passwordRef=useRef(null)


  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='flex items-center justify-center '>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 pb-4 text-orange-500 bg-gray-700 text-center'>
          <h1 className='text-white text-center my-3'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            ref={passwordRef}

            type="text" />
            <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600  focus:bg-green-500 '>copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
               type="range" 
               min={6}
               max={20}
               value={length}
               id='passwordRange'
               onChange={(e)=>setLength(e.target.value)}
               className='cursor-pointer'
              />
              <label  htmlFor='passwordRange'>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
               type="checkbox"
               id='numberInput'
               checked={numberAllowed}
               onChange={()=>setNumberAllowed((prev)=>!prev)}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
              id="characterInput" 
              checked={charAllowed}
              onChange={()=>setCharAllowed((prev)=>!prev)}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
