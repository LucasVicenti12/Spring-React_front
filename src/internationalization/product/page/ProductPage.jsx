import { Button } from "@mui/material";
import * as ReactDOM from 'react-dom';
import React from "react";
import RegisterModal from "../component/modals/RegisterProductModal";

const ListProductPage = () => {

    const handleOpenRegisterModal = (evt) => {
        evt.preventDefault()
        const container = document.getElementById('modal')
        const root = ReactDOM.createRoot(container)
        return root.render(<RegisterModal isOpen={true}/>)
    }

    return (
        <div>
            <Button onClick={handleOpenRegisterModal}>Register</Button>
            <input type='hidden' id='modal'/>
        </div>
    )
}

export default ListProductPage 