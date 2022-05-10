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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const weekdaymap = { '0': 'Monday', '1': 'Tuesday', '2': 'Wednesday', '3': 'Thursday', '4': 'Friday', '5': 'Saturday', '6': 'Sunday' }

FormDialogReminder.propTypes = {
    finish: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setopen: PropTypes.func.isRequired,
}

/**
 * 创建一个[0+offset,n+offset)的列表
 */
function loopntimes(n, offset = 0) {
    const rlist = []
    for (let i = 0; i < n; i++) {
        rlist.push(i + offset)
    }
    return rlist
}



/**
 * 计算月份的天数，传入0开始的月份,返回对应的天数列表,[1~31]
 */
function getNmonthDay(month) {
    month = month - 0 + 1 + ''
    if (month == '2') {
        return loopntimes(29, 1)
    }
    if (['1', '3', '5', '7', '8', '10', '12'].includes(month)) {
        return loopntimes(31, 1)
    }
    return loopntimes(30, 1)
}

/**
 * @param props.finish
 * @param props.open
 * @param props.setopen
 *      month:0~11
        date:1~31
        day:0~6
        hour:0~23
 */
export default function FormDialogReminder(props) {
    const infomat = { mode: "week", name: "", url: "", month: "0", day: "1", hour: "0" }
    // 规范入参
    const finish = props.finish || function (e) { return e }
    const open = props.open || false
    const setopen = props.setopen || function (e) { return e }
    const defaultinfo = infomat
    // 变量
    const [info, setinfo] = React.useState(defaultinfo)

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
                <DialogTitle>Reminders</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '60ch' },
                        }}
                        noValidate
                        fullWidth
                        autoComplete="off"
                    >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            variant="standard"
                            value={info.name}
                            onChange={(e) => { setinfo({ ...info, name: e.target.value }) }}
                        />
                        <br />
                        {"mode : "}
                        <Select
                            id="demo-simple-select"
                            value={info.mode}
                            onChange={(e) => { setinfo({ ...info, mode: e.target.value,day:'1' }) }}
                        >
                            <MenuItem value={'year'}>Each year</MenuItem>
                            <MenuItem value={'month'}>Each month</MenuItem>
                            <MenuItem value={'week'}>Each week</MenuItem>
                        </Select>
                        <br />
                        {
                            info.mode == 'year' ? (
                                <>
                                    {" month "}
                                    <Select
                                        id="demo-simple-select"
                                        value={info.month}
                                        onChange={(e) => { setinfo({ ...info, month: e.target.value }) }}
                                    >
                                        {loopntimes(12).map((each, index) => {
                                            return <MenuItem key={index} value={each.toString()}>{each + 1}</MenuItem>
                                        })}
                                    </Select>
                                </>
                            ) : <div></div>
                        }
                        {" day : "}
                        <Select
                            id="demo-simple-select"
                            value={info.day}
                            onChange={(e) => { setinfo({ ...info, day: e.target.value }) }}
                        >
                            {
                                info.mode == 'week' ? loopntimes(7).map((each, index) => {
                                    return <MenuItem key={index} value={each.toString()}>{weekdaymap[each.toString()]}</MenuItem>
                                }) : getNmonthDay(info.month).map((each, index) => {
                                    return <MenuItem key={index} value={each.toString()}>{each}</MenuItem>
                                })
                            }
                        </Select>
                        {" hour : "}
                        <Select
                            id="demo-simple-select"
                            value={info.hour}
                            onChange={(e) => { setinfo({ ...info, hour: e.target.value }) }}
                        >
                            {loopntimes(24).map((each, index) => {
                                return <MenuItem key={index} value={each.toString()}>{each}</MenuItem>
                            })}
                        </Select>
                        <br />
                        <TextField
                            margin="dense"
                            id="url"
                            label="Url"
                            fullWidth
                            variant="standard"
                            placeholder='https://'
                            value={info.url}
                            onChange={(e) => { setinfo({ ...info, url: e.target.value }) }}
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
