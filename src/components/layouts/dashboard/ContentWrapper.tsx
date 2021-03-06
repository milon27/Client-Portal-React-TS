import React from 'react'
import Header from '../Header'
import Footer from './../Footer';
import { iMain } from './Main';


export default function ContentWrapper({ children, title }: iMain) {
    return (
        <div id="content-wrapper" className="d-flex flex-column bg-white">
            <div id="content">
                {/*Topbar*/}
                <Header title={title} />
                {/* main content */}
                <div className="container-fluid">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}