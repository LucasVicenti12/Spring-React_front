import { Button, Divider, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { productUseCases } from "../../useCases/ProductUseCases";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const productObject = {
    code: 0,
    name: '',
    mark: '',
}

const RegisterModal = (isOpen) => {

    const [open, setOpen] = React.useState(isOpen)
    const [product, setProduct] = React.useState(productObject)
    const [openIngredients, setOpenIngredients] = React.useState(false)

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'row',
    }

    const onChangeProduct = (evt) => {
        const { name, value } = evt.target
        setProduct({ ...product, [name]: value })        
    }

    const handleCloseModal = () => {
        setOpen(false)
        setProduct(productObject)
    }

    const handleRegisterProduct = () => {
        console.log(product)
        return productUseCases.registerProduct(product)
    }

    function Ingredients(){
        return(
            <React.Fragment>
                <Box width={'100%'} sx={{ marginTop: '1rem' }}>
                    <Typography  sx={{ marginBottom: '0.3rem', fontSize: '1.2em' }}>Ingredients</Typography>
                    <Divider width='95%'/>
                    <Box width={'100%'} sx={{marginTop: '1rem'}}>
                        <TextField variant='outlined' label='Mark' name='mark' sx={{ width: '95%' }} onChange={(evt) => onChangeProduct(evt)} />
                    </Box>
                    <Box width={'100%'} sx={{marginTop: '1rem'}}>
                        <TextField variant='outlined' label='Mark' name='mark' sx={{ width: '95%' }} onChange={(evt) => onChangeProduct(evt)} />
                    </Box>
                    <Box width={'100%'} sx={{marginTop: '1rem'}}>
                        <TextField variant='outlined' label='Mark' name='mark' sx={{ width: '95%' }} onChange={(evt) => onChangeProduct(evt)} />
                    </Box>
                    <Box width={'100%'} sx={{display: 'flex', justifyContent: 'center'}}>
                        <KeyboardArrowUpIcon onClick={() => setOpenIngredients(false)}/>
                    </Box>
                </Box>
            </React.Fragment>
        )
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={modalStyle} sx={{ p: 3, flexWrap: 'wrap' }}>
                    <Box width={'100%'} sx={{ marginTop: '0.3rem' }}>
                        <Typography sx={{ marginBottom: '0.3rem', fontSize: '1.2em' }}>Register product</Typography>
                        <Divider width='95%' />
                    </Box>
                    <Box width={'100%'} sx={{ marginTop: '1rem' }}>
                        <Box>
                            <TextField variant='outlined' label='Code' name='code' sx={{ width: '95%' }} onChange={(evt) => onChangeProduct(evt)} />
                        </Box>
                    </Box>
                    <Box width={'100%'} sx={{ marginTop: '1rem' }}>
                        <TextField variant='outlined' label='Name' name='name' sx={{ width: '95%' }} onChange={(evt) => onChangeProduct(evt)} />
                    </Box>
                    <Box width={'100%'} sx={{ marginTop: '1rem' }}>
                        <TextField variant='outlined' label='Mark' name='mark' sx={{ width: '95%' }} onChange={(evt) => onChangeProduct(evt)} />
                    </Box>
                    {openIngredients ? <Ingredients/> : <></>}
                    <Box width={'95%'} sx={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                        <Button variant='outlined' color='success' sx={{display: 'flex', marginLeft: 0, marginRight: 'auto'}} onClick={() => setOpenIngredients(true)}>Register ingredients</Button>                                                             
                        <Button variant='outlined' onClick={handleCloseModal} color='error'>Cancel</Button>
                        <Button variant='outlined' sx={{ marginLeft: '1rem' }} onClick={handleRegisterProduct}>Register</Button>                                                    
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default RegisterModal;