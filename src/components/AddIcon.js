
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
/**
 * @param props.recall function
 */
export function IconPlus(props) {
    const recall=props.recall||function(e){return e};
    return (
        <Fab 
        sx={{position:'fixed',right:40,bottom:60}}
        onClick={recall}
        color="primary" aria-label="add">
        <AddIcon />
        </Fab>
        )
}