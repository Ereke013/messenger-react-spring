import React from "react";
import {useRouteMatch} from "react-router";

function Edit_Users_Admin(props) {
    console.log(props.match);
    return(
        <div className="edit__users backcolorBlack">
            <h2 className="text-center">Edit User</h2>
            <div className="row">
                <div className="col-6 offset-3">

                </div>
            </div>
        </div>
    );
}

export default Edit_Users_Admin;