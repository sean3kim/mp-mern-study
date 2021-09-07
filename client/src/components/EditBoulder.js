import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { editBoulder } from "../features/boulders/bouldersSlice";
import { makeStyles, Paper, Container, TextField, Checkbox, FormControl, FormControlLabel, FormLabel, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        minHeight: "calc(100vh - 64px)",
        width: "75%",
        padding: "100px"
    },
    paper: {
        width: "100%",
        padding: "20px"
    },
    formControl: {
        marginTop: "10px",
        marginBottom: "30px"
    },
    checkbox: {
        marginBottom: "0px",
        marginTop: "0px",
        paddingBottom: "0px",
        paddingTop: "0px",
        height: "25px"
    },
    button: {
        backgroundColor: theme.palette.warning.main,
        marginBottom: "10px"
    },
    indexLink: {
        color: theme.palette.info.main,
        textDecoration: "none",
        fontFamily: theme.typography.fontFamily
    }
}))

const EditBoulder = () => {
    const [name, setName] = useState("")
    const [grade, setGrade] = useState(0)
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [isChecked, setIsChecked] = useState(new Array(7).fill(false));

    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const loc = useLocation();
    const boulderToEdit = loc.state.boulder;
    const classes = useStyles();

    const availableTags = useSelector((state) => state.boulders.availableTags)

    useEffect(() => {
        setName(boulderToEdit.name);
        setGrade(boulderToEdit.grade);
        setLocation(boulderToEdit.location);
        setDescription(boulderToEdit.description);
        setTags(boulderToEdit.tags);
        setComments(boulderToEdit.comments);
        setUser(boulderToEdit.user);
        console.log("edit page user: ", boulderToEdit.user)
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
        dispatch(editBoulder({ _id: id, name, grade, location, description, tags, comments, user }))
        clearStates();
        history.push("/");
    }

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography align="center" variant="h4">edit a boulder</Typography>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="boulder name"
                            margin="normal"
                            id="boulderName"
                            name="boulderName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            type="number"
                            variant="outlined"
                            label="boulder grade"
                            margin="normal"
                            id="boulderGrade"
                            name="boulderGrade"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        />
                    </div>

                    <div>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="boulder location"
                            margin="normal"
                            id="boulderLocation"
                            name="boulderLocation"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div>
                        <TextField
                            label="describe the climb"
                            variant="outlined"
                            fullWidth
                            multiline
                            margin="normal"
                            minRows="10"
                            id="boulderDescription"
                            name="boulderDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <FormControl
                            className={classes.formControl}
                            component="fieldset"
                            fullWidth
                        >
                            <FormLabel component="legend">choose the styles of the boulder</FormLabel>
                            {availableTags.map((tag, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        className={classes.checkbox}
                                        control={
                                            <Checkbox
                                                name="tags"
                                                size="small"
                                                checked={tags.includes(tag)}
                                                id={tag}
                                                value={tag}
                                                onChange={() => handleCheckboxChange(index, tag)}
                                            />
                                        }
                                        label={tag}
                                    />
                                )
                            })}
                        </FormControl>
                    </div>
                    <div>
                        <Button
                            className={classes.button}
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            edit boulder
                        </Button>
                    </div>
                </form>
                <Link className={classes.indexLink} to="/index">back to index page</Link>
            </Paper>
        </Container>
    )
}

export default EditBoulder
