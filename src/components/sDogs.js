import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { AppContext } from '../App';
import { useLocation } from 'react-router-dom'

function SDogs(props) {


  const appContext = React.useContext(AppContext);

  const {
    breed,
    breedIndex: bIndex,
  } = useLocation()?.state;

  const {
    dogs: allDogs,
    allClicked,
    prevImgs,
  } = appContext;

  const [dogName, setDogName] = useState(breed || '');
  const [imgs, setImgs] = useState(prevImgs[dogName] || []);
  const [isLoading, setLoading] = useState(false);
  const [dogs, setDogs] = useState(allDogs);
  const [breedIndex, setBreedIndex] = useState(bIndex);

  useEffect(() => {
    async function preFet() {
      await fetchDogs();
    }
    preFet();
  }, []);

  async function fetchDogs() {
    try {
      if (!prevImgs[dogName]) {
        setLoading(true)

        let response = await axios.get(
          `https://dog.ceo/api/breed/${dogName}/images`,
        );
        let dogimgs = response?.data?.message;
        if (dogimgs?.length) {
          let randomDogs = [];
          for (let index = 0; index < 4; index++) {
            let rDogimg = dogimgs[Math.floor(Math.random() * dogimgs.length)];

            randomDogs.push(rDogimg);
          }
          allClicked(dogName, randomDogs);
          setImgs(randomDogs);
        }
      }
      setLoading(false)
    } catch (error) {
        setLoading(false)
      console.log(error);
    }
  }

  async function updateDogs(breed) {
    try {
      if (!prevImgs[breed]) {
        setLoading(true)
        
        let response = await axios.get(
          `https://dog.ceo/api/breed/${breed}/images`,
        );
        let dogimgs = response?.data?.message;
        if (dogimgs?.length) {
          let randomDogs = [];
          for (let index = 0; index < 4; index++) {
            let rDogimg = dogimgs[Math.floor(Math.random() * dogimgs.length)];

            randomDogs.push(rDogimg);
          }
          allClicked(breed, randomDogs);
          setImgs(randomDogs);
        }
      } else {
          setImgs(prevImgs[breed])
      }

      setLoading(false)
    } catch (error) {
        setLoading(false)
    }
  }

  if (!appContext) {
    return null;
}

  return (
      <div className='center-content'> 
        <div className='title'> {dogName} </div>
        <div className='img-container'>
        {
            !isLoading && (
                <>
                    {
                        Array.from(Array(4).keys()).map((item) => (
                            <img
                                key={item}
                                alt='dog'
                                className='img-c'
                                src={imgs[item]}
                            />
                        ))
                    }
                </>
            )
        }
        </div>
        <div className='to-row'>
            <button className='btn' disabled={!(breedIndex > 1)} onClick={
                () => {
                    const newName = dogs[breedIndex - 1];
                    setDogName(newName);
                    setBreedIndex(breedIndex - 1);
                    updateDogs(newName);
                }
            }>
                Previous
            </button>
            <button className='btn' onClick={
                () => {
                    const newName = dogs[breedIndex + 1];
                    setDogName(newName);
                    setBreedIndex(breedIndex + 1);
                    updateDogs(newName);
                }
            }>
                Next
            </button>
        </div>
      </div>
  );
}

export default SDogs;
