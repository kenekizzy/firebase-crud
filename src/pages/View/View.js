import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import FireDb from "../../firebaseUtils"
import './View.css'

const View = () => {
  const [data, setData] = useState({})
  const {id} = useParams()

   useEffect(() => {
     FireDb.child(`contacts/${id}`).get().then((snapshot) => {
       if(snapshot.exists()){
         setData({...snapshot.val()})
       }else{
         setData({})
       }
     })
   }, [id])

  console.log(data)
  return (
    <div style={{marginTop: "150px"}}>
      <div className="card">
        <div className="card-header">
          <h2>User Contact Detail</h2>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span><br /><br />
          <strong>Name: </strong>
          <span>{data.name}</span><br /><br />
          <strong>Email: </strong>
          <span>{data.email}</span><br /><br />
          <strong>Contact: </strong>
          <span>{data.phoneNumber}</span><br /><br />
        </div>
      </div>
    </div>
  )
}

export default View