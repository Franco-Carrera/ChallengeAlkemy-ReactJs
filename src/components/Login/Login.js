import "./Login.css";
import { useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Context from "../../context/HeroContext";
import { Redirect } from "react-router-dom";

const Login = () => {
  const { login, user } = useContext(Context);
  const email = "challenge@alkemy.org";
  const password = "react";

  useEffect(() => {}, [user]);

  return (
    <>
      {user ? (
        <Redirect to="/" />
      ) : (
        <div className="container w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              let err = {};

              //validación correo
              if (!values.email) {
                err.email = "Aguarde, debe ingresar un correo";
              } else if (
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  values.email
                )
              ) {
                err.email = "Correo inválido";
              }

              //validación contraseña
              if (!values.password) {
                err.password = "Aguarde, debe ingresar la contraseña";
              } else if (!/[a-zA-ZÀ-ÿ\s]$/.test(values.password)) {
                err.password = "Contraseña inválida";
              }
              return err;
            }}
            onSubmit={(values) => {
              values.email.toLowerCase() === email &&
              values.password === password
                ? login(values)
                : alert("Los datos ingresados son incorrectos");
            }}
          >
            {({ errors }) => (
              <Form
                className="d-flex container col-sm-10 col-md-8 p-5
            flex-column border border-secondary rounded justify-content-center align-items-center"
              >
                <Stack gap={2} className="container mb-3">
                  <Col md={{ span: 6, offset: 3 }}>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="col-form-label fw-bold form-control text-center"
                    />
                    <ErrorMessage
                      name="email"
                      component={() => (
                        <div className="alert alert-danger mt-2">
                          {errors.email}
                        </div>
                      )}
                    />
                  </Col>
                  <Col md={{ span: 6, offset: 3 }}>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="col-form-label fw-bold form-control text-center"
                    />
                    <ErrorMessage
                      name="password"
                      component={() => (
                        <div className="alert alert-danger mt-2">
                          {errors.password}
                        </div>
                      )}
                    />
                  </Col>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default Login;
