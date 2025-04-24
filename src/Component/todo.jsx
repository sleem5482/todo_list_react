import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import Button from '@mui/material/Button';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import { useState } from 'react';
import { useContext } from "react";
import { useToast } from "../Contexts/toastContext";
import { TodosContext } from "../Contexts/todosContext";

export default function MyTask({ props, showDelete, showUpdate }) {
    // const { todos, setTodos } = useContext(TodosContext);//this is context but now i use context with reducer
    const { todos, dispatch } = useContext(TodosContext); //use context with reducer
    const { showHideToast } = useToast();

    // const [updatedTodo,setUpdatedTodo]=useState({title: props.title,details:props.details})
    function handleCompleted(id) {
        //handle check click
        dispatch({ type: "toggleCompleted", payload:  props  });
        todos.map((e) => {
            if (e.id === id) {
                if (e.isCompleted === false) {
                    showHideToast("add to ACHIEVABLE");
                } else {
                    showHideToast("add to NOT ACHIEVABLE");
                }
                // e.isCompleted = !e.isCompleted
            }
        });
    }
    function handleDeleteClick() {
        showDelete(props);
    }

    function handleUpdateClick() {
        // setShowUpdateAlert(true)
        showUpdate(props);
    }

    return (
        <>
            <div className="taskContainer">
                <div style={{ textAlign: "left" }}>
                    <h3
                        style={{
                            textDecoration: props.isCompleted
                                ? "line-through"
                                : "none",
                        }}>
                        {props.title}
                    </h3>
                    <p>{props.details}</p>
                </div>
                <div>
                    <Stack direction="row" spacing={3}>
                        <IconButton
                            className="iconButton"
                            onClick={() => handleCompleted(props.id)}
                            style={{
                                color: props.isCompleted ? "white" : "#8bc34a",
                                border: "3px solid #8bc34a",
                                backgroundColor: props.isCompleted
                                    ? " #8bc34a"
                                    : "white",
                            }}
                            color="primary"
                            size="small">
                            <CheckRoundedIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleUpdateClick}
                            className="iconButton"
                            color="primary"
                            style={{
                                color: "#1769aa",
                                border: "3px solid #1769aa",
                                backgroundColor: "white",
                            }}>
                            <CreateRoundedIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleDeleteClick}
                            color="secondary"
                            className="iconButton"
                            style={{
                                color: "#b23c17",
                                border: "3px solid #b23c17",
                                backgroundColor: "white",
                            }}>
                            <DeleteForeverRoundedIcon />
                        </IconButton>
                    </Stack>
                </div>
            </div>
        </>
    );
}
