import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

export interface ConfirmationDialogProps {
    title: string;
    message: React.ReactNode;
    open: boolean;
    cancelButton?: React.ReactNode;
    confirmButton?: React.ReactNode;
}

function ConfirmationDialog({ title, message, open, cancelButton, confirmButton }: ConfirmationDialogProps) {
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {cancelButton}
                {confirmButton}
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog;