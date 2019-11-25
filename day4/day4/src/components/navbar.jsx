import React from 'react';

class Navbar extends React.Component {
    state = {
        nama:'boba',
        angka:0,
        umur:12,
        mobil:['avanza','grabweel','ambulan','tank']
    }
    componentDidMount(){
        console.log('masukdidmount')
        var nama=this.state.nama +'1'
        console.log(this.state.nama)
        this.setState({nama})
        console.log(this.state.nama)
    }

    onTambahClick=()=>{
        var angka1=this.state.angka+1
        this.setState({angka:angka1})
    }
    onKurangClick=()=>{
        this.setState(({angka})=>{
            var angkanew=angka-1
            if(angkanew<0){
                return{
                    angka:0
                }
            }
            return{
                angka:angka-1
            }
        })
    }
    render() {
        console.log('render')
        if(this.state.nama){
            return (
                <div>
                        <div>
                            {this.state.nama}
                        </div>
                    <center>
                        <div>
                            {this.state.angka}
                            <div>
                                <button onClick={this.onTambahClick}>+</button>
                                <button onClick={this.onKurangClick} >-</button>
                            </div>
                        </div>
                    </center>
                </div>
              );
        }else{
            return<div>loading...</div>
        }
    }
}
 
export default Navbar;