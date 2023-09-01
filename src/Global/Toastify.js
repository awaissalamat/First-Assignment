import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = ({type,content})=>{
    if(type==="success"){
        toast.success(content);
    }
    else if (type==="error") {
        toast.error(content)
    }
    else{
        console.error("Something went wrong.");
    }
};

export{ToastContainer, Toast};