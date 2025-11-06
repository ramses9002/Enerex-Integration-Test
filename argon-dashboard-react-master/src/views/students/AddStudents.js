import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, FormFeedback } from "reactstrap";
import Header from "components/Headers/Header";
import studentsServices from "../../services/studentsServices";
import { showToast } from "../../components/Notifier";
import LoaderGlobal from "components/LoaderGlobal";

const AddStudent = () => {
    const { id } = useParams(); // id opcional para editar
    const { state } = useLocation();
    const navigate = useNavigate();
    const [showLoaderGlobal, setShowLoaderGlobal] = useState(false);

    const [dataForm, setDataForm] = useState({
        Name: "",
        Gender: "",
        Age: 0,
        Education: "",
        AcademicYear: 0,
    });

    const [errors, setErrors] = useState({
        Name: "",
        Gender: "",
        Age: "",
        Education: "",
        AcademicYear: "",
    });

    // Si se está editando, cargar datos del estudiante
    useEffect(() => {
        if (id) {
            const studentData = state?.item;
            if (studentData) {
                setDataForm({
                    Name: studentData.name,
                    Gender: studentData.gender,
                    Age: studentData.age,
                    Education: studentData.education,
                    AcademicYear: studentData.academicYear,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const validateForm = () => {
        let hasError = false;
        const newErrors = {
            Name: "",
            Gender: "",
            Age: "",
            Education: "",
            AcademicYear: "",
        };

        if (!dataForm.Name.trim()) {
            newErrors.Name = "This field is required.";
            hasError = true;
        }

        if (!dataForm.Gender.trim()) {
            newErrors.Gender = "This field is required.";
            hasError = true;
        }

        // Validar edad mínima
        if (!dataForm.Age || dataForm.Age < 10) {
            newErrors.Age = "Age must be at least 10.";
            hasError = true;
        }

        if (!dataForm.Education.trim()) {
            newErrors.Education = "This field is required.";
            hasError = true;
        }

        // Validar año académico mínimo
        if (!dataForm.AcademicYear || dataForm.AcademicYear < 1) {
            newErrors.AcademicYear = "Academic year must be at least 1.";
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            showToast("Please verify the information, some fields are invalid.", "error");
            return;
        }

        if (id) {
            // Editar estudiante
            setShowLoaderGlobal(true);
            studentsServices
                .updateStudent(id, dataForm)
                .then(() => {
                    showToast("Student updated successfully", "success");
                    navigate("/admin");
                })
                .finally(() => {
                    setShowLoaderGlobal(false);
                });
        } else {
            // Agregar estudiante
            setShowLoaderGlobal(true);
            studentsServices
                .addStudent(dataForm)
                .then(() => {
                    showToast("Student added successfully", "success");
                    setDataForm({
                        Name: "",
                        Gender: "",
                        Age: 0,
                        Education: "",
                        AcademicYear: 0,
                    });
                    //navigate("/admin");
                })
                .finally(() => {
                    setShowLoaderGlobal(false);
                });
        }
    };

    return (
        <>
            <Header />
            <Container className="mt-5 mt-md--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-1">
                                <Row className="align-items-center justify-content-center">
                                    <Col xs="6">
                                        <h3 className="mb-0">{id ? "Edit Student" : "Add Student"}</h3>
                                    </Col>
                                    <Col xs="6" className="d-flex align-items-center justify-content-end">
                                        <Button color="info" onClick={() => navigate("/admin/students")}>
                                            Back
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label htmlFor="input-name">Name</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-name"
                                                    placeholder="Full name"
                                                    type="text"
                                                    value={dataForm.Name}
                                                    onChange={(e) => setDataForm({ ...dataForm, Name: e.target.value })}
                                                    invalid={Boolean(errors.Name)}
                                                />
                                                {errors.Name && <FormFeedback className="d-block">{errors.Name}</FormFeedback>}
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label htmlFor="input-gender">Gender</label>
                                                <Input
                                                    type="select"
                                                    id="input-gender"
                                                    className="form-control-alternative"
                                                    value={dataForm.Gender}
                                                    onChange={(e) => setDataForm({ ...dataForm, Gender: e.target.value })}
                                                    invalid={Boolean(errors.Gender)}
                                                >
                                                    <option value="">Select gender</option>
                                                    <option value="M">Male</option>
                                                    <option value="F">Female</option>
                                                </Input>
                                                {errors.Gender && <FormFeedback className="d-block">{errors.Gender}</FormFeedback>}
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label htmlFor="input-age">Age</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-age"
                                                    placeholder="Age"
                                                    type="number"
                                                    min="10"
                                                    value={dataForm.Age}
                                                    onChange={(e) =>
                                                        setDataForm({
                                                            ...dataForm,
                                                            Age: parseInt(e.target.value) || 0,
                                                        })
                                                    }
                                                    invalid={Boolean(errors.Age)}
                                                />
                                                {errors.Age && <FormFeedback className="d-block">{errors.Age}</FormFeedback>}
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label htmlFor="input-education">Education</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-education"
                                                    placeholder="Education"
                                                    type="text"
                                                    value={dataForm.Education}
                                                    onChange={(e) => setDataForm({ ...dataForm, Education: e.target.value })}
                                                    invalid={Boolean(errors.Education)}
                                                />
                                                {errors.Education && <FormFeedback className="d-block">{errors.Education}</FormFeedback>}
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label htmlFor="input-academic-year">Academic Year</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-academic-year"
                                                    placeholder="Academic Year"
                                                    type="number"
                                                    min="1"
                                                    value={dataForm.AcademicYear}
                                                    onChange={(e) =>
                                                        setDataForm({
                                                            ...dataForm,
                                                            AcademicYear: parseInt(e.target.value) || 0,
                                                        })
                                                    }
                                                    invalid={Boolean(errors.AcademicYear)}
                                                />
                                                {errors.AcademicYear && <FormFeedback className="d-block">{errors.AcademicYear}</FormFeedback>}
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <hr className="mt-2 mb-4" />
                                    <Button color="primary" type="submit">
                                        {id ? "Update" : "Add"} Student
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
            <LoaderGlobal show={showLoaderGlobal} />
        </>
    );
};

export default AddStudent;
