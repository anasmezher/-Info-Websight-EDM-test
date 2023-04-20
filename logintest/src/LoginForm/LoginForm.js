import React, { useState } from "react";
import "./LoginForm.css";

export class   LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
          input: {},
          errors: "",
          paswrdchecks:[0,0,0,0,0],
          muserName:"",
          muserPass:""
        };
        //accepts minimum of 8 characters with at least 1 uppercase, 1 lowercase, and 1 special character
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleUsernameChange= this.handleUsernameChange.bind(this);
    }
    handleSubmit(event) {
     let passCount = this.state.paswrdchecks.reduce((a, b) => a + b, 0);
     console.log("passCount",passCount); 
     let merror="";
     if(passCount<4){
        merror+="- Check Password";
       } 
       if(this.muserName?.length>=2 ){
        merror+="- Check Username";
       } 
      if(merror==""){
      //// navigate to dashboard
      this.props.changeView("Homepage");
      localStorage.setItem("page", "Homepage");
      localStorage.setItem("username", this.state.muserName);
      localStorage.setItem("mpass", this.state.muserPass);
      //Viewer, Editor
      if(this.state.muserName=="admin"){
        localStorage.setItem("mRole", "Editor");
      }else{
        localStorage.setItem("mRole", "Viewer");
      }
      this.setState({
        errors :""
    });
      }else{
        this.setState({
            errors :merror
        });
      }

    }
    handleUsernameChange(event){
     this.setState(
        {
            muserName:event.target.value
        }
     );
    }
    handleChange(event) {
        console.log("event",event.target.value);
       let mypasswrd = event.target.value;
       this.setState({
        muserPass:mypasswrd
       });
       let mypasswrd_Checks = [0, 0, 0, 0];
       var numUpperCase = mypasswrd.length - mypasswrd.replace(/[A-Z]/g, '').length;  
       var numLowerCase = mypasswrd.length - mypasswrd.replace(/[a-z]/g, '').length;  
       var numSpecialChars = mypasswrd.length - mypasswrd.replace(/[^a-zA-Z0-9]/g, '').length;  
       
       if(mypasswrd.length>=8){
        mypasswrd_Checks[0]=1;
       }else{
        mypasswrd_Checks[0]=0;
       }
       if(numUpperCase>=1){
        mypasswrd_Checks[1]=1;
       }else{
        mypasswrd_Checks[1]=0;
       }
       if(numLowerCase>=1){
        mypasswrd_Checks[2]=1;
       }else{
        mypasswrd_Checks[2]=0;
       }
       if(numSpecialChars>=1){
        mypasswrd_Checks[3]=1;
       }else{
        mypasswrd_Checks[3]=0;
       }
      this.setState(
        {
            paswrdchecks:mypasswrd_Checks
        }
      );
      }
    render() { 
  return (
    <>
      <div className="main page__main">
        <form
          className="login-form main__login-form"
          action="javascript:void(0)"
          method="POST"
        >
          <h3 className="login-form__title">Sign In</h3>
          <label className="login-form__label" htmlFor="uname">
            <span className="sr-only">Username</span>
            <input
              className="login-form__input"
              type="text"
              id="uname"
              name="uname"
             
              onChange={this.handleUsernameChange}
              placeholder="Username"
              required="required"
            />
          </label>
          <label className="login-form__label" htmlFor="psw">
            <span className="sr-only">Password</span>
            <input
              className="login-form__input"
          
              onChange={this.handleChange}
              type="password"
              id="psw"
              name="psw"
              placeholder="Password"
              required="required"
            />
          </label>
          <div className="error">
            <span>{this.state.errors}</span>
            <ul>
                <li className={ this.state.paswrdchecks[0]==1 ? 'passed' : ''}>Minimum of 8 characters </li>
                <li className={ this.state.paswrdchecks[1]==1 ? 'passed' : ''}>At least 1 uppercase </li>
                <li className={ this.state.paswrdchecks[2]==1 ? 'passed' : ''}>At least 1 lowercase </li>
                <li className={ this.state.paswrdchecks[3]==1 ? 'passed' : ''}>At least 1 special character </li>
            </ul>
            </div>
          <button className="primary-btn" type="submit" onClick={this.handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </>
  );
    }
}
