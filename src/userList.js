import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


function UserList() {
    const [userList, setUserList] = useState([])
    useEffect(async () => {
        fetchUsers()
    }, [])

    let fetchUsers = async () => {
        try {
            let userData = await axios.get("https://model-react.herokuapp.com/users")
            setUserList(userData.data)
        } catch (error) {
            console.log(error)
        }
    }

    let handleDelete = async (id) => {
        try {
            let result = window.confirm("are you sure Do you want to Delete! ") 
            if (result) {
                await axios.delete(`https://model-react.herokuapp.com/user/${id}`)
               
                fetchUsers()
            }
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <>
            <div className='row'>
                <div className='col-lg-6'>
                    <h3>UserList</h3>
                </div>
                <div className='col-lg-6 text-end'>
                    <Link to="/create">
                        <button className='btn btn-primary'>Create User</button>
                    </Link>
                </div>

            </div>
            <table class="table mt-5">
                <thead class="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>


                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((user) => {
                            return <tr>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/edit-user/${user._id}`}>
                                        <button className='btn-sm btn-primary'>Edit</button>
                                    </Link>
                                </td>
                                <td>

                                    <button onClick={() => handleDelete(user._id)} className='btn-sm btn-danger'>Delete</button>
                                </td>

                            </tr>
                        })
                    }


                </tbody>
            </table>
        </>
    )
}

export default UserList
