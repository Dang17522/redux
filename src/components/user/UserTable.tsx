import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchListUsers, resetCreated } from '../../redux/user/UserSlice';
import ModalAddUser from './ModalAddUser';
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';

const UserTable = () => {
    const [userUpdate , setUserUpdate] = useState();
    const [userDelete , setUserDelete] = useState();
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const handleShow = () => {
        setShow(true);
    }

    const [email, setEmail] = useState<string>();
    const [name, setName] = useState<string>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.listUsers);
    const isCreated = useAppSelector(state => state.user.isCreated);
    useEffect(() => {
        dispatch(fetchListUsers());
    },[])

    useEffect(() => {
        if(isCreated){
            setShow(false);
            setShowEdit(false);
            setEmail('');
            setName('');
            dispatch(resetCreated());
        }
    },[isCreated])

    
    const handleEdit = (user:any) =>{
        setShowEdit(true);
        setUserUpdate(user);
    }

    const handleDelete = (user:any) =>{
        setShowModalDelete(true);
        setUserDelete(user);
    }
    return (
        <div>
            <div>
                <span>User Table</span>
                <Button  onClick={handleShow} variant="outline-primary" style={{ float: 'right'}}>Create User</Button>
            </div>
            <br/>
            <Table striped="columns" responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user?.map((user, index) => {
                        return (
                            <tr key={user.id}>
                                <td>{index +1}</td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td style={{textAlign: 'center'}}>
                                <Button variant="outline-warning" onClick={() => handleEdit(user)}>Edit</Button>
                                <Button style={{marginLeft: '10px'}} onClick={() => handleDelete(user)}  variant="outline-danger">Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <ModalAddUser show={show} showEdit={showEdit} handleClose={handleClose} email={email} name={name} setEmail={setEmail} setName={setName} userUpdate ={userUpdate}/>
            <ModalUpdateUser showEdit={showEdit} handleCloseEdit={handleCloseEdit} userUpdate ={userUpdate}/>
            <ModalDeleteUser showModalDelete={showModalDelete} handleClose={handleClose} userDelete={userDelete} setShowModalDelete={setShowModalDelete}/>
        </div>
    )
}

export default UserTable