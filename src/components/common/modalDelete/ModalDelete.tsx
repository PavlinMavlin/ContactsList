import React, {useCallback, useEffect, useState} from "react"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";


type ModalDeletePropsType = {
    onDeleteButtonClick: () => void
    openDeleteModal: boolean
    onCloseModalButtonClick: () => void
    lastName: string
}

export const ModalDelete = (props: ModalDeletePropsType) => {


    return (
        <div>

            <Dialog
                open={props.openDeleteModal}
                onClose={props.onCloseModalButtonClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to remove {props.lastName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onDeleteButtonClick}>Delete</Button>
                    <Button onClick={props.onCloseModalButtonClick} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}