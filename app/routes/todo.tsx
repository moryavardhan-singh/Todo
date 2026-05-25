'use client';
import { useState } from "react";

const Todo = () => {
    //let count=0
    const [loginDetails,setLoginDetails] = useState({Fullname:"" , Password:""});
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    function handleChange(e:any) {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        // let obj = {a:"a",b:"b"}
        setLoginDetails({
            ...loginDetails,
            [fieldName]:fieldValue
        })
        console.log(e.target.name);
        if (e.target.name === 'Fullname') {
            setName(e.target.value);
        } else if (e.target.name === 'Password') {
            setPassword(e.target.value);
        }
    }
    return (
        <div className="text-3xl text-center mt-10">
            <form >
                <input className="border block mx-auto py-4 px-8 "
                    type="text" name="Fullname"
                    placeholder="Enter Name"
                    value={loginDetails.Fullname}
                    onChange={handleChange} />
                <input className="border block mx-auto py-4 px-8"
                    type="password" name="Password"
                    placeholder="Enter Password"
                    value={loginDetails.Password}
                    onChange={handleChange} />
                <button className="border mx-auto py-1 px-2">Login</button>
            </form>
        </div>
    )
}
export default Todo