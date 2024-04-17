
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const Update = () => {

    const id = useParams();

    console.log(id.id);
    console.log('http://localhost:5000/api/user/getuserbyid/'+(id.id).trim());
   //Using react params to get id from url
   const getSingleUser = async () => {
     
    

    try{
    const response = await axios.get('http://localhost:5000/api/user/getuserbyid/'+(id.id).trim());
    
    console.log(response.data)
    setUser({...user , ...response.data});
    }
    catch(error){
        console.error(error);
    }

   }

   useEffect(() =>{
    getSingleUser();

   },[])



    
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: ''
      });
    
      const [responseError, setResponseError] = useState('');
      const [successMessage,setSuccessMessage] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
    
      const handleEdit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.put('http://localhost:5000/api/user/updateuser/'+(id.id).trim(), user);
    
          console.log('Server Response:', response.data,response.status);
          if(response.status === 200){
            setSuccessMessage('User edited successfully');
        //   setUser({
        //     name: '',
        //     email: '',
        //     age: ''
        //   });
    
          setResponseError('');
        }
        } catch (error) {
          if(error.response.status === 400){
            setSuccessMessage('');
            setResponseError(user.email + ' is in already use')
          console.log(error.response.status);
          }
    
          else if(error.response.status === 500){
            setSuccessMessage('');
            setResponseError("An internal error occurred")
          }
    
        }
      };
    
    
    return(




    <div className="container mt-5">
      <h2 className="mb-4">Edit Form</h2>

      {responseError && <div className="alert alert-danger" role="alert">
       {responseError} </div>}

       {successMessage && <div className="alert alert-success" role="alert">
       {successMessage} </div>}
     


      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Edit Name</label>
          <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Edit Email</label>
          <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Edit Age</label>
          <input type="number" className="form-control" id="age" name="age" value={user.age} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Edit</button>

        </div>
      </form>

    </div>

)}
export default Update;