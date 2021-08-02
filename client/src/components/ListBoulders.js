import React from 'react'
import Boulder from "./Boulder"

const ListBoulders = ({ allBoulders }) => {
    return (
        <div>
            {console.log("hello", allBoulders)}
            {allBoulders.map((boulder) => (
                <Boulder
                    key={boulder._id}
                    id={boulder._id}
                    boulder={boulder}
                />
            ))}

        </div>
    )
}

export default ListBoulders
