import React, { useState } from 'react'
import { IconButton, Snackbar, Modal, Box, Typography, Link, InputAdornment, Grid } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signIn, signOut } from "next-auth/react"
import styles from '../styles/Inicio.module.scss'
import Profile from "./Profile"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSession } from "next-auth/react";
import FolderList from "./FolderList"
import UserProfileList from "./UserProfileList"

const Inicio = () => {
    const { data: session, status } = useSession();
    console.log(session);
    const [open, setOpen] = useState(false)

    return (
        <>
            <Snackbar open anchorOrigin={{ horizontal: 'right', vertical: 'top' }} className={styles.container}>
                {status == "unauthenticated" || status=="loading" ? (
                    <IconButton onClick={() => signIn()}>
                        <AccountCircleIcon className={styles.icon} />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => setOpen(true)}>
                        <Profile />
                    </IconButton>
                )}
            </Snackbar>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box className={styles.mo}>
                    <UserProfileList/>
                    <FolderList/>
                </Box>
            </Modal>

        </>
    )
}

export default Inicio