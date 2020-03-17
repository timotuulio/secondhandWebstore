
import React from 'react';

const Login = ({ }) => (
    <div>
        <form action="http://localhost:3001/api/user" method="post">
            <label for="fname">Email address:</label>
            <input type="text" id="fname" name="name"/>
            <br></br>
            <label for="lname">Password:</label>
            <input type="password" id="lname" name="password"/>
            <br></br>
            <input type="submit" value="Submit"/>
        </form>
        <p>Not signed up? Sign up here!</p>
    </div>
  )


export default Login;