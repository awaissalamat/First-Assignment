import { ToastContainer,Toast } from '../../../Global/Toastify'
import { Button, Col, Form, Input, Row } from 'antd'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from 'context/AuthContext'

export default function Login() {
  const initial = {
    email:'',
    password:''
  }
  const [user, setUser] = useState(initial)
  const [isAuth, setIsAuth]= useContext(AuthContext)
  const handleLogin=()=>{
    if (user.email.length < 3) {
      Toast({
        type: "error",
        content: "Please Enter Email."
      }) 
      return
    }
    if (user.password.length < 8) {
      return Toast({
        type: "error",
        content: "Please Enter Password."
      }) 
    }
    console.log(user);
    Toast({
     type: "success",
     content: "Sign-in, Successfully"
    })
    setIsAuth(true)
    }

  const handleInput= e =>{
    const {name, value}  = e.target
    setUser({...user, [name]:value})
  }
    return (

    <div className="loginDiv">
      <div className="container">
        <div className="row  text-center">
          <div className="col py-5">
            <div className="card rounded-2  shadow w-25 p-3 mx-auto mt-5">
              <h2 className='text-center py-3 '>Login</h2>
              <Form layout='vertical'>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Email:">
                      <Input placeholder='Email' name='email' value={user.email} type='email' onChange={handleInput}/>
                    </Form.Item>
                  </Col>

                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Password">
                      <Input placeholder='Password' type='password' value={user.password} name='password'  onChange={handleInput}/>
                    </Form.Item>
                  </Col>

                </Row>
                <Row>
                  <Col span={12} offset={6}>
                    <Form.Item>
                      <Button type="primary" onClick={()=> handleLogin()} ghost style={{ width: "100%" }} >
                        Login
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
                <Link to='/auth/register'>I do't have an account <u>Sign Up</u></Link>
              </Form>
              <ToastContainer/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
