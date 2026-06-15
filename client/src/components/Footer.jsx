import React from "react";
import { Box,Container,Typography,Link } from "@mui/material";

const Footer=()=>{
    return(
        <Box
        component="footer"
        sx={{
            bgcolor:'secondary.main',
            color:'white',
            py:3,
            mt:'auto'
        }}
        >
            <Container maxWidth="lg">
                <Typography variant="body1" align="center">
                    Recipe Finder &copy; {new Date().getFullYear()}
                    </Typography>
                <Typography variant="body2" align="center">
                         {'Built with ❤️ by '}
                   <Link color="inherit" href="https://github.com/">
                        Lucky Chhabra
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
};
export default Footer;