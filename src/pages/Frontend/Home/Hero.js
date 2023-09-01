import React, { useEffect, useState } from 'react'
import { Col, DatePicker, Form, Input, Modal, Row, message, ColorPicker, Select, Spin } from 'antd'
import { FaPlus } from 'react-icons/fa';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firestore';
import { DeleteFilled, EditFilled, } from '@ant-design/icons'
import dayjs from 'dayjs';
// import ColorPicker from './ColorPicker';
const initialValue = {
  title: "",
  date: "",
  description: "",
  list: ""
}

export default function Hero() {
  const [openModal, setOpenModal] = useState(false)
  const [state, setState] = useState(initialValue)
  const [allDocuments, setAllDocuments] = useState([])
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedColor, setSelectedColor] = useState({});
  const { Option } = Select;

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleDate = (_, date) => setState(s => ({ ...s, date }))
  // Add Todo Function  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { title, date, description, list } = state;
    const todo = {
      title,
      date,
      description,
      list,
      dateCreated: serverTimestamp(),
      id: Math.random().toString(36).slice(2),
      bgColor: selectedColor,
    };
    await creatDocument(todo);
  };

  const creatDocument = async (todo) => {
    try {
      await setDoc(doc(firestore, "todos", todo.id), todo);
      message.success("Add Todo Successfully.");
      setOpenModal(false);
      setState(initialValue)
    } catch (error) {
      message.error("Something Went Wrong While Adding Todo");
      console.error("Error", error);
    }
  };
  // Read Todo
  const getTodo = async () => {
    const querySnapshot = await getDocs(collection(firestore, "todos"));
    const array = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    }); setDocuments(array)
    setAllDocuments(array)
    // isLoading(false)
  }

  useEffect(() => {
    getTodo()
  })
  // Delete Todo
  const handleDelete = async (todo) => {
    try {
      await deleteDoc(doc(firestore, "todos", todo.id));
      let deleteDocuments = documents.filter(doc => doc.id !== todo.id)
      setDocuments(deleteDocuments)
      setAllDocuments(deleteDocuments)
      message.success("Todo Delete Successfully.")
    } catch (error) {
      message.error("Someting worng while delete Todo")
      console.log("error", error)
    }
  }
  return (
    < >

      <Row>
        {documents.map((todo, i) => {
          return (
            <Col className='m-2'>
              <div className='card p-3' key={i} style={{ width: 200, height: 200, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: `${todo.bgColor}`, border: "1 solid dark", borderRadius: 5, color: "white" }}>
                <div className="carFirtDiv">
                  <span style={{ fontSize: "large" }} >{todo.title}</span>
                  <span className='p-2' id='deleteIcon'>
                    <DeleteFilled onClick={() => handleDelete(todo)} />
                    {/* <EditFilled  onClick={()=> handleUpdate(todo)}/> */}
                  </span><br />
                  <span className='fw-bold'>{todo.list}</span>
                  <p>{todo.description}</p>

                </div>
                <div>

                  <p>{todo.date ? dayjs(todo.date).format("dddd, DD/MM/YYYY") : ""}</p>
                </div>
              </div>
            </Col>
          )
        })}
        <Col className='m-2'>
          <div className='card p-5 ' style={{ width: 200, cursor:'pointer', height: 210, border:'none', backgroundColor: "lightgray" }} >
            <span id='pluseCard' style={{ display: 'flex', justifyContent: "center", paddingTop: "30px" }} onClick={() => setOpenModal(true)}>
              <FaPlus size={50} opacity={0.7} />
            </span>
          </div>
        </Col>
      </Row >

      <Modal className='w-25' title="Add Todo" style={{ top: 20,}} open={openModal} onOk={handleSubmit} onCancel={() => setOpenModal(false)} >
        <Form layout="vertical" className='py-4'>
          <Row gutter={16}>
            <Col xs={24} lg={8} >
              <Form.Item label="Title">
                <Input className='w-100' value={state.title} placeholder='Input your title' name='title' onChange={handleChange} />
              </Form.Item>
            </Col>
 
            <Col xs={24} lg={8}>
              <Form.Item label="Date">
                <DatePicker className='w-100' name='date' onChange={handleDate} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} lg={8}>
              <Form.Item label="list">
                <Select value={state.list} onChange={list => setState(s => ({ ...s, list }))}>
                  {["Work", "Personal"].map((list, i) => {
                    return <Select.Option key={i} value={list}>{list}</Select.Option>
                  })}
                </Select>
              </Form.Item>
            </Col>
 
            <Col xs={24} lg={8} className='ms-5'>
              <Form.Item label="Color">
                <ColorPicker value={selectedColor} onChange={(e, color) => setSelectedColor(color)} />
              </Form.Item>
            </Col>
            </Row>

            <Row>
            <Col span={24}>
              <Form.Item label="Description" className='mb-0'>
                <Input.TextArea placeholder='Input your description' name='description' onChange={handleChange} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal >

    </>
  )
}