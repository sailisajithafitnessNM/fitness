import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Categories.css'
import backImage1 from '../assets/1.jpg';
import backImage2 from '../assets/2.jpg';
import backImage3 from '../assets/4.jpg';
import backImage4 from '../assets/3.jpg';
import backImage5 from '../assets/5.jpg';
import backImage6 from '../assets/6.jpg';
import cardioImage7 from '../assets/11 (1).png';
import cardioImage8 from '../assets/11 (2).png';
import cardioImage9 from '../assets/11 (3).png';
import cardioImage10 from '../assets/11 (4).png';
import cardioImage11 from '../assets/11 (5).png';
import dumbbellImage1 from '../assets/21.jpg';
import dumbbellImage2 from '../assets/22.jpg';
import dumbbellImage3 from '../assets/23.jpg';
import dumbbellImage4 from '../assets/24.jpg';




const BodyPartsCategory = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [exercises, setExercises] = useState([])
    const categoryData = {
        dumbbells: {
            image: [dumbbellImage1, dumbbellImage2, dumbbellImage3,dumbbellImage4],
             // Replace with actual image paths
            description: ['3set 15rep','3set 15rep','3set 15rep','3set 15rep','3set 15rep','3set 15rep']
        },
        cardio: {
            image: [cardioImage7, cardioImage8, cardioImage9,cardioImage10,cardioImage11],
            description: ['3set 15rep','3set 15rep','3set 15rep','3set 15rep','3set 15rep','3set 15rep']
        },
        back: {
            image: [backImage1, backImage2, backImage3,backImage4,backImage5,backImage6],
            descriptions: ['3set 15rep','3set 15rep','3set 15rep','3set 15rep','3set 15rep','3set 15rep']
            
    
        },
        chest: {
            image: 'pat',
            description: 'Exercises aimed at building chest muscles.'
        },
        
    };

    useEffect(()=>{
        if (id){
            fetchData(id)
        }
    },[])

    const fetchData = async (id) => {
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${id}`,
            params: {limit: '200'},
            headers: {
              'X-RapidAPI-Key': 'ae40549393msh0c35372c617b281p103ddcjsn0f4a9ee43ff0',
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            console.log(response.data);
            setExercises(response.data);
        } catch (error) {
            console.error(error);
        }

    }
    

  return (
        <div className='category-exercises-page' >
            <h1>category: <span>{id}</span></h1>
            {categoryData[id] && (
                <div className="category-info">
                    {id === 'back'&&(
                        <div className="image-grid">
                            {categoryData.back.image.map((image, index) => (
                                <div className="image-item" key={index}>
                                    <img src={image} alt={`Back exercise ${index + 1}`} />
                                    {categoryData.back.description && categoryData.back.description[index] ? (
                                        <p>{categoryData.back.description[index]}</p>
                                    ) : (
                                        <p>No description available</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {id === 'cardio' && (
            <div className="image-grid">
                {categoryData.cardio.image.map((image, index) => (
                    <div className="image-item" key={index}>
                        <img src={image} alt={`Cardio exercise ${index + 1}`} />
                        {categoryData.cardio.description[index] ? (
                            <p>{categoryData.cardio.description[index]}</p>
                        ) : (
                            <p>No description available</p>
                        )}
                    </div>
                ))}
            </div>
        )}
        {id === 'dumbbells' && (
            <div className="image-grid">
                {categoryData.dumbbells.image.map((image, index) => (
                    <div className="image-item" key={index}>
                        <img src={image} alt={`dumbbells exercise ${index + 1}`} />
                        {categoryData.dumbbells.description[index] ? (
                            <p>{categoryData.dumbbells.description[index]}</p>
                        ) : (
                            <p>No description available</p>
                        )}
                    </div>
                ))}
            </div>
        )}
                   
                    
        {id !== 'back' && id !== 'dumbbells' && id !== 'cardio' && id !== 'chest' && (
            <img src={categoryData[id].image} alt={id} />
        )}
                    
                </div>
            )}
             

    
            {exercises && exercises.length > 0 ?
            
                <div className="exercises">
                    {exercises.map((exercise, index) => {
                        return (
                            <div className="exercise" key={index} onClick={()=> navigate(`/exercise/${exercise.id}`)} >
                                <img src={exercise.gifUrl} alt={exercise.name} />
                                <h3>{exercise.name}</h3>
                                <ul>
                                    <li>{exercise.target}</li>
                                    {exercise.secondaryMuscles.map((muscle, index) => {
                                        return index < 2 && (
                                            <li key={muscle} >{muscle}</li>
                                        )
                                    })}
                                    
                                </ul>
                            </div>
                        )})
                    }
                    
                </div>
            :""}
        </div>
  )
}

export default BodyPartsCategory