import React from 'react';


export default class AutoCompelteText extends React.Component{
    constructor(props){
      super(props)
        this.items=[
          'David',
          'Damien',
          'Sara',
          'Jane'
        ];
        this.state={
suggestions:[],
text:'',
        };
            }
            
onTextChanged=(e)=>{
    console.log('e before is',e.target.value)
    const {items}=this.props
    const value=e.target.value;
    console.log('e after is',e.target.value)
    let suggestions=[];
    if(value.length>0){
        const regex=new RegExp(`^${value}`,'i');
        suggestions=items.sort().filter(v=>regex.test(v));
    }
  
        this.setState(()=>({suggestions,text:value}))  
}


suggestionSelected(value){
    this.setState(()=>({
        text:value,
        suggestions:[],
    }))
}

renderSuggestions(){
    const{suggestions}=this.state;
    if(suggestions.length===0){
        return null;
    }
    return(
        <ul>
        {suggestions.map((item)=><li onClick={()=>this.suggestionSelected(item)}>{item}</li>)}
        </ul>
    )
}



    render(){
        const{text}=this.state;

    // console.log("props is ",this.props.method)    
    
        return(
            <div className="flex">
            <div className="AutoCompleteText"> 
                <input  placeholder='Search Hotel' value={text} onChange={this.onTextChanged} type="text" className="autotext"></input>
                {this.renderSuggestions()}
            </div>
            <div>
            <button name="hotel" class="btn btn-outline-secondary" value={text} onClick={this.props.method}>
            Search
            </button>
           
            </div>
            
{/* 
            <div class="flex">
   <div>
     <button type="button" class="btn">Delete</button>
   </div>
   <div>
     <div class="input-group">
        <input type="text" class="form-control" value="1" />
        <span class="input-group-addon">Update</span>
     </div>
   </div>
</div> */}
            </div>

        );
    }
}