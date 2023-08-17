import React, { useState } from "react";
import axios from "axios";


const Form = () => {
    const [users, setUsers] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const firstName = e.target.firstName.value;
        const surName = e.target.surName.value;
        const age = e.target.age.value;
        console.log(`İsim: ${firstName} ${surName}`);
        console.log(`Yaş: ${age}`);
        const user = {
            firstName,
            surName,
            age
        };
        axios.post("http://localhost:5000/user", user).then(response => {
            axios.get("http://localhost:5000/user").then(response => {
                setUsers(response.data);
            })
        });

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="firstName" type="text" />
                <input name="surName" type="text" />
                <input name="age" min={0} type="number" />
                <button type="submit">Submit</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((data) => {
                            return <tr key={data.id}>
                                <td>{data.firstName}</td>
                                <td>{data.surName}</td>
                                <td>{data.age}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>

    )
}

export default Form;