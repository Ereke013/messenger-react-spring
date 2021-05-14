import React, {useState} from 'react';
import {FormControl, IconButton, Input} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import './OneMessage.css';

function OneMessage(){
    const[input, setInput] = useState("");

    return(
        <div className="onemess">
            <div className="onemess__header">
                <h2>Test user</h2>
            </div>
            <div className="onemess__center">

            </div>
            <div className="onemess__bottom">
                <form className="app__form">
                    <FormControl className="app__formControl">
                        {/* <InputLabel>Enter a message...</InputLabel> */}
                        <Input
                            className="app__input"
                            placeholder="Enter a message..."
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                        />
                        <IconButton
                            className="app__iconButton"
                            disabled={!input}
                            variant="contained"
                            type="submit"
                            color="primary"
                            // onClick={sendMessage}
                        >
                            <SendIcon />
                        </IconButton>
                    </FormControl>
                </form>
            </div>
        </div>
    );

}

export default OneMessage;