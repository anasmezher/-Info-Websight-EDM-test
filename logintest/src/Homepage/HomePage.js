 
import React, { useState } from "react";
import "./Homepage.css";
export class   Homepage extends React.Component {
 
 
    constructor() {
        super();
        this.state = {
          input: {},
          errors: "",
          mData:{},
          mrole:"Viewer",
          tableHeadData: [{
           key:"id",
           name:"ID"
          },{
            key:"full_name",
            name:"Fulll name"
           },{
            key:"email",
            name:"Email"
           },{
            key:"gender",
            name:"Gender"
           },{
            key:"age",
            name:"Age"
           }],
          tableData: [],
          AlltableData: []
        };
 
       /////https://anasmezher.com/randomlist.php
      
    }
    componentDidMount() {
        this.getData = this.getData.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.serachNow=this.serachNow.bind(this);
        setTimeout(()=>{
            var mrole =  localStorage.getItem("mRole");
             this.setState({
                mrole:mrole
             });
             this.getData();
          }, 200);
          
   }
   serachNow=(event)=>{
    var searchQuery=event.target.value;
    if(searchQuery.length>3){
        const filteredData = this.state.tableData.filter(item => {
            const fullName = item.full_name.toLowerCase();
            const email = item.email.toLowerCase();
            const gender = item.gender.toLowerCase();
            const id = item.id;
            const age = item.age;
            return (fullName.includes(searchQuery.toLowerCase())
            ||email.includes(searchQuery.toLowerCase())
            ||gender.includes(searchQuery.toLowerCase())  
            
            );
          });
          this.setState(
            {
                tableData:filteredData
            }
         )
    }else{
     this.setState(
        {
            tableData:this.state.AlltableData
        }
     )
    }
 
   }
      async getData(){
        console.log("getData");
        var vx= Math.floor(Math.random() * 1033);
        const data = await (
            await fetch(
              "https://anasmezher.com/randomlist.php?x="+vx
            ) .then(response => response.json())
            .then(jsonData =>
                this.setState({
                    tableData: jsonData,
                    AlltableData: jsonData
                  })
                )
            .catch(error => console.error('Error fetching data:', error))
          );
 
      }
      handleLogout =(event)=>{
        localStorage.setItem("page", "login");
        localStorage.setItem("username", "");
        localStorage.setItem("mpass", "");
        localStorage.setItem("mRole", "");
        this.props.changeView("login");
    }

    
      handleSort = (sortField) => {
        if (sortField) {
         const sorted = [...this.state.AlltableData].sort((a, b) => {
          if (a[sortField] === null) return 1;
          if (b[sortField] === null) return -1;
          if (a[sortField] === null && b[sortField] === null) return 0;
          return (
           a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
           }) 
          );
         });
         this.setState(
            {tableData:sorted}
         );
        }
       };
   render(){

      return(
        <>
        <span className="viewAs">You are viewing as: {this.state.mrole}</span>
        <button className="logoutbutton" onClick={this.handleLogout}>Logout</button>
        <input className="searchbbutton" type="text" placeholder="search" onChange={this.serachNow}/>
        <div className="sortableTableWrap">
        <table className="sortableTable">
        <thead>
            <tr>
                {this.state.tableHeadData.map(({ key, name }) => {
                return <th key={key} onClick={() => this.handleSort(key)}> {name} </th>;
                })}
            </tr>
            </thead>
            <tbody>
            {this.state.tableData.map(({  id,  full_name ,  email , gender , age}) => {
                return   <tr key={id} >
                    <td> {id} </td>
                    <td> {full_name} </td>
                    <td> {email} </td>
                    <td> {gender} </td>
                    <td> {age} </td>
                </tr>
                ;
                })}
            </tbody>
        </table>
        </div>
        </>
      );


   }



  }