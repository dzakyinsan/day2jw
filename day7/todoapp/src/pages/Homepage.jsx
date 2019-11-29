import React, { Component } from 'react';
import {
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter

} from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class Home extends Component {
    state = {
        data:[],
        isopen:false,
        indexedit:-1,
        modaledit:false
    }

    componentDidMount(){
        this.setState({
            data:[
                {kegiatan:'Lari',status:true,tanggal:'2019-11-27'}, 
                {kegiatan:'Sarapan',status:false,tanggal:'2019-11-28'},
            ]
        })
    }

    onAdddataClick=()=>{
        var kegiatan=this.refs.kegiatan.value
        var tanggal=this.refs.tanggal.value
        var obj={
            kegiatan,
            status:false,
            tanggal
        }
        if(kegiatan===''||tanggal===''){
            MySwal.fire(
                'Cancelled oi',
                'tolong diisi WOOYYY bisa baca enggak',
                'error'
              )
        }else{
            var newdata=[...this.state.data,obj]
            this.setState({data:newdata,isopen:false})
        }
        
    }

    onDeletedataClick=(index)=>{
        MySwal.fire({
            title: 'Apa kamu yakin mau hapus '+this.state.data[index].kegiatan+'?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, apus aja ribet amat lu',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
                var data=this.state.data
                data.splice(index,1)
                MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                this.setState({
                    data:data
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              MySwal.fire(
                'Cancelled',
                'ngabisin waktu aja luu klik klik',
                'error'
              )
            }
          })
    }

    onmodaleditClick=(index)=>{
        this.setState({modaledit:true,indexedit:index})
    }

    onUpdatedataClick=()=>{
        var newdata=this.state.data
        var objnewdata={
            kegiatan:this.refs.editkegiatan.value,
            status:this.refs.editstatus.value==='true'?true:false,
            tanggal:this.refs.edittanggal.value
        }
        newdata.splice(this.state.indexedit,1,objnewdata)
        this.setState({data:newdata,modaledit:false,indexedit:-1})
        MySwal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).fire({
            icon: 'success',
            title: 'edit sukses broo'
        })

    }
    
    renderTodo=()=>{
        return this.state.data.map((val,index)=>{
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.kegiatan}</td>
                    <td>{val.status?'Sudah':'Belom'}</td>
                    <td>{val.tanggal}</td>
                    <td>
                        <button onClick={()=>this.onmodaleditClick(index)} className='btn btn-primary mr-4'>Edit </button>
                        <button onClick={()=>this.onDeletedataClick(index)} className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        const {data,indexedit}=this.state 
        if(data.length===0){
            return <div>Loading</div>
        }
        return (
            <div>
                 {/* modal Edit data start */}
                 {
                     indexedit===-1?
                     null
                     :
                 <Modal isOpen={this.state.modaledit} toggle={()=>this.setState({modaledit:false})}>
                    <ModalHeader>
                        Edit Doto
                    </ModalHeader>
                    <ModalBody>
                        <input className='form-control mt-2 mb-2' defaultValue={data[indexedit].kegiatan} placeholder='kegiatan' type="text" ref='editkegiatan'/>
                        {
                            data[indexedit].status?
                            <select className='form-control' ref='editstatus'>
                                <option selected value={true}>Sudah</option>
                                <option value={false}>Belum</option>
                            </select>
                            :
                            <select className='form-control' ref='editstatus'>
                                <option  value={true}>Sudah</option>
                                <option selected value={false}>Belum</option>
                            </select>
                        }
                        <input className='form-control mt-2' defaultValue={data[indexedit].tanggal} placeholder='tanggal' type="date" ref='edittanggal'/>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.onUpdatedataClick}  className='btn btn-success'>Save</button>
                        <button  className='btn btn-danger' onClick={()=>this.setState({modaledit:false})}>Cancel</button>
                    </ModalFooter>
                </Modal>
             
                 }
                {/* modal add data start */}
                <Modal isOpen={this.state.isopen} toggle={()=>this.setState({isopen:false})}>
                    <ModalHeader>
                        Add Doto
                    </ModalHeader>
                    <ModalBody>
                        <input className='form-control' placeholder='kegiatan' type="text" ref='kegiatan'/>
                        <input className='form-control' placeholder='tanggal' type="date" ref='tanggal'/>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.onAdddataClick}  className='btn btn-success'>ADD</button>
                        <button  className='btn btn-danger' onClick={()=>this.setState({isopen:false})}>Cancel</button>
                    </ModalFooter>
                </Modal>
                {/* modal add data end */}
                <div className="px-5 mx-5 my-5 ">
                    <Table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Kegiatan</th>
                                <th>Status</th>
                                <th>Tanggal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTodo()}
                        </tbody>
                    </Table>
                    <div>
                        <button onClick={()=>this.setState({isopen:true})} className='btn btn-success rounded-pill'>add data</button>
                    </div>
                </div>
                
            </div>
          );
    }

}
 
export default Home;