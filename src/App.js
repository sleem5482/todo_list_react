import "./App.css";
import TodoComponent from "./Component/todoComponent";
// import { useState } from "react";
import { ToastProvider } from "./Contexts/toastContext";
import TodosProvider from "./Contexts/todosContext";

// const InitialTodos = [
    // { id: 1, title: "read book", details: "any thing", isCompleted: false },
    // { id: 2, title: "read book", details: "any thing", isCompleted: false },
    // { id: 3, title: "read book", details: "any thing", isCompleted: false },
// ];
function App() {
    // const [todos, setTodos] = useState(InitialTodos);

    return (
        <>
            {/* <Material/>
        <Chip icon={<FaceIcon />} label="With Icon" />
<Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
<BGrid/>
<BasicStack/>
<BackupIcon/>
<SentimentVeryDissatisfiedTwoToneIcon/>
<LetterAvatars/> */}
            {/* <AccordionUsage/> */}
            <TodosProvider>
                <ToastProvider>
                        <TodoComponent />
                </ToastProvider>
            </TodosProvider>
        </>
    );
}

export default App;
