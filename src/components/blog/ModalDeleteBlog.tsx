import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteBlog } from "../../redux/blog/BlogSlice";
import { useAppDispatch } from "../../redux/hooks";

const ModalDeleteBlog = (props:any) => {
   const {showModalDelete, handleCloseDelete,blogDelete,setShowModalDelete} = props;
   useEffect(() => {
       
   },[blogDelete])

   const handleDelete = () =>{
    dispatch(deleteBlog(blogDelete));
    setShowModalDelete(false);
   }
   const dispatch = useAppDispatch();
    return (
        <>
            <Modal show={showModalDelete} onHide={handleCloseDelete} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete blog with title:  {blogDelete?.title}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
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

export default ModalDeleteBlog