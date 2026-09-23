import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Card from './components/Card'

const App = () => {

  const [userData, setuserData] = useState([])

  const [Index, setIndex] = useState(1)

  const getData = async ()=>{
    const response = await axios.get(`https://picsum.photos/v2/list?page=${Index}&limit=18`)

    setuserData(response.data);
  }

  useEffect(function(){
    getData()
  },[Index])

  let printUserData = <h3 className='text-gray-400 text-xs absolute top-1/2 left-1/2 -translate-x-0.5 -translate-y-0.5'>Loading...</h3>

  if(userData.length>0){
    printUserData = userData.map(function(elem,idx){
      return <div key={idx}>
        <Card elem={elem}/>
      </div>
    })
  }

  return (
    <div className='bg-black overflow-auto h-screen p-4 text-white'>

      <div className='flex flex-wrap gap-4'>
        {printUserData}
      </div>
      <div className='flex justify-center items-center p-4 gap-6'>
          <button 
            style = {{opacity : Index==1?0.5:1}}
            className='bg-amber-400 text-black text-sm cursor-pointer active:scale-95 rounded px-4 py-1 font-semibold'
            onClick={()=>{
              if(Index>1){
                setIndex(Index-1)
                setuserData([])
              }
            }}
            >
              Prev
          </button>

          <h1 className='font-semibold '>{Index}</h1>

          <button 
            className='bg-amber-400 text-black text-sm cursor-pointer active:scale-95 rounded px-4 py-1 font-semibold'
            onClick={()=>{
              setuserData([])
              setIndex(Index+1)
            }}
            >
              Next
          </button>
        </div>
    </div>
  )
}

export default App