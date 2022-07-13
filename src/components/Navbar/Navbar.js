import React, { useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css" 

const Navbar = () => {
    const [activeTab, setActiveTab ] = useState("Home")
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search?name=${search}`)
        setSearch("")
    }
  return (
    <div className="navbar">
       <p className="logo">Contact App</p>
       <form onSubmit={handleSubmit} style={{display: "inline"}}>
        <input type="text" value={search} className="input-field" onChange={(e) => setSearch(e.target.value)} placeholder="Search User....."/>
       </form>
       <div className="navbar-right">
            <Link to="/">
                <p className={`${activeTab === "Home"} ? "active" : ""`} onClick={() => setActiveTab("Home")}>
                    Home
                </p>
            </Link>
            <Link to="/addUser">
                <p className={`${activeTab === "addContact"} ? "active" : ""`} onClick={() => setActiveTab("addContact")}>
                    Add Contact
                </p>
            </Link>
            <Link to="/about">
                <p className={`${activeTab === "about"} ? "active" : ""`} onClick={() => setActiveTab("about")}>
                    About
                </p>
            </Link>
        </div> 
    </div>
  )
}

export default Navbar