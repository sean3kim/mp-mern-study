import React from 'react'

const Boulder = ({ boulder }) => {
    return (
        <div>
            <li>{boulder.name} in {boulder.location} - v{boulder.grade}</li>
        </div>
    )
}

export default Boulder
