import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { editBoulder } from "../features/boulders/bouldersSlice";

const EditBoulder = () => {
    const [name, setName] = useState("")
    const [grade, setGrade] = useState(0)
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [isChecked, setIsChecked] = useState(new Array(7).fill(false));

    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const loc = useLocation();
    const boulderToEdit = loc.state.boulder;

    const availableTags = useSelector((state) => state.boulders.availableTags)

    useEffect(() => {
        setName(boulderToEdit.name);
        setGrade(boulderToEdit.grade);
        setLocation(boulderToEdit.location);
        setDescription(boulderToEdit.description);
        setTags(boulderToEdit.tags);
        const initialCheckbox = availableTags.map((tag) =>
            boulderToEdit.tags.includes(tag) ? true : false
        )
        setIsChecked(initialCheckbox)
    }, [])

    const clearStates = () => {
        setName("")
        setGrade(0)
        setLocation("")
        setDescription("")
        setTags([])
        setIsChecked(isChecked.fill(false))
    }

    const handleCheckboxChange = (pos, tag) => {
        const changedCheckbox =
            isChecked.map((check, index) => index === pos ? !check : check)
        setIsChecked(changedCheckbox);

        const updatedTags = changedCheckbox.reduce((newArr, currentValue, currentIndex) => {
            if (currentValue) {
                newArr.push(availableTags[currentIndex]);
            }
            return newArr;
        }, [])
        setTags(updatedTags);
        console.log(updatedTags);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editBoulder({ _id: id, name, grade, location, description, tags }))
        clearStates();
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
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                        describe the climb
                    </textarea>
                </div>

                <div>
                    <fieldset>
                        <legend>choose the styles of the boulder</legend>
                        {availableTags.map((tag, index) => (
                            <div key={index}>
                                <input type="checkbox" name="tags" id={tag} value={tag}
                                    checked={tags.includes(tag)}
                                    onChange={() => handleCheckboxChange(index, tag)} />
                                <label htmlFor={tag} name="tags">{tag}</label><br />
                            </div>
                        ))}
                    </fieldset>
                </div>
                <div>
                    <button>edit boulder</button>
                </div>
            </form>
            <Link to="/">back to index page</Link>

        </div >
    )
}

export default EditBoulder
