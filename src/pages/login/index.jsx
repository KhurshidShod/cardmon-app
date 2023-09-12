import React, { useState } from "react";
import { Button, Form, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [validated, setValidated] = useState(false);

  const login = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else if (user.password !== "0000") {
      console.log("error");
      toast.error("Invalid password");
    } else {
      navigate('/home')
    }
  };

  return (
    <section
      style={{ height: "100vh" }}
      className="login bg-dark d-flex justify-content-center align-items-center"
    >
      <div className="container">
        <Form
          className="w-50 text-white mx-auto"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              value={user.username}
              onChange={(e) => login(e)}
              type="text"
              placeholder="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              value={user.password}
              onChange={(e) => login(e)}
              type="password"
              placeholder="password"
            />
          </Form.Group>
          <Button type="submit">Log in</Button>
        </Form>
      </div>
    </section>
  );
}

export default LoginPage;
