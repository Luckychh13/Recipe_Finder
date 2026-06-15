import{useState,useEffect} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography
} from '@mui/material';

const NotesEditModal=({open,onClose,recipe,onSave})=>{
    const[notesText,setNotesText]=useState('');

    useEffect(()=>{
        if(recipe){
            setNotesText(recipe.notes);
        }
    },[recipe]);
    const handleSave=()=>{
       onSave(recipe.idMeal,notesText);
    };
    if(!recipe){
        return null;
    }

    return (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    PaperProps={{
      sx: {
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(15px)",
        borderRadius: 3,
        color: "white",
      },
    }}
  >
    <DialogTitle sx={{ fontWeight: "bold" }}>
      Edit Notes for {recipe.strMeal}
    </DialogTitle>

    <DialogContent>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: "rgba(255,255,255,0.8)",
        }}
      >
        Add or update your personal notes for this recipe.
      </Typography>

      <TextField
        autoFocus
        margin="dense"
        id="notes"
        label="Your Personal Notes"
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        value={notesText}
        onChange={(e) => setNotesText(e.target.value)}
        sx={{
          mt: 1,
          input: { color: "white" },
          textarea: { color: "white" },
          label: { color: "rgba(255,255,255,0.7)" },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255,255,255,0.1)",
            "& fieldset": {
              borderColor: "rgba(255,255,255,0.4)",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ff9800",
            },
          },
        }}
      />
    </DialogContent>

    <DialogActions sx={{ p: "0 24px 24px" }}>
      <Button
        onClick={onClose}
        sx={{ color: "rgba(255,255,255,0.8)" }}
      >
        Cancel
      </Button>

      <Button
        onClick={handleSave}
        variant="contained"
        sx={{ fontWeight: "bold" }}
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

};
export default NotesEditModal;