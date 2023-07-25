import { AppBar, Toolbar, Typography } from "@mui/material";


const Header = () => {
    
    return (
        <AppBar position="static" sx={{mb: 3}}> {/*phần header*/}
            <Toolbar>
                <Typography variant="h6">BrandStore</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;