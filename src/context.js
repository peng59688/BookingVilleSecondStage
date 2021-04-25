import React, { Component } from 'react'
// import items from "./data"
import Client from './Contentful'


const RoomContext=React.createContext();

 class RoomProvider extends Component {
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
        type:'all',
        capacity:1,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false,
        hotel:"all",
        postId:[],
        currentUser:null

    }
//getData
getData=async()=>{
    try {
        let response=await Client.getEntries({skip:0, limit: 300, content_type:"bookingVille"
    });
    //order:"fields.price"
        // console.log("response.items are", response.items)// convert response from an object to
        //an array
        let rooms=this.formatData(response.items)
       
        let featuredRooms=rooms.filter(room=>room.featured===true)
        let maxPrice=Math.max(...rooms.map(item=>item.price))
        let maxSize=Math.max(...rooms.map(item=>item.size))
        
        this.setState(({rooms,featuredRooms,sortedRooms:rooms,loading:false,
        price:maxPrice,maxPrice,maxSize}))
    } catch (error) {
        console.log(error)
    }
}
//get Currentuser
getCurrentUser=()=>{
    const url=window.location.href;
     var index=url.indexOf("#id_token=");
    // var index=url.indexOf("lo")
   
   if(index!==-1){
 const currentToken=url.substring(index+10,url.length)
 this.setState({currentUser:currentToken})
 ;}
 
}


componentDidMount(){
   this.getData();
   this.getCurrentUser();
   const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomType: "Mountain View Suite",
    hotelName: "Hilton Waikiki Beach", })
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
 
// 1.
// const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//                 "customerId": "testCustomer",
//                 "hotelName": "Hilton Waikiki Beach",
//                 "roomType": "Mountain View Suite",
//                 "checkInDate": "2021-4-23",
//                 "checkOutDate": "2021-4-25",
//                 "reserveCount": 1
//             })
// };

// fetch('https://zmtiry43m6.execute-api.us-west-2.amazonaws.com/v1/reserve', requestOptions)
//     .then(async response => {
//         // check for error response
//                 if (!response.ok) {
//                         // get error message from body or default to response status
//                         const error = (data && data.message) || response.status;
//                         return Promise.reject(error);
//                 }
//                 // succeeded
//                 const data = await response.json();
//                 // display data in UI.
//                 this.setState({ postId: data })
//                 // ...

//         })
//         .catch(error => {
//                 this.setState({ errorMessage: error.toString() });
//                 console.error('There was an error!', error);
//         });    


// const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ title: 'React POST Request Example' })
// };
// fetch('https://reqres.in/api/posts', requestOptions)
//     .then(async response => {
//         const isJson = response.headers.get('content-type')?.includes('application/json');
//         const data = isJson && await response.json();

//         // check for error response
//         if (!response.ok) {
//             // get error message from body or default to response status
//             const error = (data && data.message) || response.status;
//             return Promise.reject(error);
//         }

//         this.setState({ postId: data.id })
//     })
//     .catch(error => {
//         this.setState({ errorMessage: error.toString() });
//         console.error('There was an error!', error);
//     });






// fetch('https://reqres.in/api/posts')
// .then(response => response.json())
// .then(data => this.setState({ postId: data }));
   
}



formatData(items){
    let tempItems=items.map(item=>{
        let id=item.sys.id
        let images=item.fields.images.map(image=>image.fields.file.url);
        let room={...item.fields,images,id}
        return room;
    });
    return tempItems
}
getRoom=(slug)=>{
    let tempRooms=[...this.state.rooms];
 
    const room=tempRooms.find((room)=>room.slug===slug)
    
    return room;
}

handleChange=event=>{
    const target=event.target
    console.log("target type is ", target.type);
    const value=target.type==='checkbox'?target.checked:target.value
     console.log("value is ", value);
    const name=event.target.name
      console.log("name is ",name);
    
    this.setState({[name]:value},this.filterRooms)
}
signOut=()=>{
    this.setState({currentUser:null})
}

filterRooms=()=>{
    let{rooms,type,capacity,price,minSize,maxSize,breakfast,pets,hotel}=this.state;
    let tempRooms=[...rooms]
    // console.log("this.state is  ", this.state)
    //transform value
    capacity=parseInt(capacity)
    price=parseInt(price);
  //filter by search bar


    //filter by type
    if(type!=='all'){
       tempRooms=tempRooms.filter(room=>room.type===type)
    }
   
     //filter by capacity
     if(capacity!==1){
        tempRooms=tempRooms.filter(room=>room.capacity>=capacity)
    }
     //filter by hotel
    if(hotel!=='all'){
        tempRooms=tempRooms.filter(room=>room.hotel===hotel)
    }
    //filter by price
     tempRooms=tempRooms.filter(room=>room.price<=price);
     //filter by size
    tempRooms=tempRooms.filter(room=>room.size>=minSize&&room.size<=maxSize)
    //filter by breakfast
    if(breakfast){
        tempRooms=tempRooms.filter(room=>room.breakfast===true)
    }
    //filter by pets
    if(pets){
        tempRooms=tempRooms.filter(room=>room.pets===true)
    }


    //change state
    this.setState({
        sortedRooms:tempRooms
            })
}

   

    render() {
        return (
            
  <RoomContext.Provider value={{...this.state,getRoom:this.getRoom,handleChange:this.handleChange,signOut:this.signOut}}>
 {this.props.children}
 {console.log("the data is ",this.state.postId)}
 {console.log("error message is,",this.state.errorMessage)}

 </RoomContext.Provider>
        )
    }
}
const RoomConsumer=RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
        {value=><Component {...props} context={value}/>}
        </RoomConsumer>
    }
}


export {RoomProvider,RoomConsumer,RoomContext}