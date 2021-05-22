import React, { useEffect } from 'react';

import axios from 'axios';
import {
    Link,
  } from "react-router-dom";
import { AppContext } from '../App';
 
  function Dogs(props) {

    const appContext = React.useContext(AppContext);
    const { dogs, setDogs } = appContext;

    useEffect(() => {
      async function prefetch() {
        try {
          let response = await axios.get('https://dog.ceo/api/breeds/list/all');
          const arrRes = Object.keys(response.data.message);
          setDogs(arrRes);
        } catch (error) {}
      }
      prefetch();
    }, []);

    return (
      <ul className='list'>
        <li className='sticky-list'> Dog List </li>
        {
          dogs.length ?
          (
            dogs.map((breed,index)=>{
               return(
                 <li key={index} className='list-items'>
                   <div className='content-root' >
                   <Link
                   className='text'
                    to={{
                      pathname: "/view",
                      state: {
                        breed: breed,
                        breedIndex: index
                      },
                    }}
                   >
                      <div> {index + 1} {breed} </div>
                   </Link>
                       
                  </div>
                 </li>
                 
               )
            })
          ) : null
        }
      </ul>
    )
  }
export default Dogs;