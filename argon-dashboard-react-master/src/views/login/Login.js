import { useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    FormFeedback,
} from "reactstrap";
import LoaderGlobal from "components/LoaderGlobal";
import { showToast } from "../../components/Notifier";
import authServices from "../../services/authServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [showLoaderGlobal, setShowLoaderGlobal] = useState(false);

    // Estados para el formulario
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    // Estados para errores
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const validateForm = () => {
        let hasError = false;
        const newErrors = { email: false, password: false };

        // Validar email vacío
        if (!dataForm.email.trim()) {
            newErrors.email = "This field is required.";
            hasError = true;
        } else {
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(dataForm.email)) {
                newErrors.email = "Please enter a valid email address.";
                hasError = true;
            }
        }

        // Validar password vacío
        if (!dataForm.password.trim()) {
            newErrors.password = "This field is required.";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    };

    const handleClickLogin = () => {
        if (!validateForm()) {
            showToast("Please verify the information, some fields are invalid.", "error");
            return;
        }

        setShowLoaderGlobal(true);
        authServices
            .auth({
                Name: "TestUser1",
                Email: dataForm.email,
                Password: dataForm.password,
            })
            .then((response) => {
                const data = response?.data;
                if (data) {
                    sessionStorage.setItem("key_token", data);
                    navigate("/admin");
                }
            })
            .catch((error) => {
                const status = error?.response?.status;
                if (status === 404) showToast("Incorrect username and/or password", "error");
            })
            .finally(() => {
                setShowLoaderGlobal(false);
            });
    };

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white">
                        <div className="text-muted text-center mt-2">
                            <h3 className="mb-0">Sign in with credentials</h3>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <Form role="form">
                            {/* Campo Email */}
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        value={dataForm.email}
                                        onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })}
                                        invalid={Boolean(errors.email)}
                                    />
                                </InputGroup>
                                {errors.email && <FormFeedback className="d-block">{errors.email}</FormFeedback>}
                            </FormGroup>

                            {/* Campo Password */}
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        value={dataForm.password}
                                        onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })}
                                        invalid={Boolean(errors.password)}
                                    />
                                </InputGroup>
                                {errors.password && <FormFeedback className="d-block">{errors.password}</FormFeedback>}
                            </FormGroup>

                            <div className="text-center">
                                <Button className="my-4" color="primary" onClick={handleClickLogin}>
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            <LoaderGlobal show={showLoaderGlobal} />
        </>
    );
};

export default Login;
