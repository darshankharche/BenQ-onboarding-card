

import './App.css';
import React from 'react'
import SubCard from './Components/Card1';
import Toggler from './Components/Toggler';
export default function App() {
  const [userData,setUserData] = React.useState({
    fullName:"",
    displayName:"",
    workspaceName:"",
    workspaceUrl:"",
    usingFor:""

  }) 
  const [selected, setSelected]=React.useState(1)
  const [isDataFilled,setIsDataFilled] = React.useState([1])
  const [visited,setVisited] = React.useState([1])
  let subCard 
  let errorDisplay  
  
  if(selected === 1){
    subCard = <SubCard 
      header="Welcome! First thing first..."
      para="You can always change them later"
    >
      <form className='form'>
        <label>Full Name
          <input onChange={(e)=>{addUserData(e)}} value={userData.fullName} type="text" name="fullName" placeholder='Steve Jobs'/>
        </label>
        <label>Display Name
          <input onChange={(e)=>{addUserData(e)}} value={userData.displayName} type="text" name="displayName" placeholder='Steve' />
        </label>
        <button onClick={e=>{handleNextButton(e,2)}}>Next</button>
      </form>
    </SubCard>
  }else if(selected === 2){
    subCard =  <SubCard 
          header="Let's set up a home for all your work"
          para="You can always create another workspace later"
        >
          <form className='form'>
            <label>Workspace Name
              <input onChange={(e)=>{addUserData(e)}} value={userData.workspaceName} type="text" name="workspaceName" placeholder='Boss'/>
            </label>
            <label>Workspace Url
              <input onChange={(e)=>{addUserData(e)}} value={userData.workspaceUrl} type="text" name="workspaceUrl" placeholder='Example' />
            </label>
            <button onClick={e=>{handleNextButton(e,3)}}>Next</button>
          </form>
        </SubCard>
  }else if(selected === 3){
    subCard = <SubCard 
          header="How are you planning to use Eden?"
          para="We'll streamline your setup experience accordingly."
        >
          <form className='form'>
            <div className="team-cards">
              <div onClick={()=>handleTeamCard('user')} id='team-card-user' className={`team-type ${userData.usingFor === 'self' && 'selected'}`}>
                <i className="fa-solid fa-user"></i>
                <h3>For Myself</h3>
                <p>Write better. Think more clearly. Stay organized.</p>
              </div>
              <div onClick={()=>handleTeamCard('users')} id='team-card-users' className={`team-type ${userData.usingFor === 'team' && 'selected'}`}>
                <i className="fa-solid fa-users"></i>
                <h3>With my team</h3>
                <p>Wikis, docs, tasks & projects, all in one place.</p>
              </div>
            </div>            
            <button onClick={e=>{handleNextButton(e,4)}} >Next</button>
          </form>
        </SubCard>
  }else if(selected === 4){
    subCard = <SubCard 
    header={`Congratulations,${userData.displayName}!`}
    para="You have completed onboarding, you can start using the CutShort!"
  >
    <form className='form'>                      
      <button onClick={e=>{handleLaunch(e)}}>Launch Cutshort</button>
    </form>
  </SubCard>
  }

  
  function addUserData(e){
    const {name,value} = e.target
    setUserData(prevData=>{
      return{
        ...prevData,
        [name]:value
      }
    })
  }

  function handleToggler(position){
    
      if(visited.includes(position)){
        setSelected(position)
        const togglerId = document.querySelector(`#toggler-${position}`).classList
        !togglerId.contains('toggler-selected') && togglerId.add('toggler-selected')
      }else{
        alert("please complete the data first")
      }
    
    
  }

  function handleNextButton(e,nextTabNo){
    e.preventDefault()
    let isFilled = false
    if(nextTabNo === 2){
      if(!(userData.fullName && userData.displayName)){
        alert("Please fill complete data")        
      }else{
        isFilled= true
        setIsDataFilled(prevData=>{
          return [...prevData,0]
        })
      }
    }else if(nextTabNo === 3){
      if(!(userData.workspaceName && userData.workspaceUrl)){
        alert("Please fill complete data")        
      }else{
        isFilled= true
        setIsDataFilled(prevData=>{
          return [...prevData,1]
        })
      }
    }else if(nextTabNo === 4){
      if(!(userData.usingFor)){
        alert("Please fill complete data")
      }else{
        isFilled= true
        setIsDataFilled(prevData=>{
          return [...prevData,2]
        })
      }
    }
    if(isFilled){
      setSelected(nextTabNo)
      setVisited(prevState=>{
        return [...prevState,nextTabNo]
      })
      const togglerId = document.querySelector(`#toggler-${nextTabNo}`).classList
      !togglerId.contains('toggler-selected') && togglerId.add('toggler-selected')
    }
      
    
    
  }

  function handleTeamCard(userType){
    const allTeamCards = document.querySelectorAll('.team-type')
    for(let teamCard of allTeamCards){
      teamCard.classList.remove('selected')
    }
    document.querySelector(`#team-card-${userType}`).classList.add('selected')
    setUserData(prevState=>{
      return{
        ...prevState,
        usingFor: userType === "user" ? "self" : "team"
      }
    })
  }
  console.log(isDataFilled)

  function handleLaunch(e){
    e.preventDefault()
  }


  return (
    <div className="App">
      <div className='onboarding-card'>
        <div className='logo'>
          <img src='./images/cutshort-logo.png' alt='./images/cutshort-logo.png' />
          <h1>CutShort</h1>
        </div>
        <Toggler handleToggler={handleToggler} />
        {subCard}
        {errorDisplay}
      </div>
    </div>
  );
}