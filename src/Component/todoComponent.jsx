import "./component.css";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MyTask from "./todo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { TodosContext } from "../Contexts/todosContext";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "../Contexts/toastContext";
import { useState, useEffect, useMemo , useReducer} from "react";
import Reducer from "../Reducers/todosReducer";
// import { type } from "@testing-library/user-event/dist/type";


const theme = createTheme({
    typography: {
        fontFamily: ["Winky"],
    },
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
});

export default function TodoComponent() {
    const {todos,dispatch}=useContext(TodosContext)//use context with reducer
    // const [todos, dispatch]=useReducer(Reducer,[])
    const {showHideToast}=useToast()
    const [propsTodo, setPropsTodo] = useState(null);
    const [updatedTodo, setUpdatedTodo] = useState({});
    const [titleInput, setTitleInput] = useState("");
    const [displayedTodosType, setDisplayedTodosType] = useState("all");
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showUpdateAlert, setShowUpdateAlert] = useState(false);

    //filteration arrays

    const completedTodos = useMemo(() => {
        return todos.filter((ele) => {
            // console.log("is completed")
            return ele.isCompleted;
        });
    }, [todos]);

    const notCompletedTodos = useMemo(() => {
        return todos.filter((ele) => {
            // console.log("is not completed")
            return !ele.isCompleted;
        });
    }, [todos]);
    let TodosToBeRendered = todos;
    if (displayedTodosType === "completed") {
        TodosToBeRendered = completedTodos;
    } else if (displayedTodosType === "not-completed") {
        TodosToBeRendered = notCompletedTodos;
    } else {
        TodosToBeRendered = todos;
    }

    // create use Effect to load the localStorage when first reRendering
    useEffect(() => {
        // console.log("will call it in first rerender only")
       dispatch({type:"get"}); //reducer
    }, []); //will add two parameter first to do this function and second about dependences as when can reRender this

    function changeDisplayedType(e) {
        setDisplayedTodosType(e.target.value);
    }
    function handleAddClick() {
        dispatch({type:"added",payload:{newTitle:titleInput}})
        // localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTitleInput("");
        showHideToast("add Task successfully");
    }
    function showDeleteDialog(props) {
        // alert(props.id)
        setPropsTodo(props);
        setShowDeleteAlert(true);
    }
    function handleDeleteClose() {
        setShowDeleteAlert(false);
    }
    function handleDeleteConfirm() {
        dispatch({type:"deleted",payload:propsTodo})
        setShowDeleteAlert(false);
        showHideToast("Deleted Successfully")
    }

    function showUpdateDialog(props) {
        // alert(props.id)
        setUpdatedTodo(props);
        setShowUpdateAlert(true);
    }
    function handleUpdateClose() {
        setShowUpdateAlert(false);
    }
    function handleUpdateConfirm() {
        console.log(propsTodo)
        dispatch({type:"updated",payload:updatedTodo})
        setShowUpdateAlert(false);
        showHideToast("Updated Successfully")
    }
    // const storageTodos= JSON.parse(localStorage.getItem("todos"))
    // setTodos(storageTodos)  //this will setTodos after all reRendering will create an infinite loop

    const todosJsx = TodosToBeRendered.map((ele) => {
        return (
            <MyTask
                key={ele.id}
                props={ele}
                showDelete={showDeleteDialog}
                showUpdate={showUpdateDialog}
            />
        );
    });

    return (
        <>
            {/* update modal */}
            <Dialog
                open={showUpdateAlert}
                onClose={handleUpdateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Update Your Task
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Task Title"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.title}
                        onChange={(e) =>
                            setUpdatedTodo({
                                ...updatedTodo,
                                title: e.target.value,
                            })
                        }
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Details"
                        fullWidth
                        variant="standard"
                        value={updatedTodo.details}
                        onChange={(e) =>
                            setUpdatedTodo({
                                ...updatedTodo,
                                details: e.target.value,
                            })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose}>Disagree</Button>
                    <Button onClick={handleUpdateConfirm} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            {/* update modal */}
            {/* delete modal*/}
            <Dialog
                open={showDeleteAlert}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    are you sure you want to delete this task
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        if you delete this task you can't show and undo again
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Disagree</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            {/*______delete modal______*/}
            <div className="container">
                <ThemeProvider theme={theme}>
                    <h1 className="header">my Tasks</h1>
                    <ToggleButtonGroup
                        value={displayedTodosType}
                        onChange={changeDisplayedType}
                        color="primary"
                        exclusive
                        aria-label="Platform"
                        style={{ margin: "20px 10px" }}>
                        <ToggleButton value="not-completed">
                            Not Achievable
                        </ToggleButton>
                        <ToggleButton value="completed">
                            Achievable
                        </ToggleButton>
                        <ToggleButton value="all">All</ToggleButton>
                    </ToggleButtonGroup>
                    <div className="scrollContent">{todosJsx}</div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <TextField
                            onKeyUp={(e) => {
                                if (e.key == "Enter") handleAddClick();
                            }}
                            style={{ flex: "3", padding: "0 10px" }}
                            id="outlined-basic"
                            label="Your Task"
                            variant="outlined"
                            value={titleInput}
                            onChange={(e) => {
                                setTitleInput(e.target.value);
                            }}
                        />
                        <Button
                            disabled={titleInput.length <= 0}
                            style={{ flex: "1" }}
                            variant="contained"
                            onClick={() => {
                                handleAddClick();
                            }}>
                            Add
                        </Button>
                    </div>
                </ThemeProvider>
            </div>
        </>
    );
}
