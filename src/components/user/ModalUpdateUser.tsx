import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { updateUser } from '../../redux/user/UserSlice';
const ModalUpdateUser = (props: any) => {
    const { showEdit, handleCloseEdit, userUpdate } = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState(0);

    useEffect(() => {
        if (userUpdate) {
            setId(userUpdate.id);
            setName(userUpdate.name);
            setEmail(userUpdate.email);
        }
    }, [userUpdate]);
    const handleUpdate = () => {
        dispatch(updateUser({ id, email, name }));
    }
    const dispatch = useAppDispatch();
    return (
        <>
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateUser