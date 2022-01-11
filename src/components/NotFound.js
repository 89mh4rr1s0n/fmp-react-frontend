import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            Invalid search. Search again or <Link to="/home">Return to Homepage</Link>
        </div>
    )
}

export default NotFound
