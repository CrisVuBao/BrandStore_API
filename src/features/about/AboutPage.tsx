import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

const AboutPage = () => {
    return (
        <Container>
            <Typography gutterBottom variant="h2">Error for testing purposes</Typography>
            <ButtonGroup> 
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error()}>Test 400</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error()}>Test 401</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error()}>Test 500</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.getValidationError()}>Test Validation</Button>
            </ButtonGroup>
        </Container>
    )
}

export default AboutPage;