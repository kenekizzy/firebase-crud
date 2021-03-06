import React, { useState, useEffect} from 'react'
import fireDb from '../../firebaseUtils'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import './Home.css'

const Home = () => {
  const [data, setData] = useState({})
  const [sortData, setSortData] = useState({})
  const [sort, setSort] = useState(false)

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
  }, [])

  const onDelete = (id) => {
    if(window.confirm("User will be deleted")){
      fireDb.child(`contacts/${id}`).remove((err) =>{
        if(err){
          toast.error(err)
        }else{
          toast.success("User Successfully deleted")
        }
      })
    }
  }

  const handleSelect = (e) => {
    setSort(true)
    fireDb.child("contacts").orderByChild(`${e.target.value}`).on("value", (snapshot) => {
      let sortedData = []
      snapshot.forEach((snap) => {
        sortedData.push(snap.val())
      })
      setSortData(sortedData)
    })
  }

  console.log(sortData)

  const handleReset = () => {
    setSort(false)
  }
  return (
    <div style={{marginTop: "100px"}}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>No</th>
            <th style={{textAlign: "center"}}>Name</th>
            <th style={{textAlign: "center"}}>Email</th>
            <th style={{textAlign: "center"}}>Contact</th>
            {!sort && <th style={{textAlign: "center"}}>Action</th>}
          </tr>
        </thead>
        {!sort && (
          <tbody>
          {Object.keys(data).map((id, index) => {
            return(
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].phoneNumber}</td>
                <td>
                  <Link to={`/editUser/${id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => onDelete(id)}>Delete</button>
                  <Link to={`/view/${id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>

                </td>
              </tr>
            )
          })}
        </tbody>
        )}
        {sort && (
          <tbody>
            {sortData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>
      <label>Sort By:</label>
      <select className="dropdown" name="colValue" onChange={handleSelect}>
          <option>Please Select</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phoneNumber">phoneNumber</option>
      </select>
      <button className="btn btn-reset" onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Home