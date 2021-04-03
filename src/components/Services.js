import React, { Component } from 'react'
import {BsAwardFill,BsFillEyeFill,BsFillBarChartFill} from "react-icons/bs"
import Title from './Title'
export default class Services extends Component {
    state={services:[
        {
            icon:<BsAwardFill/>,
            title:"User-friendly Interface",
            info:"It will enable users to easily navigate to their desirable page and find out the price or availability information within a short time. It will also load fast on all devices to save users’ time. "
        },
        {
            icon:<BsFillEyeFill/>,
            title:"Comprehensive search engine",
            info:"We offer various preference options for customers so that they can find their desirable rooms in a short time and it will help customers filter those unwanted rooms."
        },
        {
            icon:<BsFillBarChartFill/>,
            title:"Visualization",
            info:"Enable customers to directly see the location of the hotel from the google map in our website so that they can determine whether the situation is suitable for them"
        }
    ]}
    render() {
        return (
            <section className="services">
                <Title title="services"/>
                <div className="services-center">
                 {this.state.services.map((item,index)=>{
                     return <article key={index} className="service">
                    <span className="icon">{item.icon}</span>
                    <h6>{item.title}</h6>
                    <p>{item.info}</p>
                     </article>

                 })}
                 </div>
            </section>
        )
    }
}
