import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";


const UserCard = ({ user, onUpdate, onDelete }) => {


    // const handleUpdate = (user) => {

    //     console.log("Update clicked for user:", user);


    // };

    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                <Card.Text>
                    Age: {user.age}
                </Card.Text>
                {/* <button onClick={() => handleUpdate(user)}>Update</button> */}

              
                <Link to={`/update/${user._id}`}>
                    <Button>Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => onDelete(user._id)}>Delete</Button>
            </Card.Body>
        </Card>
    );
};

const Read = () => {
    // Assuming users is the array of users you provided

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/user/getallusers");
                setUsers(response.data); // Assuming your API response is an array of users
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []); // Empty dependency array ensures the effect runs only once on mount



    // const handleUpdate = (user) => {

    //     console.log("Update clicked for user:", user);


    // };

    const handleDelete = async (userId) => {
        // Implement your delete logic here
        try {
            await axios.delete(`http://localhost:5000/api/user/deleteuser/${userId}`);
            // Update the users state after successful deletion
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };




    return (
        <div>
            <h2>User List</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {users.map(user => (
                    <UserCard key={user._id} user={user}  onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default Read;
