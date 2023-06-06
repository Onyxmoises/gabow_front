import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InterestsIcon from '@mui/icons-material/Interests';
import MapIcon from '@mui/icons-material/Map';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { signIn, signOut } from "next-auth/react"

export default function SelectedListItem() {
    const [selectedIndex, setSelectedIndex] = React.useState();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if(index==2){
            signOut();
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#2a475e' }}>
            <List component="nav" aria-label="main mailbox folders">



                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar Sesion" />
                </ListItemButton>



            </List>
        </Box>
    );
}