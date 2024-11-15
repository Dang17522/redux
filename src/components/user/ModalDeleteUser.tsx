import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../redux/hooks";
import { DeleteUser } from "../../redux/user/UserSlice";

const ModalDeleteUser = (props: any) => {
    const { showModalDelete, handleClose, userDelete, setShowModalDelete } = props;
    useEffect(() => {

    }, [userDelete])

    const handleDelete = () => {
        dispatch(DeleteUser(userDelete));
        setShowModalDelete(false);
    }
    const dispatch = useAppDispatch();
    return (
        <>
            <Modal show={showModalDelete} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {userDelete?.name}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
                        Cancle
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteUser