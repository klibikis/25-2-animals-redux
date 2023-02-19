import { useState, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from './store/hooks'
import './App.scss'
import { addAnimal, deleteAnimal, saveAnimalsInLocalStorage, sortAnimals } from './store/counterSlice'

function App() {

  const dispatch = useAppDispatch()
  const [animalBreed, setAnimalBreed] = useState("")
  
  const animal = useAppSelector((store) => {
    return store.animal.animals
  })
  const handleAddAnimal = () => {
    dispatch(addAnimal(animalBreed))
    dispatch(saveAnimalsInLocalStorage());
    setAnimalBreed('')
  }
  useEffect(() => {
    dispatch(sortAnimals())
  }, [animal]);
  

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
            placeholder = "Animal breed" 
            className='input'
            value = {animalBreed}
            onChange={(e) => {
              setAnimalBreed(e.target.value)
            }}
            >
          </input>
          <button className='buttonAdd'>
            Add animal
          </button>
        </form>
      </div>
      <div className='animalWrapper'>
      {animal.map((animal) => {
        return (
          <div 
            key = {Math.random()}
            className = "singleAnimal"
            >
            <h1>{animal.breed}</h1>
            <button
              className='buttonAnimalDelete'
              onClick={() => {
                dispatch(deleteAnimal(animal.breed))
                dispatch(saveAnimalsInLocalStorage())
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
