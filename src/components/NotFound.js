import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NotFound = () => {
    let location = useLocation();
    console.log(location)
    return (
        <div style={{textAlign: "center", marginTop: "180px"}}>
            Invalid search. Search again or <Link to="/home">Return to Homepage</Link>
        </div>
    )
}

export default NotFound
