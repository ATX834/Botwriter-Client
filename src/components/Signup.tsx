import React, { useState } from 'react'
import { useMutation, gql, MutationTuple, ApolloError, OperationVariables } from '@apollo/client'
import UserInterface from '../interface/UserInterface';

const defaultUser: UserInterface = {
    username: '',
    password: 'password'
}


const CREATE_USER = gql`
mutation CreateUser($data: UserInput!) {
  signup(data: $data) {
    id
    username
  }
}`;


export default function Signup() {
    const [user, setUser]: [UserInterface, Function] = useState(defaultUser)

    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

    if (error) return (<>`Submission error! ${error.message}`</>);

    const newUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        createUser({ variables: { data: user } });
        console.log(user);
        setUser(defaultUser);
    }

    return (
        <>
            <input type="text" id="name" name="name" value={user.username} onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
            <input type="password" id="password" name="password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
            <button onClick={(e) => { newUser(e) }}>Create a user</button>
            {() => { if (loading) return (<p>Submitting...</p>) }}
            {() => { if (error) return (<p>Submission error! {error}</p>) }}
        </>
    )
}