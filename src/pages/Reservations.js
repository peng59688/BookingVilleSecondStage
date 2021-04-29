import React, { Component } from 'react'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'
import StyledHero from '../components/StyledHero'
import defaultBcg from '../images/room-1.jpeg'
import {Header} from 'semantic-ui-react'
import Calendar from 'react-calendar'
import * as moment from 'moment'
import Title from '../components/Title'
export default class SingleRoom extends Component {
    constructor(props){
super(props)
this.state={
    slug:this.props.match.params.slug,
    reserveCount:1,
    peopleCount:1,
    checkInDate:moment((new Date()), 'DD-MM-YYYY').format().substring(0,10),
    checkOutDate:moment((new Date()), 'DD-MM-YYYY').format().substring(0,10),
    postId:[],
    defaultBcg
}
    }
static contextType=RoomContext;

componentDidMount(){}

//({
//                 "customerId": "testCustomer",
//                 "hotelName": "Hilton Waikiki Beach",
//                 "roomType": "Mountain View Suite",
//                 "checkInDate": "2021-4-23",
//                 "checkOutDate": "2021-4-25",
//                 "reserveCount": 1
//             })

sendData=()=>{
    const{getRoom,currentUser}=this.context;
    console.log("currentUser inside sendData is ",currentUser)
        const room=getRoom(this.state.slug);
        const {name,hotel}=room;
        console.log("inside send data, state is ",this.state)
        console.log("inside send data, hotel is  ",hotel);
        console.log("inside send data, room is  ",name);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({      "customerId": currentUser,
                        "hotelName": hotel,
                        "roomType": name,
                        "checkInDate": this.state.checkInDate,
                        "checkOutDate": this.state.checkOutDate,
                        "reserveCount": this.state.reserveCount
     })
    };
    fetch('https://zmtiry43m6.execute-api.us-west-2.amazonaws.com/v1/query-reservation', requestOptions)
        .then(async response => {
            const data = await response.json();
           
            // display data in UI.
            this.setState({ postId: data })
    
        })
        .catch(error => {
                             this.setState({ errorMessage: error.toString() });
                            console.error('There was an error!', error);
                     });    
}
onChangeCheckIn=(value,event)=>{
const NewDate = moment(value, 'DD-MM-YYYY')
console.log('check in NewDate is ',NewDate.format().substring(0,10));
const checkInDate=NewDate.format().substring(0,10);
this.setState({checkInDate})
}

onChangeCheckOut=(value,event)=>{ 
const NewDate = moment(value, 'DD-MM-YYYY')
console.log('check out NewDate is ',NewDate.format().substring(0,10));
const checkOutDate=NewDate.format().substring(0,10);
this.setState({checkOutDate});
}
changeRooms=(event)=>{
    console.log("roomsbooking are",event.target.value);
    this.setState({reserveCount:event.target.value})
}
changePeople=(event)=>{
    this.setState({peopleCount:event.target.value})
}

// let date=value.getDate() + "-"+ parseInt(value.getMonth()+1) +"-"+value.getFullYear();
// console.log('data is ',date)

    render() {
       
        const{getRoom,currentUser}=this.context
        const room=getRoom(this.state.slug)

        
        if(!room){
            return(<div className="error">
            <h3>no such room could be found...</h3>
            <Link to='/room' className="btn-primary">
                back to rooms
            </Link>
            </div>)
        }
        const {name,images}=room
        return (
            
            <div className=' RoomContainer'>
            {console.log("currentUser inside reservation is   ",currentUser)}
            
             <StyledHero img={images[0]}>
                 <Banner title={`${name}`}>
                 <Link to='/rooms' className='btn-primary'>
                 back to room
                 </Link>
                 </Banner>
             </StyledHero>  
             
             <Title  title="Detail checking"/>
             <div className='flex RoomContainer'> 
             <div className='check-in-calendar'>
             <Header className='calendar-header' icon='calendar' attached color='teal' content='Select Check-in  date'/>
             <Calendar
                 onChange={this.onChangeCheckIn}
                 
             />
             </div>
             <div className='check-out-calendar'>
             <Header className='calendar-header'  icon='calendar' attached color='teal' content='Select Check-out date'/>
             <Calendar
                 onChange={this.onChangeCheckOut}
          
             />
             </div>
             </div>
             
             <div className="form-group people">
            <label htmlFor="size">How many people</label>
            <div className="size-inputs">
                <select onChange={this.changePeople} type="number" name="minSize" id="size"
                   
                    className="size-input center"
                >
                           <option value="1">
1 people
</option>
 <option value="2">
2 people
</option>
 <option value="3">
3 people
</option>
 <option value="4">
4 people
</option>
 <option value="5">
5 people
</option>
 <option value="6">
6 people
</option>
 <option value="7">
7 people
</option>
 <option value="8">
8 people
</option>
 <option value="9">
9 people
</option>
 <option value="10">
10 people
</option>
 <option value="11">
11 people
</option>
                </select>
            </div>
            <label htmlFor="size">How many Rooms</label>
            <div className="size-inputs">
                <select onChange={this.changeRooms} type="number" name="bookingRooms" 
                   
                    className="size-input center"
                >
              <option value="1">
1 room
</option>
 <option value="2">
2 rooms
</option>
 <option value="3">
3 rooms
</option>
 <option value="4">
4 rooms
</option>
 <option value="5">
5 rooms
</option>
 <option value="6">
6 rooms
</option>
 <option value="7">
7 rooms
</option>
 <option value="8">
8 rooms
</option>
 <option value="9">
9 rooms
</option>
 <option value="10">
10 rooms
</option>
 <option value="11">
11 rooms
</option>

                </select>
            </div>
            </div>
             <div className='reserve '>
     <button onClick={this.sendData} className='btn-primary reserve '>
                Confirm
                 </button>
</div >

             </div>
        )
}
}