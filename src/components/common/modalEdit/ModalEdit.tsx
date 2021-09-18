import React, {ChangeEvent, useCallback, useState} from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";

type ModalEditPropsType = {
    name?: string
    lastName?: string

    nameModal: string
    openModal: boolean
    CloseModal: () => void
    editContact: (name: string, lastName: string) => void
}

export const ModalEdit = React.memo((props: ModalEditPropsType) => {


    const [Name, setName] = useState(props.name ? props.name : "")
    const [lastName, setLastName] = useState(props.lastName ? props.lastName : "")


    const onChangeAddNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onChangeAddLastNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.currentTarget.value)
    }


    const addSaveHandler = useCallback(() => {
        if (Name.trim() !== "") {
            props.editContact(Name, lastName)
            setLastName("")

        }
    }, [props, Name, lastName])
    return (
        <div>
            <Dialog open={props.openModal} onClose={props.CloseModal}>
                <DialogTitle>{props.nameModal}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter new Name, Last Name and phone
                    </DialogContentText>
                    <TextField
                        value={Name}
                        onChange={onChangeAddNameHandler}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={lastName}
                        onChange={onChangeAddLastNameHandler}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={addSaveHandler}>{props.nameModal}</Button>
                    <Button onClick={props.CloseModal}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})
