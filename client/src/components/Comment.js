import React from 'react'
import { makeStyles, Typography, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core'
import { Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        borderWidth: "3px",
        borderColor: "#B3D0BA",
        marginBottom: "10px"
    },
    cardHeader: {
        paddingBottom: "0px"
    },
    cardContent: {
        paddingTop: "8px"
    },
    cardAction: {
        paddingTop: "0px"
    },
    commentBody: {
        fontSize: "14px"
    },
    deleteIcon: {
        padding: "0px"
    }
}))

const Comment = ({ comment, onDeleteComment }) => {
    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.cardRoot}>
            <CardHeader
                className={classes.cardHeader}
                title={comment.title}
                titleTypographyProps={{ variant: "h6" }}
                subheader={`by: ${comment.author.username}`}
                subheaderTypographyProps={{ variant: "body1" }}
            >
            </CardHeader>
            <CardContent className={classes.cardContent}>
                <Typography variant="body1" className={classes.commentBody}>
                    {comment.body}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <IconButton className={classes.deleteIcon}>
                    <DeleteIcon
                        color="secondary"
                        onClick={() => onDeleteComment(comment._id)}
                    />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Comment
