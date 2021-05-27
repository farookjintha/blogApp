import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {createGenre} from '../apiBlog';

const AddGenre = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //Destructure user and token from localstorage
    const {user, token} = isAuthenticated();
    // console.log("Token",token);

    const handleChange = (e) =>{
        setError('');
        setName(e.target.value);
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        createGenre(user._id, token, {name}).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setError('');
                setSuccess(true);
            }
        });

    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name of the Genre</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
            </div>
            <button className="btn btn-outline-primary">Create Genre</button>
        </form>
    )

    const showSuccess = () => {
        if(success){
        return <h3 className="text-success">Genre is created successfully!</h3>
        }
    }

    const showError = () => {
        if(error){
            return <h3 className="text-danger">{name} already exists!</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to dashboard</Link>
        </div>
    );


    return(
        <Layout title="Add a new category" description={`Hello, ${user.name}! Do you wanna add a new genre?`} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
            
        </Layout>
    )

}

export default AddGenre;