import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function MySnackBar({open,message}) {


//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (
//     event: React.SyntheticEvent | Event,
//     reason?: SnackbarCloseReason,
//   ) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small"  >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        // onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        // onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}