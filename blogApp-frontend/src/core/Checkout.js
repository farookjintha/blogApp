import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import {getProducts} from './apiCore';
import { isAuthenticated } from '../auth'
import { Link, Switch } from 'react-router-dom';


const showCheckout = () => {
    return isAuthenticated() ? (
        <button className="btn btn-success">Checkout</button>
    ) : (
        <Link to="/signin">
            <button className="btn btn-primary">Sign-in to checkout</button>
        </Link>
    )
}



const Checkout = ({ products }) => {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    }

    return <div>
        <h2>Total: Rs. {getTotal()}</h2>
        {showCheckout()}
    </div>
};


export default Checkout;