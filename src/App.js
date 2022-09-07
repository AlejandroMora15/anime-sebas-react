import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  {id: 1, personaje: "naruto", anime: "Naruto"},
  {id: 2, personaje: "goku", anime: "Dragon Ball"},
  {id: 3, personaje: "luffy", anime: "One Piece"},
  {id: 4, personaje: "sasuke", anime: "Naruto"},
  {id: 5, personaje: "kaneki", anime: "Tokyo Ghoul"},
  {id: 6, personaje: "gon", anime: "HunterxHunter"},
];

class App extends React.Component{

  state={
    data:data,
    form:{
      id:'',
      personaje:'',
      anime:''
    },
    modalInsertar:false,
    modalEditar:false,
  }

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }

  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});
  }

  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].personaje=dato.personaje;
        lista[contador].anime=dato.anime;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});
  }

  eliminar=(dato)=>{
    var opcion=window.confirm("Realmente desea eliminar el registro " + dato.id);
    if(opcion){
      var contador=0;
      var lista=this.state.data;
      lista.map((registro)=>{
        if(registro.id==dato.id){
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({data: lista});
    }

  }

  render(){
    return(
      <>
      <Container>
        <br />
        <Button color='success' onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo personaje</Button>
        <br></br>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>PERSONAJE</th>
              <th>ANIME</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((elemento)=>(
              <tr>
                <td>{elemento.id}</td>
                <td>{elemento.personaje}</td>
                <td>{elemento.anime}</td>
                <td><Button color='primary' onClick={()=>this.mostrarModalEditar(elemento)}>EDITAR</Button>{"  "}
                <Button color='danger' onClick={()=>this.eliminar(elemento)}>ELIMINAR</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={this.state.modalInsertar}>
        
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>
        
        <ModalBody>
          <FormGroup>
            <label>ID:</label>
            <input className='form-control' readOnly type="text" value={this.state.data.length+1}/>
          </FormGroup>
          <FormGroup>
            <label>PERSONAJE:</label>
            <input className='form-control' name="personaje" type="text" onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <label>ANIME:</label>
            <input className='form-control' name="anime" type="text"onChange={this.handleChange}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
            <Button color='primary' onClick={()=>this.insertar()}>INSERTAR</Button>
            <Button color='danger' onClick={()=>this.ocultarModalInsertar()}>CANCELAR</Button>
        </ModalFooter>

      </Modal>

      <Modal isOpen={this.state.modalEditar}>
        
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>
        
        <ModalBody>
          <FormGroup>
            <label>ID:</label>
            <input className='form-control' readOnly type="text" value={this.state.form.id}/>
          </FormGroup>
          <FormGroup>
            <label>PERSONAJE:</label>
            <input className='form-control' name="personaje" type="text" onChange={this.handleChange} value={this.state.form.personaje}/>
          </FormGroup>
          <FormGroup>
            <label>ANIME:</label>
            <input className='form-control' name="anime" type="text"onChange={this.handleChange} value={this.state.form.anime}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
            <Button color='primary' onClick={()=>this.editar(this.state.form)}>EDITAR</Button>
            <Button color='danger' onClick={()=>this.ocultarModalEditar()}>CANCELAR</Button>
        </ModalFooter>

      </Modal>
      </>
    )
  }
}

export default App;
