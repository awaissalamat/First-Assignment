import React, { useContext, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../Frontend/Home'
import Today from './Today';
import Upcoming from './Upcoming';
// import List from './List';
import Personal from './List/Personal';
import Work from './List/Work';
import { AuthContext } from '../../context/AuthContext'
// import { ToastContainer } from 'react-toastify';
import {ToastContainer } from '../../Global/Toastify'

export default function Index() {
  const navigate = useNavigate()
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [list, setList] = useState("personal")
  const [isAuth, setIsAuth] = useContext(AuthContext)
  console.log(isAuth)

  return (
    <>
      <div className="container" style={{ paddingTop: "100px", width: "150vh" }}>
        <div className="row">
          <div className="col">
            <div >
              <Layout style={{ borderRadius: 30, height: "80vh" }}>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{ border: "1px solid black" }}>
                  <div className="demo-logo-vertical" />
                  <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      color: "red",
                      fontSize: '16px',
                      width: 64,
                    }}
                  />
                  <Menu
                    onClick={({ key }) => {
                      if (key === "signout") {
                        // sign Out Function
                      } else {
                        navigate(key)
                      }
                    }}

                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ border: "1px solid light", paddingTop: "10px" }}
                    items={[
                      {
                        label: "Menu",
                        className: "fs-3"

                      },
                      {
                        label: "Task",
                        className: "fs-5"
                      },
                      {
                        // key: '1',
                        label: 'UpComing',
                        key: "/upcoming"

                      },
                      {
                        key: '/today',
                        label: 'Today',
                      },
                      {
                        key: '/',
                        label: 'Sticky Wall',
                      },
                      {
                        label: "List",
                        className: "fs-5"
                      },

                      {
                        key: '/personal',
                        label: 'Personal  ',
                      },
                      {
                        key: '/work',
                        label: 'Work  ',
                      },
                      {
                        key: 'signout',
                        label: 'Sign Out',
                        onClick: () => { setIsAuth(false) }
                      },


                    ]}

                  />
                </Sider>
                <Layout style={{ border: "1px solid white" }}>
                  <Header
                    style={{
                      padding: 0,
                      background: "white",
                      border: "1px solid white "
                    }}
                  >
                    <h1 className='px-3 text-center'>Sticky Wall</h1>
                  </Header>
                  <Content
                    style={{
                      margin: '24px 16px',
                      padding: 24,
                      minHeight: 280,
                      background: "#edede9",
                      overflow: "scroll"
                    }}
                  >
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/today' element={<Today />} />
                      <Route path='/upcoming' element={<Upcoming />} />
                      <Route path="/personal" element={<Personal />} />
                      <Route path="/work" element={<Work />} />
                    </Routes>
                  </Content>
                </Layout>
              </Layout>
              <ToastContainer/>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}


