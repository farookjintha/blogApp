import React, { useState } from 'react';
import {Link, Redirect } from 'react-router-dom';
import moment from 'moment';

import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelper';


const Card = ({blog, 
                showReadBlogButton = true, 
                showSaveButton = true, 
                cartUpdate = false, 
                showRemoveFromSaveButton = false,
                setRun = f => f,
                run = undefined}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(blog.count);

    const showViewButton = () => {
        return(
            showReadBlogButton && (
                <Link to={`/blog/${blog._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        Read Blog
                    </button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(blog, () => {
            setRedirect(true);
        })
    }

    const shouldRedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (showSaveButton) => {
        return showSaveButton && (
            <button className="btn btn-outline-warning mt-2 mb-2" onClick={addToCart}>
                    Save Blog
            </button>
        )
    }

    const showRemoveButton = (showRemoveFromSaveButton) => {
        return showRemoveFromSaveButton && (
            <button 
                onClick={() => {
                    setRun(!run);
                    removeItem(blog._id);
                     // run useEffect in parent Cart
                }}

                className="btn btn-outline-danger mt-2 mb-2" >
                    Remove from Saved
            </button>
        )
    }

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
            ) : (
            <span className="badge badge-primary badge-pill">Out Of Stock</span>
            )
    }

    const handleChange = productId => event => {
        console.log("Value: ", event.target.value);
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        console.log("Count: ", count)
        if(event.target.value >= 1){
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(blog._id)} />
            </div>
        </div>
    }


    return (
        
            <div className="card">
                <div className="card-header name">{blog.title}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={blog} url="blog" />
                    <p className = "lead mt-2">{blog.body.substring(0, 100)}</p>
                    {/* <p className="black-9">Rs. {product.price}</p> */}
                    {/* <p className="black-8">Category: {blog.genre && blog.category.name}</p> */}
                    <p className="black-8">Added {moment(blog.createdAt).fromNow()}</p>

                        {/* {showStock(blog.quantity)} */}
                    
                        {showViewButton(showReadBlogButton)}

                        {showAddToCart(showSaveButton)}

                        {showRemoveButton(showRemoveFromSaveButton)}

                        {/* {showCartUpdateOptions(cartUpdate)} */}
                </div>
            </div>
        
    )
}

export default Card;