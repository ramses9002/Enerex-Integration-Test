import { Modal, Button, Card, CardHeader, CardBody } from "reactstrap";

const ConfirmModal = ({ show = false, toggle, message = "Are you sure?", onAccept }) => {
    return (
        <Modal isOpen={show} toggle={toggle} centered>
            <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white">
                    <div className="text-muted text-center mt-2">
                        <h3 className="mb-0">Confirmation</h3>
                    </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5 text-center">
                    <p>{message}</p>
                    <div className="d-flex justify-content-center mt-4">
                        <Button color="danger" className="mr-3" onClick={onAccept}>
                            Aceptar
                        </Button>
                        <Button color="secondary" onClick={toggle}>
                            Cancelar
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </Modal>
    );
};

export default ConfirmModal;
