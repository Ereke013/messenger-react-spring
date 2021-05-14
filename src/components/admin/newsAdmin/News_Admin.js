import React, {useEffect, useState} from "react";
import "./News_Admin.css";
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
import {Button, Form, Modal} from "react-bootstrap";

function News_Admin(props){
    const [newPost, setNewPost]=useState({
        postTitle:"",
        postObject:"",
        posterUser:{},
        postDate: Date.now()
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


    const [postToEdit, setPostToEdit] = useState({
        id: 0,
        postTitle:"",
        postObject:"",
        posterUser:{},
        postDate: Date.now()
    });
    const [id, setId] = useState(0);

    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let request = await axios.get(requests.news);
            console.log("req");
            console.log(request.data);
            setAllPosts(request.data);
            console.log("allPosts");
            console.log(allPosts);
        }

        fetchData();
    }, [isAdded]);

    const createMessage = () => {
        console.log("new post");
        console.log(newPost);
        axios.post(requests.addPost, newPost).then(res => {

            setIsAdded(!isAdded);
            setShow(false);
        });
        setNewPost({postTitle:"",
            postObject:"",
            posterUser:{},
            postDate: Date.now()});
        const setIsUser = {
            id: 0,
            fullName: "",
            ava: "",
            email: "",
            password: "",
            roles: []
        };
    }

    async function getToEditPost(id) {
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
        console.log("allP");
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
        setPostToEdit({...postToEdit, id: 0,
            postTitle:"",
            postObject:"",
            posterUser:{},
            postDate: Date.now()});
        setShow2(false);
    }
    const handleShow2 = () => {
        console.log("PostToEdit")
        console.log(postToEdit)
        setShow2(true);
    }


    return (
        <div className="users__admin">
            <h2 style={{textAlign: "center"}}>Posts</h2>
            <div className="row">
                <Button variant="primary" onClick={handleShow}>
                    + Add New Post
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton className="backcolorBlack">
                        <Modal.Title>Add New Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backcolorBlack">
                        <form>
                            <div className="form-group">
                                <label>Post Title:</label>
                                <input className="form-control" placeholder="Post title..." value={newPost.postTitle} onChange={(e)=>{
                                    setNewPost({...newPost, postTitle: e.target.value})
                                }} />
                            </div>
                            <div className="form-group">
                                <label>Post Object[photo, gif]:</label>
                                <input className="form-control" placeholder="url object..." value={newPost.postObject} onChange={(e)=>{
                                    setNewPost({...newPost, postObject: e.target.value})
                                }} />
                            </div>
                            <div className="form-group">
                                <Form>
                                    <Form.Group controlId="exampleForm.SelectCustom"
                                                onChange={console.log("form group")}>
                                        <Form.Label>User Poster:</Form.Label>
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
                                                setNewPost({...newPost, posterUser: setIsUser});
                                                console.log(newPost);
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
                                        Post ID
                                    </TableCell>
                                    <TableCell>
                                        Post Title
                                    </TableCell>
                                    <TableCell style={{maxWidth: "15%"}}>
                                        Post Object
                                    </TableCell>
                                    <TableCell>
                                        User Sender
                                    </TableCell>
                                    <TableCell>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allPosts.length > 0 ? (allPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        console.log("allPosts")
                                        console.log(allPosts)
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                <TableCell>
                                                    {row.id}
                                                </TableCell>
                                                <TableCell>
                                                    {row.postTitle}
                                                </TableCell>
                                                <TableCell style={{wordBreak: "break-all"}}>
                                                    {row.postObject}
                                                </TableCell>
                                                <TableCell>
                                                    {row.posterUser.fullName}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="d-flex">
                                                        <button onClick={async () => {
                                                            console.log(row.id);
                                                            setId(row.id);
                                                            let request = await axios.get(requests.getUserNews+row.id);
                                                            let userById = getUserById(request.data.posterUser.id).then(res=>{
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
                                                                setPostToEdit({...postToEdit, id:request.data.id, postTitle: request.data.postTitle, postObject: request.data.postObject, posterUser: setIsUser});
                                                            });
                                                            console.log("uje")
                                                            console.log(request.data)
                                                            handleShow2();

                                                        }} className="ml-1 btn btn-primary">Edit
                                                        </button>
                                                        <button onClick={() => {
                                                            console.log(row.id);
                                                            let res = axios.delete(requests.deletePost + row.id).then(ress => {
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
                        count={allPosts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>

                {/*edit modal*/}
                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton className="backcolorBlack">
                        <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="backcolorBlack">
                        <form>
                            <div className="form-group">
                                <label>Post Title:</label>
                                <input type="text" className="form-control" placeholder="Post title..."
                                       value={postToEdit.postTitle} onChange={(e)=>{
                                           setPostToEdit({...postToEdit, postTitle: e.target.value})
                                }}/>
                            </div>
                            <div className="form-group">
                                <label>Post Object:</label>
                                <input type="text" className="form-control" placeholder="Post object..."
                                       value={postToEdit.postObject} onChange={(e)=>{
                                    setPostToEdit({...postToEdit, postObject: e.target.value})
                                }}/>
                            </div>
                            <div className="form-group">
                                <label> Poster User[not change]:</label>
                                <input type="text" className="form-control" placeholder="sender..."
                                       value={postToEdit.posterUser.fullName} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="backcolorBlack">
                        <Button variant="danger" onClick={handleClose2}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => {
                            console.log("friend To Edit");
                            console.log(postToEdit);
                            axios.put(requests.updatePost, postToEdit).then(res=>{
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

export default News_Admin;