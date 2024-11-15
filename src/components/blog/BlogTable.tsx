import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { fetchListBlogs, resetCreated } from '../../redux/blog/BlogSlice';
import ModalAddBlog from '../../redux/blog/ModalAddBlog';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ModalDeleteBlog from './ModalDeleteBlog';
import ModalUpdateBlog from './ModalUpdateBlog';

const BlogTable = () => {
    const [blogUpdate, setBlogUpdate] = useState();
    const [blogDelete, setBlogDelete] = useState();
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowModalDelete(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const handleShow = () => {
        setShow(true);
    }
    const dispatch = useAppDispatch();
    const blog = useAppSelector(state => state.blog.listBlogs);
    const isCreated = useAppSelector(state => state.blog.isCreated);
    useEffect(() => {
        dispatch(fetchListBlogs());
    }, [])

    useEffect(() => {
        if (isCreated) {
            setShow(false);
            setShowEdit(false);
            setShowModalDelete(false);
            dispatch(resetCreated);
        }
    }, [isCreated])


    const handleEdit = (blog: any) => {
        setShowEdit(true);
        setBlogUpdate(blog);
    }

    const handleDelete = (blog: any) => {
        setShowModalDelete(true);
        setBlogDelete(blog);
    }
    return (
        <div>
            <div>
                <span>blog Table</span>
                <Button onClick={handleShow} variant="outline-primary" style={{ float: 'right' }}>Create blog</Button>
            </div>
            <br />
            <Table striped="columns" responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Content</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blog?.map((blog, index) => {
                        return (
                            <tr key={blog.id}>
                                <td>{index + 1}</td>
                                <td>{blog.id}</td>
                                <td>{blog.title}</td>
                                <td>{blog.author}</td>
                                <td>{blog.content}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Button style={{ marginTop: '12px' }} variant="outline-warning" onClick={() => handleEdit(blog)}>Edit</Button>
                                    <Button style={{ marginTop: '10px' }} onClick={() => handleDelete(blog)} variant="outline-danger">Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <ModalAddBlog show={show} handleClose={handleClose} />
            <ModalUpdateBlog showEdit={showEdit} handleCloseEdit={handleCloseEdit} blogUpdate={blogUpdate} />
            <ModalDeleteBlog showModalDelete={showModalDelete} handleCloseDelete={handleCloseDelete} blogDelete={blogDelete} />
        </div>
    )
}

export default BlogTable