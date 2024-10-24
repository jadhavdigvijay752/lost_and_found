import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * UserLayoutComponent is a React component that provides a layout for user pages.
 * It includes an app bar with a welcome message and a logout button.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.user - The current user object.
 * @param {Function} props.handleLogout - Function to handle user logout.
 * @param {React.ReactNode} props.children - The content to be displayed within the layout.
 * @returns {JSX.Element} The rendered UserLayoutComponent.
 */
function UserLayoutComponent({ user, handleLogout, children }) {
    return (
        <div className="bg-[#e7e2ff]">
            <AppBar
                className="mb-4"
                position="static"
                sx={{
                    background:
                        'linear-gradient(217.64deg, #9181F4 -5.84%, #5038ED 106.73%)',
                    color: 'white',
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        style={{ color: 'white' }}
                    >
                        Eureka
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ mr: 2 }}>
                            Welcome, {user?.displayName || user?.email || 'User'}
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={handleLogout}
                            title="Logout"
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {children}
        </div>
    );
}

export default UserLayoutComponent;
