import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from "react-router-dom";

const EditBoulder = ({ allBoulders, onEdit }) => {
    const [name, setName] = useState("")
    const [grade, setGrade] = useState(0)
    const [location, setLocation] = useState("")

    const history = useHistory();
    const { id } = useParams();


    useEffect(() => {
        const boulderToEdit = allBoulders.find(boulder => boulder._id === id);
        setName(boulderToEdit.name);
        setGrade(boulderToEdit.grade);
        setLocation(boulderToEdit.location);
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit({ _id: id, name, grade, location });
        setName("")
        setGrade(0)
        setLocation("")
        history.push("/");
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">boulder name</label>
                    <input type="text"
                        placeholder="boulder name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="">boulder grade</label>
                    <input type="number"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="">boulder location</label>
                    <input type="text"
                        placeholder="boulder location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div>
                    <button>edit boulder</button>
                </div>
            </form>
            <Link to="/">back to index page</Link>

        </div>
    )
}

export default EditBoulder
