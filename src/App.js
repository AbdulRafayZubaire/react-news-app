import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {

  state={
    progress: 0
  }
  setProgress=(progress)=>{
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar />

          <LoadingBar color='red' progress={this.state.progress} onLoaderFinished={() => this.setProgress(0)}/>

          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="1" apiKey={'a9f94b5099ca4361984d60c631cf6042'} pagesize={6} country="in" category="general" />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="2" apiKey={'a9f94b5099ca4361984d60c631cf6042'} pagesize={6} country="in" category="business" />}> </Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="3" apiKey={'a9f94b5099ca4361984d60c631cf6042'} pagesize={6} country="in" category="entertainment" />}></Route>
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="4" apiKey={'a9f94b5099ca4361984d60c631cf6042'} pagesize={6} country="in" category="general" />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="5" apiKey={'a9f94b5099ca4361984d60c631cf6042'} pagesize={6} country="in" category="health" />}></Route>
            <Route axact path="/science" element={<News setProgress={this.setProgress} key="6" apiKey={'a9f94b5099ca4361984d60c631cf6042'} pagesize={6} country="in" category="science" />}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="7" apiKey={'a9f94b5099ca4361984d60c631cf6042'} pagesize={6} country="in" category="sports" />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="8" apiKey={'a9f94b5099ca4361984d60c631cf6042'} pagesize={6} country="in" category="technology" />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App

