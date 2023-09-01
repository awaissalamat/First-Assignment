import { Button, Col, Form, Input, Row } from 'antd'
import React, { useContext, useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom'
import { auth } from '../../../config/firestore'
import { ToastContainer, Toast } from '../../../Global/Toastify'
import { AuthContext } from '../../../context/AuthContext'

export default function Resgister() {
    const [isAuth,setIsAuth]=useContext(AuthContext)
    const initial={
        fullName:'',
        email:'',
        password:''}
    const [addUser, setAddUser] = useState(initial)
    const handleInput = e =>{
      const {name, value}  = e.target
      setAddUser({...addUser, [name]:value})
    }
const handleRegister=()=>{
    if (addUser.email.length < 3) {
        Toast({
          type: "error",
          content: "Please Enter Email."
        }) 
        return
      }
      if (addUser.password.length < 8) {
        return Toast({
          type: "error",
          content: "Please Enter Password."
        }) 
      }
      console.log(addUser);
      Toast({
       type: "success",
       content: "Sign-in, Successfully"
      })
      setIsAuth(true)
      createUserWithEmailAndPassword(auth, addUser.email, addUser.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      }
  
    return (

        <div className="registerDiv">
            <div className="container">
                <div className="row">
                    <div className="col py-5">
                        <div className="card  w-25 p-3 m-auto">
                            <h2 className='text-center py-3 '>Register</h2>
                            <Form layout='vertical'>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label="Full Name">
                                            <Input placeholder='Full Name' name='fullName' value={addUser.fullName} type='text' onChange={handleInput}/>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label="Email:">
                                            <Input placeholder='Email' type='email' value={addUser.email} name='email' onChange={handleInput}/>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label="Password">
                                            <Input placeholder='Password' type='password' value={addUser.password} name='password' onChange={handleInput}/>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={12} offset={6}>
                                        <Form.Item>
                                            <Button type="primary" onClick={handleRegister()} ghost style={{ width: "100%" }} >
                                                Register
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                    <Link style={{textDecoration:"none" }}>I have an account <u>Login</u></Link>

                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
