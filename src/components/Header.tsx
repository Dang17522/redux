import { Container, Form, Navbar } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { changMode } from "../redux/app/AppSlice";
import { useEffect } from "react";


const Header = () => {
    const mode = useAppSelector(state => state.app.mode);
    const dispatch = useAppDispatch();


    useEffect(() => {
        const body = document.querySelector("body")
        if(body){
            body.setAttribute("data-bs-theme",mode ? 'dark': 'light');
        }   
    }, [mode])
    
    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">React Redux</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label={mode ? 'Dark mode' : 'Light mode'}
                                checked={mode}
                                onChange={(e) => dispatch(changMode(e.target.checked ? true : false))}
                            />
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header