import React, { Component } from 'react'
import Header from '../../components/header/Header'
import Content from '../../components/content/Content'
import Footer from '../../components/footer/Footer'
import './Home.css'


export class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="gradient">
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Home
