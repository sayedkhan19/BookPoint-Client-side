import React from 'react';
import NavBar from '../Home/NavBar';
import Footer from '../Home/Footer';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
           
            <main>
                <Outlet></Outlet>
            </main>
           
            <Footer></Footer>
        </div>
    );
};

export default Root;