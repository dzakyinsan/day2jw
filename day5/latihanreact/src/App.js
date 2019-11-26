import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import Content from './components/content'
import Container from './components/containers'

class App extends Component {
  state = {
      stnk:[],
      loading:true,
      angka:0
  }

  componentDidMount(){
    this.setState({stnk:
    [
      {nama:'Bobi',kendaraan:'ambulan',warna:'hotpink'},
      {nama:'Dzaky',kendaraan:'MRT',warna:'orange kayak shopee'},
      {nama:'Anya',kendaraan:'busway',warna:'ungu'}
    ]
    })
    this.setState({loading:false})
  }

  Tambahangkaonclick=(a)=>{
    this.setState((prevstate)=>{
      return{
        angka:a
      }
    })
  }

  render() {
    const {loading,stnk}=this.state
    if(loading){
      return <div>loading...</div>
    } 
    return (
      <div>
        <Header namauser={'Fakhran'}/>
        <div>{this.state.angka}</div>
        <Content stnk={stnk} tambahangka={this.Tambahangkaonclick}/>
        <Container>
         ghghghgh
        </Container>
        <Container>
          sdaddsadsa
        </Container>
      </div>
      );
  }
}
 
export default App;

