import React, { Component } from 'react'
import {FaCocktail} from "react-icons/fa"
import Title from './Title'
import Elaine from "../images/profile1.jpeg"
import JiaYu from "../images/profile2.jpeg";
import Chris from "../images/profile3.jpeg";
import Jack from "../images/profile4.jpeg";
export default class Services extends Component {
    state={services:[
        {
            icon:<FaCocktail/>,
            title:"free cocktails",
            info:"lreoan eanei eaoneoa eanoi eanoi feanio einf eanfenaiofea.,feanioa"
        },
        {
            icon:<JiaYu/>,
            title:"Endless Hiking",
            info:"lreoan eanei eaoneoa eanoi eanoi feanio einf eanfenaiofea.,feanioa"
        },
        {
            icon:<Chris/>,
            title:"Free shuttle",
            info:"lreoan eanei eaoneoa eanoi eanoi feanio einf eanfenaiofea.,feanioa"
        },
        {
            icon:<Jack/>,
            title:"Strongest Beer",
            info:"lreoan eanei eaoneoa eanoi eanoi feanio einf eanfenaiofea.,feanioa"
        }
    ]}
    render() {
        return (
            <section className="services">
                <Title title="Designers"/>
                <div className="services-center">
                <div className="img-container ">
                <img src={JiaYu} alt={this.state.services.title }
          style={{
          borderRadius: "50%",
          background: "red",
          width: 200,
          height: 200,
          position:"relative",
          margin:"auto"
          
        }}
                />
                 <h2>Elaine</h2>
                </div>
                <div className="img-container">
                <img src={Elaine} alt={this.state.services.title}
                     style={{
          borderRadius: "50%",
          background: "red",
          width: 200,
          height: 200,
          margin:"auto"

        }} 
                />
                 <h2>Chris</h2>
                </div>
                <div className="img-container">
                <img src={Chris} alt={this.state.services.title}
            style={{
          borderRadius: "50%",
          background: "red",
          width: 200,
          height: 200,
          margin:"auto"
        }} 
                />
                <h2>Jiayu</h2>
                
                </div>
                <div className="img-container">
                <img src={Jack} alt={this.state.services.title}
         style={{
          borderRadius: "50%",
          background: "red",
          width: 200,
          height: 200,
          margin:"auto"
        }} 
                />
                <h2>Jack</h2>
                 </div>
                 </div>
            </section>
        )
    }
}
