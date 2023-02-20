import { useState, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from './store/hooks'
import './App.scss'
import { useGetAnimalsQuery } from './store/apiSlice'

function App() {

  const [animalBreed, setAnimalBreed] = useState("")
  const [animalName, setAnimalName] = useState("")

  const { data: animalsData, error, isLoading } = useGetAnimalsQuery('animals')

  const handleAddAnimal = () => {

  }

  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(!animalsData){
    return <h1>Error</h1>
  }
  console.log(animalsData)
  


  return (
    <div className="appWrapper">
      <div className='wrapper'>
        <form 
          className='addForm'
          onSubmit={(e) => {
            e.preventDefault();
            handleAddAnimal()
          }}
        >
          <input 
            required
            type='text' 
            placeholder = "Animal name" 
            className='input input--rounded-corners'
            value = {animalName}
            onChange={(e) => {
              setAnimalName(e.target.value)
            }}
            />
          <input 
            required
            type='text' 
            placeholder = "Animal breed" 
            className='input'
            value = {animalBreed}
            onChange={(e) => {
              setAnimalBreed(e.target.value)
            }}
            />
          <button className='buttonAdd'>
            Add animal
          </button>
        </form>
      </div>
      
      <div className='animalWrapper'>
        {animalsData.map((animal)=> {
          return (
            <div 
              key = {Math.random()}
              className = "singleAnimal"
              >
              <h1>{animal.name}</h1>
              <h1>{animal.breed}</h1>
              <button
              className='buttonAnimalDelete'
              onClick={() => {
                // dispatch(deleteAnimal(animal.breed))
                // dispatch(saveAnimalsInLocalStorage())
              }}
            >
              ✘
            </button>
            </div>
          )
        })}
      </div>
          


      
      
    </div>
    
  )
}

export default App
