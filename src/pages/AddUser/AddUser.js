import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import fireDb from "../../firebaseUtils.js"
import { toast } from "react-toastify"
import "./AddUser.css"

const AddUser = () => {
  const [data, setData] = useState({})
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: ""
  })
  const navigate = useNavigate()
  const {id} = useParams()

   useEffect(() => {
     fireDb.child("contacts").on("value", (snapshot) => {
       if(snapshot.val() !== null){
         setData({...snapshot.val()})
       }else{
         setData({})
       }
     })
     return () => {
       setData({})
     }
   }, [id])

   useEffect(() => {
     if(id){
       setUser({...data[id]})
     }
   }, [id, data])
   
  const handleChange = (e) => {
    const { name, value} = e.target
    setUser(user => {
      return {
        ...user,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {name, email, phoneNumber} = user
    if(!name || !email || !phoneNumber ){
      toast.error("Please Fill all Fields")
    }else{
      if(id){
        fireDb.child(`contacts/${id}`).set(user, (err) => {
          if(err){
            toast.error(err)
          }else{
            toast.success("Update Done successfully")
          }
        })
      }else{
        fireDb.child("contacts").push(user, (err) => {
          if(err){
            toast.error(err)
          }else{
            toast.success("Contact added successfully")
          }
        })
      }

      setTimeout(() => navigate("/"), 500)
    }
  }
  return (
    <div className="form-style">
      <form className='forms' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type="text" id="name" value={user.name} onChange={handleChange} name="name"/> 
        <label htmlFor='email'>Email</label>
        <input type="email" id="email" value={user.email} onChange={handleChange} name="email"/>
        <label htmlFor='phoneNumber'>Phone Number</label>
        <input type="tel" id="phoneNumber" value={user.phoneNumber} onChange={handleChange} name="phoneNumber"/>
        <button type="submit">{id? "Update" :"Submit"}</button>
      </form>
    </div>
  )
}

export default AddUser