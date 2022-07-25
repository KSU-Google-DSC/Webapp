import { AppBar, Toolbar, IconButton, Typography, Stack, Button,Box, useMediaQuery, useTheme, Tabs, Tab } from "@mui/material"

import { useSession, signIn, signOut } from 'next-auth/react';
import React, { useState, useEffect } from "react";
import DrawerComp from "./DrawerComp";


const PAGES = ["About", "Events", "Socials", "Our Team"];
const Navbar = (props) => {
    const { data: session, status } = useSession();
    const [value, setValue] = useState();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <React.Fragment>
        <AppBar position='static'>
            <Toolbar>
                
                {
                    isMatch ?(
                        <>
                        <DrawerComp sx={{marginLeft: 4}}/>
                         <Box component="img" sx={{ height: 50, width: 50, mx:"auto"}}  alt='Google Developer Student Club Logo' src='/static/images/gdsc_logo.png' />
                         
                        </>
                    ) : (
                        <>
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                    DSC KSU
                        </Typography>
                    <Tabs  textColor='#000' >
                        {
                            PAGES.map((page,index) => (
                                <Tab  key={index} label={page}></Tab>
                            ))
                        }
                    
                </Tabs>

                     {/* If Session does not exist, invalid or client has not logged in, do this. */}
                    {!session && (
                        <>
                            <Button color='inherit' onClick={() => signIn()}>Login</Button>
                        </>
                    )}

                    {/* If Session does exist and the client has logged in, do this. */}
                    {session && (
                        <>
                            <Button color='inherit' onClick={() => signOut()}>Logout</Button>
                        </>
                    )}
                        </>
                    )
                }

               
            </Toolbar>
            
        </AppBar>
        </React.Fragment>
    )
}

export default Navbar;