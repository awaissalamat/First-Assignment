import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Frontend from 'pages/Frontend'
import Auth from 'pages/Auth'
import { AuthContext } from '.././context/AuthContext'
export default function Index() {
    const [isAuth, setIsAuth] = useContext(AuthContext)
    return (
        <>
            <Routes>
                <Route path='/*' element={isAuth?<Frontend/>:<Navigate to='/auth/login' />} />
                <Route path='/auth/*'  element={!isAuth?<Auth />:<Navigate to='/'/>} />
            </Routes>

        </>
    )
}
