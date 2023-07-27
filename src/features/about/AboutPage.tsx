import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage() {
    return (
        <Container>
            <Typography gutterBottom variant="h2">Error for testing purposes</Typography>
            <ButtonGroup fullWidth> 
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.getValidationError()}>Test Validation</Button>
            </ButtonGroup>
        </Container>
    )
}