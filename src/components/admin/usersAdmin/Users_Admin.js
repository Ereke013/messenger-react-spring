import React, {useEffect, useState} from "react";
import "./Users_Admin.css";
import requests from "../../../request";
import axios from "../../../axios";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import {Button, Modal} from "react-bootstrap";

function Users_Admin(props){
    const [newUser, setNewUser]=useState({
        fullName:"",
        email:"",
        password:""
    });

    const [isAdded, setIsAdded] = useState(false);
    const [userToEdit, setUserToEdit] = useState({
        id: 0,
        fullName:"",
        ava:"",
        email:"",
        password:"",
        roles:[]
    });
    const [id, setId] = useState(0);

    const [allUsers, setAllUsers]=useState([]);

    useEffect(()=>{
        async function fetchData(){
            let request = await axios.get(requests.getAllUsers);
            console.log("req");
            console.log(request.data);
            setAllUsers(request.data);
            console.log("allUsers");
            console.log(allUsers);
        }
        fetchData();
    },[isAdded]);

    const createUser=()=>{
        axios.post(requests.register, newUser).then(res=>{
            setIsAdded(!isAdded);
            setShow(false);
        });
        setNewUser({fullName: "", email: "", password: ""});
    }

    async function getToEditUser(id){
        let req = await axios.get(requests.getUserToEdit + id);
        console.log("reqгыыыы");
        console.log(req);
    }

    //regin pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //endregion

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {
        console.log("userToEdit")
        console.log(userToEdit)
        setShow2(true);
    }


    return(
        <div className="users__admin">
            <h2 style={{textAlign:"center"}}>Users</h2>
            <div className="row">
                <Button variant="primary" onClick={handleShow}>
                    + Add New User
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton className="backcolorBlack">
                        <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backcolorBlack">
                        <form>
                            <div className="form-group">
                                <label>Full Name:</label>
                                <input className="form-control" placeholder="Full Name..." value={newUser.fullName} onChange={(e)=>{
                                    setNewUser({...newUser, fullName: e.target.value})
                                }} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className="form-control" placeholder="Email..." value={newUser.email} onChange={(e)=>{
                                    setNewUser({...newUser, email: e.target.value})
                                }}/>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" className="form-control" placeholder="Password..." value={newUser.password} onChange={(e)=>{
                                    setNewUser({...newUser, password: e.target.value})
                                }} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="backcolorBlack">
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={createUser}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className="row p-3">

                <Paper style={{width:"100%", borderRadius:"10px"}} >
                    <TableContainer style={{maxHeight:440, borderRadius:"10px"}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow >
                                    <TableCell>
                                        User ID
                                    </TableCell>
                                    <TableCell>
                                        User Full Name
                                    </TableCell>
                                    <TableCell>
                                        User Email
                                    </TableCell>
                                    <TableCell>
                                       Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>
                                                {row.id}
                                            </TableCell>
                                            <TableCell>
                                                {row.fullName}
                                            </TableCell>
                                            <TableCell>
                                                {row.email}
                                            </TableCell>
                                            <TableCell>
                                                <div className="d-flex">
                                                    {/*<Link className="btn btn-primary" to={`${path}/${row.id}`} >Edit</Link>*/}

                                                    <button onClick={async ()=>{
                                                        console.log(row.id);
                                                        setId(row.id);
                                                        let request = await axios.get(requests.getUserToEdit+row.id);
                                                        setUserToEdit({...userToEdit, id:request.data.id, fullName: request.data.fullName, email: request.data.email, ava: request.data.ava, roles: request.data.roles, password: request.data.password});
                                                        // setUserToEdit({...userToEdit, email: request.data.email});
                                                        // setUserToEdit({...userToEdit, ava: request.data.ava});
                                                        // setUserToEdit({...userToEdit, roles: request.data.roles});
                                                        // setUserToEdit({...userToEdit, password: request.data.password});
                                                        handleShow2();

                                                    }} className="ml-1 btn btn-primary">Edit</button>
                                                    <button onClick={()=>{
                                                        console.log(row.id);
                                                        let res = axios.delete(requests.deleteUser+row.id).then(ress=>{
                                                            setIsAdded(!isAdded);
                                                        });
                                                    }} className="ml-1 btn btn-danger">Delete</button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={allUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>

            {/*edit modal*/}
                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton className="backcolorBlack">
                        <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backcolorBlack">
                        <form>
                            <div className="form-group">
                                <label>Full Name:</label>
                                <input className="form-control" placeholder="Full Name..." value={userToEdit.fullName} onChange={(e)=>{
                                    setUserToEdit({...userToEdit, fullName: e.target.value})
                                }} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input readOnly={true} type="email" className="form-control" placeholder="Email..." value={userToEdit.email} onChange={(e)=>{
                                    setUserToEdit({...userToEdit, email: e.target.value})
                                }}/>
                            </div>
                            <div className="form-group">
                                <label>Avatar picture:</label>
                                <input type="text" className="form-control" placeholder="Avatar picture url..." value={userToEdit.ava} onChange={(e)=>{
                                    setUserToEdit({...userToEdit, ava: e.target.value})
                                }} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="backcolorBlack">
                        <Button variant="danger" onClick={handleClose2}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={()=>{
                            console.log("userTo Edit");
                            console.log(userToEdit);
                            axios.put(requests.updateUser, userToEdit).then(res=>{
                                setIsAdded(!isAdded);
                                handleClose2();
                            })
                        }}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*end edit modal*/}

                {/*<table className="table-striped table-bordered" style={{width:"100%", alignItems:"center"}}>*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <td>User Id</td>*/}
                {/*        <td>User Full Name</td>*/}
                {/*        <td>User Email</td>*/}
                {/*        /!*<td>User Email</td>*!/*/}
                {/*        <td>Action</td>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}

                {/*    <tbody>*/}
                {/*    {allUsers.map((user1)=>(*/}
                {/*        <tr key={user1.id}>*/}
                {/*            <td>{user1.id}</td>*/}
                {/*            <td>{user1.fullName}</td>*/}
                {/*            /!*<td>{user1.lastName}</td>*!/*/}
                {/*            <td>{user1.email}</td>*/}
                {/*            <td>*/}
                {/*                <div className="d-flex p-1">*/}
                {/*                    <Link className="btn btn-primary" to={`/update-employee/${user1.id}`} onClick={()=>this.editEmployee(user1.id)}>Edit</Link>*/}
                {/*                    <button className="ml-1 btn btn-danger">Delete</button>*/}
                {/*                </div>*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*    ))}*/}
                {/*    </tbody>*/}
                {/*</table>*/}
            </div>
        </div>
    );
}

export default Users_Admin;