import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import UserInterface from '../interface/UserInterface'

const defaultUser: UserInterface = { username: '', password: '' }

export default function Login() {
    const SIGNIN = gql`
    mutation Login($password: String!, $username: String!) {
      login(password: $password, username: $username)
    }`

    const [user, setUser]: [UserInterface, Function] = useState(defaultUser)
    const [login, { data, loading, error }] = useMutation(SIGNIN);


    const checkIfLoginIsCorrect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        login({ variables: { username: user.username, password: user.password}})
        console.log(data);
        setUser(defaultUser)
    }

    return (
        <>
            <input type="text" id="name" name="name" value={user.username} onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
            <input type="password" id="password" name="password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
            <button onClick={(e) => { checkIfLoginIsCorrect(e) }}>Login</button>
        </>
    )
}