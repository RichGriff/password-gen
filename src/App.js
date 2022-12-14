import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import { numbers as numberValues, upperCaseLetters, lowerCaseLetters, specialCharacters} from './utils/characters'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

function App() {
  const [password, setPassword] = useState(null)
  const [passwordLength, setPasswordLength] = useState(12)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(50)

  const generatePassword = (e) => {
    let characterList = ''
    let strength = 0

    if (!uppercase && !lowercase && !numbers && !symbols)
      notify('You must select atleast one option.', true)

    if(uppercase) {
      characterList = characterList + upperCaseLetters
      strength = strength + 25
    }

    if(lowercase) { 
      characterList = characterList + lowerCaseLetters
      strength = strength + 25
    }
    
    if(numbers) {
      characterList = characterList + numberValues
      strength = strength + 25
    }
    
    if(symbols) {
        characterList = characterList + specialCharacters
        strength = strength + 25
    }

    setPasswordStrength(strength)
    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    if (password) {
      const tempTextField = document.createElement('textarea')
      tempTextField.innerText = password
      document.body.appendChild(tempTextField)
      tempTextField.select()
      document.execCommand('copy')
      tempTextField.remove()

      notify('???? Password Copied!')
    } else {
      notify('Generate a password first', true)
    }
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      })
    } else {
      toast.success(message, {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      })
    }
  }

  const contextClass = {
    success: "bg-green-600",
    error: "bg-red-500",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <div className="bg-gray-900 w-screen h-screen text-white p-4">
      <div className="flex flex-col justify-center items-center mx-auto p-2 md:p-10 w-full md:w-1/3 gap-2">
        <h1 className='text-md text-white font-bold mb-3 tracking-wide'>Password Generator</h1>

        {/* Result */}
        <div className='bg-gray-800 flex flex-row justify-between items-center w-full h-16 p-8 rounded-sm text-gray-500 drop-shadow-lg'>
          <h3 className={`font-bold ${password && 'text-white'}`}>
            {password ? (
              password
            ) : `O&?yv&z"%RXMA/O`}
          </h3>
          <button 
            onClick={copyToClipboard}
            className='hover:bg-gray-900 p-2 hover:shadow rounded-sm transition ease-in-out duration-300 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          </button>
        </div>

        {/* Options */}
        <div className='bg-gray-800 w-full p-8 rounded-sm drop-shadow-lg'>
          {/* Password Length */}
          <div className='py-2'>
            <div className='flex justify-between items-center'>
              <label htmlFor='password-length'>Password length</label>
              <span className='text-emerald-500 font-bold text-lg'>{passwordLength}</span>
            </div>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type='range'
              id='password-length'
              name='password-length'
              max='30'
              min='12'
              className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
            />
          </div>
          {/* Uppercase */}
          <div className='py-2'>
            <input
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className='mr-4 h-4 w-4 shadow rounded-sm checked:bg-emerald-500 focus:ring-emerald-500 hover:bg-emerald-500 text-emerald-500'
              type='checkbox'
              id='uppercase-letters'
              name='uppercase-letters'
            />
            <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
          </div>
          {/* Lowercase */}
          <div className='py-2'>
            <input
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className='mr-4 h-4 w-4 shadow rounded-sm checked:bg-emerald-500 focus:ring-emerald-500 hover:bg-emerald-500 text-emerald-500'
              type='checkbox'
              id='lowercase-letters'
              name='lowercase-letters'
            />
            <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
          </div>
          {/* Include Numbers */}
          <div className='py-2'>
            <input
              checked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
              className='mr-4 h-4 w-4 shadow rounded-sm checked:bg-emerald-500 focus:ring-emerald-500 hover:bg-emerald-500 text-emerald-500'
              type='checkbox'
              id='numbers'
              name='numbers'
            />
            <label htmlFor='numbers'>Include Numbers Letters</label>
          </div>
          {/* Include Symbols */}
          <div className='py-2 flex justify-start items-center'>
            <input
              checked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
              className='mr-4 h-4 w-4 shadow rounded-sm checked:bg-emerald-500 focus:ring-emerald-500 hover:bg-emerald-500 text-emerald-500'
              type='checkbox'
              id='symbols'
              name='symbols'
            />
            <label htmlFor='symbols'>Include Symbols Letters</label>
          </div>
          {/* Password Strength */}
          <div className='py-4'>
            <p>Password Strength</p>
            <div className='flex flex-row mt-4'>
              <div className={`${passwordStrength >= 25 && 'bg-orange-800'} bg-gray-700 h-1 flex-1 rounded-sm mr-1`}></div>
              <div className={`${passwordStrength >= 50 && 'bg-yellow-500'} bg-gray-700 h-1 flex-1 rounded-sm mr-1`}></div>
              <div className={`${passwordStrength >= 75 && 'bg-blue-500'} bg-gray-700 h-1 flex-1 rounded-sm mr-1`}></div>
              <div className={`${passwordStrength === 100 && 'bg-green-500'} bg-gray-700 h-1 flex-1 rounded-sm mr-1`}></div>
            </div>
            {/* <div className="w-full bg-gray-700 rounded-full mt-2">
              <div className="bg-emerald-500 text-xs font-medium text-gray-900 text-center p-0.5 leading-none rounded-full" style={{width: `${passwordStrength}%`}}> {passwordStrength}%</div>
            </div> */}
          </div>

          {/* Generate Btn */}
          <button 
            onClick={(e) => generatePassword(e)}
            className='transition ease-in-out duration-300 bg-emerald-500 text-gray-900 font-extrabold text-sm uppercase w-full flex flex-row justify-center items-center px-6 py-3 rounded-sm mt-4 border-2 border-emerald-500 hover:bg-transparent hover:text-emerald-500'>
            Generate
          </button>

        </div>

        <ToastContainer
            position='bottom-center'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="colored"
            toastClassName={({ type }) => contextClass[type || "default"] +
              " relative flex p-3 h-16 rounded-md justify-between overflow-hidden cursor-pointer m-3"
            }
            // bodyClassName={() => "text-sm font-white font-med block p-3"}
          />

      </div>
    </div>
  );
}

export default App;
