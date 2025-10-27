import React, {useState, useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom'
import fireDb from '../../firebaseUtils'

const Search = () => {
    const [data, setData] = useState({})

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    let query = useQuery()
    let search = query.get("name")

    useEffect(() => {
      const searchData = () => {
        fireDb.child("contacts").orderByChild("name").equalTo(`${search}`).on("value", (snapshot) => {
            if(snapshot.val()){
                const data = snapshot.val()
                setData(data)
            }
        })
    }

        searchData()
    }, [search])

    

  return (
    <div style={{marginTop: "100px"}}>
        {Object.keys(data).length === 0 ? (
            <h2>No user exists with the name: {search} </h2>
        ): (
            <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>No</th>
            <th style={{textAlign: "center"}}>Name</th>
            <th style={{textAlign: "center"}}>Email</th>
            <th style={{textAlign: "center"}}>Contact</th>
            <th style={{textAlign: "center"}}>No</th>
          </tr>
        </thead>
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
                  <button className="btn btn-delete">Delete</button>
                  <Link to={`/view/${id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>

                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
        )}
      
    </div>
  )
}

export default Search