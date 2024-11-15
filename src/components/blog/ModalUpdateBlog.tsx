import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateBlog } from '../../redux/blog/BlogSlice';
import { useAppDispatch } from '../../redux/hooks';
const ModalUpdateBlog = (props: any) => {
    const { showEdit, handleCloseEdit, blogUpdate } = props;
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [id, setId] = useState(0);

    useEffect(() => {
        if (blogUpdate) {
            setId(blogUpdate.id);
            setTitle(blogUpdate.title);
            setAuthor(blogUpdate.author);
            setContent(blogUpdate.content);
        }
    }, [blogUpdate]);
    const handleUpdate = () => {
        dispatch(updateBlog({ id, title, author, content }));
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
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title} type="email" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control value={author} type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control value={content} type="text" placeholder="Content" onChange={(e) => setContent(e.target.value)} />
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

export default ModalUpdateBlog