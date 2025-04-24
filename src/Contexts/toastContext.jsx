import { createContext ,useState,useContext} from "react";
import MySnackBar from "../Component/mySnackBar";


 const ToastContext =createContext({})

export const ToastProvider =({children})=>{

    const [open, setOpen] = useState(false);
const [msg, setMsg] = useState("");

    function showHideToast(msg){
        setOpen(true)
        setMsg(msg)
        setTimeout(() => {
          setOpen(false)
        }, 2000);
      }
    return(
        <ToastContext.Provider value={{showHideToast}}>
              <MySnackBar open={open} message={msg}/>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast=()=>{
    return useContext(ToastContext)
}