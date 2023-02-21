import { useState, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from './store/hooks'
import './App.scss'
import { useGetAnimalsQuery, useCreateAnimalMutation, useDeleteAnimalMutation } from './store/apiSlice'

function App() {

  const [animalBreed, setAnimalBreed] = useState("")
  const [animalName, setAnimalName] = useState("")
  const [animalImageLink, setAnimalImageLink] = useState("")

  const [postAnimal] = useCreateAnimalMutation()
  const [deleteAnimal] = useDeleteAnimalMutation()
  const { data: animalsData, error: animalsError, isLoading } = useGetAnimalsQuery('animals')

  const handleAddAnimal = () => {
    postAnimal({name: animalName, breed: animalBreed, image: animalImageLink})
  }

  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(!animalsData){
    return <h1>Error</h1>
  }
  
  return (
    <div className="appWrapper">
      <div className='wrapper'>
        <form 
          className='addForm'
          onSubmit={(e) => {
            e.preventDefault();
            handleAddAnimal()
            setAnimalName("")
            setAnimalBreed("")
            setAnimalImageLink("")
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
          <input 
            required
            type='text' 
            placeholder = "Image link" 
            className='input'
            value = {animalImageLink}
            onChange={(e) => {
              setAnimalImageLink(e.target.value)
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
              <img src = {animal.image} className = "animalImage"/>
              <h1>{animal.name}</h1>
              <h1 className='breed--text'>BREED: {animal.breed.toUpperCase()}</h1>
              <button
              className='buttonAnimalDelete'
              onClick={() => {
                deleteAnimal(animal._id)
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
