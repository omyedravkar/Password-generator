import { use, useCallback, useEffect, useRef, useState } from 'react'

function App() {
 
const [length , setLength] = useState(8)
const [num , setNum] = useState(false)
const [char , setChar] = useState(false)
const [password , setPassword] = useState("")
 
const passref = useRef(null)
//usecallback is used here 
//useCallback(fn,dependencies)
const Passwordgenerator = useCallback(()=>{
let str =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
let pass = ""

if(num) str += "0123456789" 
if(char) str += "!@#$%^&*(){}:~"

for (let i = 0; i < length; i++) {
    let char = Math.floor(Math.random()*str.length+1)
  pass += str.charAt(char); 
}
setPassword(pass)
} , [length , num , char , setPassword])


useEffect(() => {
  Passwordgenerator()
}, [num, char , Passwordgenerator , length])

const copypasswordtoclipboard = useCallback(()=>{
  passref.current?.select()
window.navigator.clipboard.writeText(password)

}, [password])

  return (
   <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800
   '>
    <h1 className='text-4xl text-center'>PasswordGenerator</h1>
    <div  className='flex shadow rounded-lg overflow-hidden mb-4 bg-white'
    >
      <input type="text"
        value = {password}
        className='otuline-none w-full py-1 px-3 text-black'
        placeholder  = "Password"
        readOnly
        ref={passref}
        />
        <button className='bg-blue-700 outline-none px-3 py-0.5 shrink-0 text-white rounded-lg transition-all duration-200 hover:bg-blue-600 hover:scale-105 active:scale-95 active:bg-blue-700'  onClick={copypasswordtoclipboard}>Copy</button>
        </div>
       <div className='flex text-sm gap-x-2'>
         <div className='flex items-center gap-x-1'>
           <input type="range"
           min = {8}
           max={100}
           value={length}
           className='cursor-pointer'
           onChange={(e)=>{setLength(e.target.value)}} />
           <label> Lenght : {length}</label>

         </div>
         <div className='flex items-center gap-x-1' >
             <input type="checkbox" 
                defaultChecked = {num}
                id="numberInput" 
                 onChange={() => {setNum((prev) => !prev);                  
                  }}
                />

                <label htmlFor="numberInput">Number</label>         
         </div>
         <div className='flex items-center gap-x-1' >
             <input type="checkbox" 
                defaultChecked = {char}
                id="charInput" 
                 onChange={() => {setChar((prev) => !prev);                  
                  }} 
                />

                <label htmlFor="charInput">Character</label>         
         </div>

       </div>

    </div>
   </>
  )
}

export default App
