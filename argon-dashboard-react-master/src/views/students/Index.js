import { Card, CardHeader, Container, Row, Col, Button } from "reactstrap";
import Header from "components/Headers/Header.js";
import StudentsTable from "components/Tables/StudentsTable";
import { useState, useEffect } from "react";
import studentsServices from "../../services/studentsServices";
import { useNavigate } from "react-router-dom";
import LoaderPageView from "components/LoaderPageView";
import ConfirmModal from "components/ConfirmModal";
import { showToast } from "../../components/Notifier";

const Tables = () => {
    const navigate = useNavigate();
    const [listStudents, setListStudents] = useState([]);
    const [loaderPageView, setLoaderPageView] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [studentDelete, setStudentDelete] = useState({});

    const getListStudents = () => {
        setLoaderPageView(true);
        studentsServices
            .getStudents()
            .then((response) => {
                const data = response?.data;
                setListStudents(data);
            })
            .catch((error) => {
                const status = error?.response?.status;
                if (status === 401) navigate("/");
            })
            .finally(() => {
                setLoaderPageView(false);
            });
    };

    const handleClickAddStudent = () => {
        navigate("/admin/add_user");
    };

    const handleClickUpdateStudent = (item) => {
        navigate(`/admin/add_user/${item.id}`, { state: { item } });
    };

    const handleClickDeleteStudent = (item) => {
        setStudentDelete(item);
        setShowModal(true);
    };

    const actions = [
        {
            name: "Edit",
            func: (item) => handleClickUpdateStudent(item),
        },
        {
            name: "Delete",
            func: (item) => handleClickDeleteStudent(item),
        },
    ];

    useEffect(() => {
        getListStudents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loaderPageView ? (
        <LoaderPageView show={loaderPageView} />
    ) : (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt-5 mt-md--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-1">
                                <Row className="align-items-center justify-content-center">
                                    <Col xs="6">
                                        <h3 className="mb-0">Students List</h3>
                                    </Col>
                                    <Col xs="6" className="d-flex justify-content-end">
                                        <Button color="info" onClick={handleClickAddStudent}>
                                            New students
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <StudentsTable students={listStudents} actions={actions} />
                        </Card>
                    </div>
                </Row>
            </Container>
            <ConfirmModal
                show={showModal}
                toggle={() => setShowModal(false)}
                message={`¿You want to delete the student ${studentDelete.name}?`}
                onAccept={() => {
                    studentsServices
                        .deleteStudent(studentDelete.id)
                        .then(() => {
                            showToast("Student deleted successfully", "success");
                            getListStudents();
                        })
                        .finally(() => {
                            setShowModal(false);
                        });
                }}
            />
        </>
    );
};

export default Tables;
