import React, {useEffect, useState} from "react";
import "./Messages_Admin.css";
import requests from "../../../request";
import axios from "../../../axios";
import {
    FormControl, InputLabel, NativeSelect,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import {Button, Form, Modal} from "react-bootstrap";

function Messages_Admin(props) {
    const [newMessage, setNewMessage] = useState({
        user: {},
        friend: {},
        message_text:"",
        send_time: Date.now()
    });
    const [allUsers, setAllUsers] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const setIsUser = {
        id: 0,
        fullName: "",
        ava: "",
        email: "",
        password: "",
        roles: []
    };


    const setIsUser2 = {
        id: 0,
        fullName: "",
        ava: "",
        email: "",
        password: "",
        roles: []
    }
    const [messageToEdit, setMessageToEdit] = useState({
        id: 0,
        user: {},
        friend: {},
        message_text:"",
        send_time: new Date()
    });
    const [id, setId] = useState(0);

    const [allMessages, setAllFriends] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let request = await axios.get(requests.getAllMessages);
            console.log("req");
            console.log(request.data);
            setAllFriends(request.data);
            console.log("allMessages");
            console.log(allMessages);
        }

        fetchData();
    }, [isAdded]);

    const createMessage = () => {
        console.log("new message");
        console.log(newMessage);
        axios.post(requests.addMessage, newMessage).then(res => {

            setIsAdded(!isAdded);
            setShow(false);
        });
        setNewMessage({user: {}, friend: {},message_text:"", send_time: new Date()});
        const setIsUser = {
            id: 0,
            fullName: "",
            ava: "",
            email: "",
            password: "",
            roles: []
        };
        const setIsUser2 = {
            id: 0,
            fullName: "",
            ava: "",
            email: "",
            password: "",
            roles: []
        };
    }

    async function getToEditMessage(id) {
        let req = await axios.get(requests.getUserToEdit + id);//TODO
        console.log("getToEditPost");
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

    async function handleShow() {
        let allU = await axios.get(requests.getAllUsers);
        console.log("allM");
        console.log(allU.data);
        setAllUsers(allU.data);
        setShow(true);
    }

    async function getUserById(id) {
        let request = {};
        await axios.get(requests.getUserToEdit + id).then((res) => {
            console.log("reqss");
            console.log(res.data);
            request = res.data;
        });

        console.log("request")
        console.log(request)
        return request;
    }

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => {
        setMessageToEdit({...messageToEdit, id: 0,
            user: {},
            friend: {},
            message_text:"",
            send_time: new Date()})
        setShow2(false);
    }
    const handleShow2 = () => {
        console.log("MessageToEdit")
        console.log(messageToEdit)
        setShow2(true);
    }


    return (
        <div className="users__admin">
            <h2 style={{textAlign: "center"}}>Message</h2>
            <div className="row">
                <Button variant="primary" onClick={handleShow}>
                    + Add New Message
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton className="backcolorBlack">
                        <Modal.Title>Add New Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backcolorBlack">
                        <form>
                            <div className="form-group">
                                <Form>
                                    <Form.Group controlId="exampleForm.SelectCustom"
                                                onChange={console.log("form group")}>
                                        <Form.Label>User Sender:</Form.Label>
                                        <Form.Control as="select" custom onChange={(e) => {
                                            console.log("e.target.value");
                                            console.log(e.target.value);
                                            let userById = getUserById(e.target.value).then(res => {
                                                console.log("userById")
                                                console.log(res)
                                                const setIsUser = {
                                                    id: res.id,
                                                    fullName: res.fullName,
                                                    ava: res.ava,
                                                    email: res.email,
                                                    password: res.password,
                                                    roles: res.roles
                                                }
                                                console.log("jai const")
                                                console.log(setIsUser)
                                                setNewMessage({...newMessage, user: setIsUser});
                                                console.log(newMessage);
                                            });
                                        }}>
                                            <option value={null} >--SELECT--</option>
                                            {allUsers.map((user) => {
                                                return (
                                                    <option key={user.id} value={user.id}>{user.fullName}</option>
                                                );
                                            })}
                                            {/*<option>1</option>*/}

                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="form-group">
                                <Form>
                                    <Form.Group controlId="exampleForm.SelectCustom"
                                                onChange={console.log("form group")}>
                                        <Form.Label>User Requester:</Form.Label>
                                        <Form.Control as="select" custom onChange={(e) => {
                                            console.log("e.target.value2");
                                            console.log(e.target.value);
                                            let userByI = getUserById(e.target.value).then(res => {
                                                console.log("userById2")
                                                console.log(res)
                                                const setIsUser2 = {
                                                    id: res.id,
                                                    fullName: res.fullName,
                                                    ava: res.ava,
                                                    email: res.email,
                                                    password: res.password,
                                                    roles: res.roles
                                                }
                                                console.log("set is user2");
                                                console.log(setIsUser2);
                                                setNewMessage({...newMessage, friend: setIsUser2});
                                                console.log(newMessage);
                                            });
                                        }}>
                                            <option value={null} >--SELECT--</option>
                                            {allUsers.map((user) => {
                                                return (
                                                    <option key={user.id} value={user.id}>{user.fullName}</option>
                                                );
                                            })}
                                            {/*<option>1</option>*/}

                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="form-group">
                                <label>Message Text:</label>
                                <input className="form-control" placeholder="Message text..." value={newMessage.message_text} onChange={(e)=>{
                                    setNewMessage({...newMessage, message_text: e.target.value})
                                }} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="backcolorBlack">
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={createMessage}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className="row p-3">

                <Paper style={{width: "100%", borderRadius: "10px"}}>
                    <TableContainer style={{maxHeight: 440, borderRadius: "10px"}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Message ID
                                    </TableCell>
                                    <TableCell>
                                        User Sender
                                    </TableCell>
                                    <TableCell style={{maxWidth: "15%"}}>
                                        User Request
                                    </TableCell>
                                    <TableCell>
                                        Message Text
                                    </TableCell>
                                    <TableCell>
                                        Send Time
                                    </TableCell>
                                    <TableCell>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allMessages.length > 0 ? (allMessages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        console.log("allMessages")
                                        console.log(allMessages)
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                <TableCell>
                                                    {row.id}
                                                </TableCell>
                                                <TableCell>
                                                    {row.user.fullName}
                                                </TableCell>
                                                <TableCell style={{wordBreak: "break-all"}}>
                                                    {row.friend.fullName}
                                                </TableCell>
                                                <TableCell>
                                                    {row.message_text}
                                                </TableCell>
                                                <TableCell>
                                                    {row.send_time}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="d-flex">
                                                        <button onClick={async () => {
                                                            console.log(row.id);
                                                            setId(row.id);
                                                            let request = await axios.get(requests.getMessageById+row.id);
                                                            let userById = getUserById(request.data.user.id).then(res=>{
                                                                console.log("userById2")
                                                                console.log(res)
                                                                const setIsUser = {
                                                                    id: res.id,
                                                                    fullName: res.fullName,
                                                                    ava: res.ava,
                                                                    email: res.email,
                                                                    password: res.password,
                                                                    roles: res.roles
                                                                }
                                                                console.log("jai const")
                                                                console.log(setIsUser)
                                                                getUserById(request.data.friend.id).then(res=>{
                                                                    console.log("userById3")
                                                                    console.log(res)
                                                                    const setIsUser2 = {
                                                                        id: res.id,
                                                                        fullName: res.fullName,
                                                                        ava: res.ava,
                                                                        email: res.email,
                                                                        password: res.password,
                                                                        roles: res.roles
                                                                    }
                                                                    console.log("jai const2")
                                                                    console.log(setIsUser2)
                                                                    // setMessageToEdit({...messageToEdit, friend: setIsUser2});
                                                                    setMessageToEdit({...messageToEdit, id:request.data.id, user: setIsUser, friend: setIsUser2, message_text: request.data.message_text, send_time: request.data.send_time});
                                                                });
                                                            });
                                                            console.log("uje")
                                                            console.log(request.data)
                                                            handleShow2();

                                                        }} className="ml-1 btn btn-primary">Edit
                                                        </button>
                                                        <button onClick={() => {
                                                            console.log(row.id);
                                                            let res = axios.delete(requests.deleteMessage + row.id).then(ress => {
                                                                setIsAdded(!isAdded);
                                                            });
                                                        }} className="ml-1 btn btn-danger">Delete
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }))
                                    :
                                    ("")
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={allMessages.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>

                {/*edit modal*/}
                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton className="backcolorBlack">
                        <Modal.Title>Edit Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backcolorBlack">
                        <form>
                            <div className="form-group">
                                <label>User Sender[not change]:</label>
                                <input type="text" className="form-control" placeholder="Sender..."
                                       value={messageToEdit.user.fullName} readOnly={true}/>
                            </div>
                            <div className="form-group">
                                <label> User Request[not change]:</label>
                                <input type="text" className="form-control" placeholder="Request..."
                                       value={messageToEdit.friend.fullName} readOnly={true}/>
                            </div>
                            <div className="form-group">
                                <label> Message Text:</label>
                                <input type="text" className="form-control" placeholder="Message text..."
                                       value={messageToEdit.message_text} onChange={(e)=>{
                                           setMessageToEdit({...messageToEdit, message_text: e.target.value});
                                }}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="backcolorBlack">
                        <Button variant="danger" onClick={handleClose2}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => {
                            console.log("friend To Edit");
                            console.log(messageToEdit);
                            axios.put(requests.updateMessage, messageToEdit).then(res=>{
                                setIsAdded(!isAdded);
                                handleClose2();
                            })
                        }}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*end edit modal*/}

            </div>
        </div>
    );
}

export default Messages_Admin;