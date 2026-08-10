import { useRef, useState, useEffect} from "react";

const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register(){
    return(
        <register>
            <div>
                <form action="">
                    <label htmlFor="username">Username: </label>
                    <input type="username" placeholder="Enter a username"/>
                    <label htmlFor="password">Password: </label>
                    <input type="password" placeholder="Enter a password"/>
                </form>
            </div>
        </register>
    );
}

export default Register