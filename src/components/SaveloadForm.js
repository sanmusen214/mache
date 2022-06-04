// 提取、导入所有info
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import {saveAll,loadAll} from '../services/saveload'


SaveloadForm.propTypes={
    open:PropTypes.bool.isRequired,
    setopen:PropTypes.func.isRequired,
}

/**
 * @param props.open
 * @param props.setopen
 */
export default function SaveloadForm(props) {
    // 规范入参
    const open=props.open
    const setopen=props.setopen

    // 变量
    const [info,setinfo]=React.useState()

    React.useEffect(()=>{
        setinfo(loadAll())
    },[])

    const handleSubmit = () => {
        if(info){
            saveAll(info);
            setopen(false);
        }
    }

    const handleClose = () => {
        setopen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save/Load</DialogTitle>
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
                            rows={10}
                            multiline
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            variant="standard"
                            value={info}
                            onChange={(e)=>{setinfo(e.target.value)}}
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
