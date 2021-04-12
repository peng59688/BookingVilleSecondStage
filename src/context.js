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
        hotel:"all"
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
       console.log("rooms are", rooms)
        let featuredRooms=rooms.filter(room=>room.featured===true)
        let maxPrice=Math.max(...rooms.map(item=>item.price))
        let maxSize=Math.max(...rooms.map(item=>item.size))
        
        this.setState(({rooms,featuredRooms,sortedRooms:rooms,loading:false,
        price:maxPrice,maxPrice,maxSize}))
    } catch (error) {
        console.log(error)
    }
}


componentDidMount(){
   this.getData()
   
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
    console.log("tempRooms are",tempRooms);
    const room=tempRooms.find((room)=>room.slug===slug)
    console.log("Rooms are",tempRooms);
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
  <RoomContext.Provider value={{...this.state,getRoom:this.getRoom,handleChange:this.handleChange}}>
 {this.props.children}
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