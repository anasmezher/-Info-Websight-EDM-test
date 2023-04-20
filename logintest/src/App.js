import  React,{useState} from 'react';
import './App.css';
import {Homepage} from './Homepage/HomePage';
import {LoginForm} from './LoginForm/LoginForm';
function App() {
  const [rendredView,setrendredView] =useState('login');
  setTimeout(function(){
    let mpage = localStorage.getItem("page");
    console.log("mpage",mpage);
    if(mpage&&mpage.length<2){
      setrendredView('login');
    }else{
      setrendredView(mpage);
    }
  },100);
  const changeView=(mView)=>{
    setrendredView(mView);
  }
  return (
    <div className="App">
    {
      rendredView!='Homepage'?<LoginForm  changeView={changeView} />:<Homepage  changeView={changeView}/>
    }
    </div>
  );
}

export default App;
