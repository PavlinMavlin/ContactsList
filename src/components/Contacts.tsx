import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {addCardTC, deleteContactTC, fetchContactsTC, updateContactTC} from "../redux/reducers/contact-reducer";
import {Button} from "@material-ui/core";
import {ModalDelete} from "./common/modalDelete/ModalDelete";
import {ModalEdit} from "./common/modalEdit/ModalEdit";
import {ContactType} from "../api/api";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const Contacts = React.memo(() => {
    const classes = useStyles();

    const contacts = useSelector<AppRootStateType, Array<ContactType>>(state => state.contactReducer.data)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [id, setId] = useState<number>()
    const [lastName, setLastName] = useState<string>("")
    const [name, setName] = useState<string>("")
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fetchContactsTC())
    }, [dispatch])


    const deleteContact = useCallback(() => {
        if (id) {
            dispatch(deleteContactTC(id))
        }

        setOpenDeleteModal(false)
    }, [dispatch, id])

    const openDeleteModalHandler = useCallback((id: number, lastName: string) => {
        setOpenDeleteModal(true);
        setId(id)
        setLastName(lastName)
    }, [])

    const handleClose = useCallback(() => {
        setOpenDeleteModal(false);
        setOpenAddModal(false)
        setOpenEditModal(false)
    }, []);


    const openAddModalHandler = useCallback(() => {
        setOpenAddModal(true)
    }, [])

    const AddNewContact = useCallback((name: string, lastName: string) => {
        dispatch(addCardTC(name, lastName))
        setOpenAddModal(false)
    }, [dispatch])


    const openEditModalHandler = useCallback((id: number, name: string, lastName: string) => {
        setOpenEditModal(true)
        setId(id)
        setLastName(lastName)
        setName(name)

    }, [])

    const editContact = useCallback((name: string, lastName: string) => {
        if (id) {
            dispatch(updateContactTC(name, lastName, id))
        }
        setOpenEditModal(false)
    }, [dispatch, name, lastName, id])

    return (

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">E-mail</TableCell>

                        <TableCell align="right">Action
                            <Button onClick={() => openAddModalHandler()} color={"primary"}>Add</Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {openEditModal && <ModalEdit
                        name={name}
                        lastName={lastName}
                        nameModal={"Edit"}
                        openModal={openEditModal}
                        editContact={editContact}
                        CloseModal={handleClose}

                    />}
                    {openDeleteModal && <ModalDelete
                        openDeleteModal={openDeleteModal}
                        onDeleteButtonClick={deleteContact}
                        onCloseModalButtonClick={handleClose}
                        lastName={lastName}
                    />}
                    {openAddModal && <ModalEdit
                        nameModal={"Add"}
                        editContact={AddNewContact}
                        openModal={openAddModal}
                        CloseModal={handleClose}

                    />}
                    {contacts.length === 0
                        ? <div>
                            <span>Contacts list is empty.</span>
                        </div>

                        : contacts.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell align="right">{contact.first_name}</TableCell>
                                <TableCell align="right">{contact.last_name}</TableCell>
                                <TableCell align="right">{contact.email}</TableCell>

                                <TableCell align="right">
                                    <div>
                                        <Button
                                            onClick={() => openEditModalHandler(contact.id, contact.first_name, contact.last_name)}
                                            color={"primary"}>
                                            Edit
                                        </Button>
                                        <Button onClick={() => openDeleteModalHandler(contact.id, contact.last_name)}
                                                color={"secondary"}>Delete</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
})