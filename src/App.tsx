import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import './App.css';
import {Button, Card, Form} from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

type Inputs = {
    firstName: string
    email: string
}

function App() {

    const {register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<Inputs>({
        defaultValues: {
            firstName: "",
            email: ""
        },
        mode: "onBlur"
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        alert(JSON.stringify(data))
        reset()
    }

    const onChange = (value: string) => {
        console.log("Change: " + value)
    }

    return (
        <div className="App">

            <div>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Text as="h1">Welcome!</Card.Text>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-grid gap-2">
                                <div>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Your name"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                {...register("firstName", {
                                                    required: "First name is required!",
                                                    minLength: {
                                                        value: 5,
                                                        message: "Min length 5 is required"
                                                    }
                                                })}
                                                onChange={(e) => onChange(e.currentTarget.value)
                                                }
                                                placeholder={"Your name"}
                                                type="text"/>
                                        </FloatingLabel>
                                        <Form.Text className="text-muted">
                                            {errors.firstName &&
                                                <p style={{color: "red"}}> {errors?.firstName?.message} </p>}
                                        </Form.Text>
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Your email"
                                            className="mb-3"
                                        >
                                        <Form.Control
                                            {...register("email", {
                                                required: "Required!",
                                                pattern: {
                                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                    message: "Valid email is required!"
                                                }
                                            })}
                                            placeholder={"Your email"}
                                            type="text"/>
                                        </FloatingLabel>
                                        <Form.Text className="text-muted">
                                            {errors.email && <p style={{color: "red"}}> {errors?.email?.message} </p>}
                                        </Form.Text>
                                    </Form.Group>
                                </div>
                                <Button  variant="primary" type="submit" size="lg">Submit</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
}

export default App;
