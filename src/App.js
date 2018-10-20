import React, { Component } from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Pomodoro />
      </div>
    );
  }
}

class Pomodoro extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      breakTime : 5,
      sessionTime : 25,
      restFlag: false,
      timer : 25 * 60 ,
      started: false,
    }
    this.interval = null;
    this.url = 'http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3';
    this.audio = new Audio(this.url);

   
    this.handleClickBreakDecrement = this.handleClickBreakDecrement.bind(this);
    this.handleClickBreakIncrement = this.handleClickBreakIncrement.bind(this);
    this.handleClickSessionDecrement = this.handleClickSessionDecrement.bind(this);
    this.handleClickSessionIncrement = this.handleClickSessionIncrement.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleClickBreakDecrement() {
    this.setState( prevState => ({
      breakTime : Math.max(prevState.breakTime - 1, 1)
      
    }));
  }

  handleClickBreakIncrement() {
    this.setState(prevState => ({
      breakTime : Math.min(prevState.breakTime + 1 , 60)
    }))
  }

  handleClickSessionDecrement() {
    this.setState(prevState => ({
      sessionTime : Math.max(prevState.sessionTime - 1, 1),
      timer : Math.max(((prevState.sessionTime - 1) * 60), 1 * 60)
    }))
  }

  handleClickSessionIncrement() {
    this.setState(prevState => ({
      sessionTime : Math.min(prevState.sessionTime + 1, 60),
      timer : Math.min(((prevState.sessionTime + 1) * 60), 50 * 60)
    }))
  }


  
    handleStart() {
    if(this.state.started ===  false ){
      
      this.interval = setInterval(() => {
        if(this.state.timer <= 0){
          this.setState({
            restFlag: !this.state.restFlag,
            timer: (this.state.restFlag? this.state.sessionTime * 60: this.state.breakTime * 60),
   
          })
          this.audio.play()
        } 
        
        this.setState(prevState => ({
           timer: prevState.timer - 1
          })
        );
      }, 1000)

      this.setState({
        started: true
      })
    }else {
      clearInterval(this.interval)
    this.setState({
      started: false,
    })
    }
  
    }
  

handleReset() {
  clearInterval(this.interval)
  this.setState({
    timer: 25 * 60,
    started: false,
    breakTime: 5,
    sessionTime: 25,
  })
}


  render() {

    let timer =   parseFloat(this.state.timer) 

    function convertToMinutesAndSeconds(sec) {
      var minutes = Math.floor(sec / 60);
      var seconds = (sec % 60).toFixed(0);
      return ( minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }   

    return (
      <div className="tomato-background">
          <div className="Pomodoro">
            <BreakTime 
              breakTime={this.state.breakTime} 
              breakDecrement={this.handleClickBreakDecrement} 
              breakIncrement={this.handleClickBreakIncrement}
            />
            <SessionTime 
              sessionTime={this.state.sessionTime} 
              sessionDecrement={this.handleClickSessionDecrement} 
              sessionIncrement={this.handleClickSessionIncrement}
            />
          </div>
          <div className="Timer">
             <StartStop 
              timer={convertToMinutesAndSeconds(timer)}
              handleStart={this.handleStart}
              handleStop={this.handleStop}
              handleReset={this.handleReset}
              coundtdown={this.state.timer}
               restFlag= {this.state.restFlag}
               togglePlay={this.togglePlay}
               started={this.state.started}
              />
          </div>
       
      </div>
    );
  }
}


















const BreakTime = (props) => {
 
  return (
    <div className="breakTime">
      <h2 id="break-label"> Break Length </h2>
      <div id="button">
        <button id="break-decrement" onClick={props.breakDecrement}>
        <i class="fas fa-minus"></i>
        </button>
            <p id="break-length"> {props.breakTime} </p>
        <button id="break-increment" onClick={props.breakIncrement} >          
        <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
  )
}

const SessionTime = (props) => {

  return (
    <div className="sessionTime">
    <h2 id="session-label"> Session Length </h2>
      <div id="button" >
      <button 
        id="session-decrement" 
        onClick={props.sessionDecrement} 
      >
          <i class="fas fa-minus"></i>
      </button>
              <p id="session-length"> {props.sessionTime} </p>
      <button 
        id="session-increment" 
        onClick={props.sessionIncrement} 
       >
          <i class="fas fa-plus"></i>
      </button>
      </div>
    </div>
  )
}



const StartStop = (props) => {

  
  return (
    <div>
      {/* Timer Label */}
      <div>
        <p id="timer-label"> {props.restFlag? "Break" : "Session"}</p>
        <p id="time-left">
           {props.timer}
        </p>
       
      </div>
        {/* Start, Stop and Reset Button*/}
        <div>
          <button 
            id="start_stop" 
            onClick={props.handleStart} 
          >
             {props.started? <i class="fas fa-pause"></i> : <i class="fas fa-play"></i> }
          </button>
         
          <button 
            id="reset" 
            onClick={props.handleReset}
          >
              <i class="fas fa-sync-alt"></i>
          </button>
        </div>
    </div>
  )
}


const Header = () => {
  return (
    <div className="header">
      <h1> <i class="far fa-clock"></i> Pomodoro Clock</h1>
    </div>
  )
}




export default App;
