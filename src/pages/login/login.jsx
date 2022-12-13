import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import logo from "./images/Inventium_logo_RGB.png"



export default function Login({ setToken }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [invalidPassword, setInvalidPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)



    async function authenticate(isValidForm) {
        if (isValidForm) {
            try {
                const completedAuthentication = fetch("http://" + process.env.REACT_APP_EXTERNAL_IP + ":9000/api/authenticate", {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.token) {
                            setToken(res.token, res.firstname, res.userID, rememberMe);
                            sessionStorage.setItem('userID', JSON.stringify(res.userID));
                            sessionStorage.setItem('firstName', JSON.stringify(res.firstname));
                            return true;
                        }
                        else {
                            return false
                        }
                    })
                return await completedAuthentication
            }
            catch (e) {
                console.log(e);
                return false
            }
        }
        else {
            return false
        }
    }



    const handleValidation = (event) => {
        let formIsValid = true;

        if (!email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
            formIsValid = false;
            setEmailError("Email Not Valid");
            return false;
        } else {
            setEmailError("");
            formIsValid = true;
        }

        if (!password.match(/^[a-zA-Z]{8,22}$/)) {
            formIsValid = false;
            setPasswordError(
                "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
            );
            return false;
        } else {
            setPasswordError("");
            formIsValid = true;
        }

        return formIsValid;
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        const validated = handleValidation();
        if (validated) {
            const authenticated = await authenticate(validated);
            if (!authenticated) {
                setInvalidPassword("Incorrect email or password.")
            }
        }
    };

    return (
        <>
            <span class="animation-area">
                <span class="circle">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </span>
            </span>
            <Container style={{ width: "60vw", padding: '15vh 0px' }}>
                <Card style={{ padding: "10px" }} className={"shadow p-4"}>
                    <img src={logo} alt="test" id="logo-login" />
                    <Card.Title style={{ "font-weight": "bolder" }}>
                        InventiTrack Login
                    </Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                            <small id="emailHelp" className="text-danger form-text">
                                {emailError}
                            </small>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                            <Card.Link href='/password-reset'>Forgot Password</Card.Link>
                            <br />
                            <small id="passworderror" className="text-danger form-text">
                                {passwordError}
                            </small>
                            <small id="validationerror" className="text-danger form-text">
                                {invalidPassword}
                            </small>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" onChange={()=>setRememberMe(!rememberMe)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={loginSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Container>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};