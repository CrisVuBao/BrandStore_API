import { AppBar, Toolbar, Typography } from "@mui/material";


const Header = () => {
    
    return (
        <AppBar position="static"> {/*phần header*/}
            <Toolbar>
                <Typography variant="h6">BrandStore</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;