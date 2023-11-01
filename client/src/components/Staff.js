import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Loader  from './Loader';
import Pagination from './Pagination';

const StaffList = () => {

    const initialState = [];
    const [loading, setLoading] = useState(true);
    const [petData, setPetData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [objectsPerPage, setObjectsPerPage] = useState(3);
    
    const [petName, setPetName] = useState('')
    const [ID, setID] = useState('')
    const [openForm, setOpenForm] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    

    const fetchPetData = async () => {

        if(loading === true)
        {
            /* const q = query(collection(db, "Pets"), where("adoptionStatus", "==", "Available"));
            const querySnapshot  = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                setPetData(current => [...current, doc.data()]);
              }) */
            
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            
        }
          
    }

    const navigate = useNavigate();

    useEffect(() => {   
            
        fetchPetData();
        
    }, [])
    
    console.log(petData);

    if(loading === false)
    {
        console.log(petData[1].id);
    }

    if (loading === true ) return (
        <Loader />
    )
    
    const indexOfLastObject = currentPage * objectsPerPage;
    const indexOfFirstObject = indexOfLastObject - objectsPerPage;
    const currentData = petData.slice(indexOfFirstObject, indexOfLastObject);
    
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const results = [];
    
    for (const data of currentData)
    {
        results.push(
            <div className="pet-listing" key={data.id}>
                {/* <img className="pet-listing-image" src={data.imageURL} />
                <h4 className="pet-name">{data.name}</h4>
                <hr />
                <div className="pet-listing-info">
                    <p>Age : {data.age}</p>
                    <p>Breed : {data.breed}</p>
                </div>
                <button type="submit" className="adopt-button" onClick={() =>openAdoptionForm(data.name, data.id)}>Apply For Adoption</button> */}
            </div>,
        );
    }

    return (
        <div>             
            <div>
                <h3>Pets for Adoption</h3>
                <Pagination objectsPerPage={objectsPerPage} totalObjects={petData.length} paginate={paginate} loading={loading}/>
                <div className='pet-container'>{results}</div>
            </div>

        </div>
        
    )
}

export default StaffList

