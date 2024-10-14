import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

type ModalConfirmProps = {
  onClose: () => void;
  onSubmit: () => void;
}

export default function ModalConfirmDelete({ onClose, onSubmit }: ModalConfirmProps) {
  return (
    <Dialog open onClose={onClose} data-testid="modal-confirm-delete">
      <DialogTitle>Are you sure ?</DialogTitle>
      <DialogContent>
        Do you want to delete task
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' data-testid="cancel-delete-button" onClick={onClose}>No</Button>
        <Button variant='contained' data-testid="confirm-delete-button" onClick={onSubmit}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}
