// Modules的表单
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';



FormDialogModule.propTypes={
    finish:PropTypes.func.isRequired,
    open:PropTypes.bool.isRequired,
    setopen:PropTypes.func.isRequired,
    defaultinfo:PropTypes.object
}

/**
 * @param props.finish
 * @param props.open
 * @param props.setopen
 * @param props.defaultinfo {name:'',des:'',url:''}
 */
export default function FormDialogModule(props) {
    const infomat={name:'',des:'',url:''}
    // 规范入参
    const finish = props.finish || function (e) { return e }
    const open=props.open||false
    const setopen=props.setopen||function(e){return e}
    const defaultinfo=props.defaultinfo||infomat
    // 变量
    const [info,setinfo]=React.useState(defaultinfo)

    const handleSubmit = () => {
        if(info.name){
            finish(info);
            setopen(false);
        }
    }

    const handleClose = () => {
        setopen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modules</DialogTitle>
                <DialogContent>
                    <Box
                    component="form"
                    fullwidth
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '60ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            variant="standard"
                            onChange={(e)=>{setinfo({...info,name:e.target.value})}}
                        />
                        <br />
                        <TextField
                            multiline
                            margin="dense"
                            id="des"
                            label="Description"
                            fullWidth
                            variant="standard"
                            onChange={(e)=>{setinfo({...info,des:e.target.value})}}
                        />
                        <br />
                        <TextField
                            margin="dense"
                            id="url"
                            label="Url"
                            fullWidth
                            variant="standard"
                            placeholder='https://'
                            onChange={(e)=>{setinfo({...info,url:e.target.value})}}
                        />
                    </Box>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
