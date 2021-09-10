import React, { Component } from 'react';
import './App.css';
import './components/Input.css';

import TextArea from './components/TextArea';
import Analise from './components/Ans';
import Input from './components/Input';
import api from './services/api';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newNome: '',
      newCidade: '',
      newData: '',
    }
  };

  verfGenero = () => {
    const genero = document.querySelector('input[name="genero"]:checked').value;
    return genero;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleSubmit = async (e) => {
    const cidade = document.getElementById('cidade');
    const option_cidade = cidade.options[cidade.selectedIndex];
    const newCidade = option_cidade.text;

    if (this.state.id === undefined) {
      try {
        const response = await api.post('http://localhost:8000/api/postcontt',
          {
            newNome: this.state.newNome,
            newCidade: newCidade,
            newSexo: this.verfGenero(),
            newData: this.state.newData
          })
        alert('Cadastro realizado com sucesso!');
        // console.log(response)
      } catch (e) {
        alert('ERRO' + e);
      }
      
    } else {

      try {
        const response = await api.put('/ap/upd', {
          id: this.state.id.toString(),
          newNome: this.state.newNome.toString(),
          newCidade: newCidade,
          newSexo: this.verfGenero(),
          newData: this.state.newData,
        })
        alert('Cadastro atualizado com sucesso!');
        // console.log(response)
      } catch (e) {
        alert('ERRO' + e);
      }

     }

    e.preventDefault()
  };


  getTituloValue = (e) => {
    this.setState({ newNome: e.target.value });
    this.setState({ [e.target.name]: e.target.value })
  };


  updateCamp = (data) => {
    this.setState({
      id: data.map(pers => pers.id.toString()),
      newNome: data.map(pers => pers.name),
    })
    console.log(data)

  };

  delete = async () => {
    try {
      const response = await api.delete(`/ap/delete/${this.state.id}`)
      alert('Contato deletado com sucesso!')
      window.location.replace('/')
    } catch (e) {
      alert("Erro" + e)
    }

  };

  limpaCampo = () => {
    alert('Campo limpo!')
    window.location.replace('/');
  }

  render() {
    return (
      <section className="container">
        <section className="row border">

          <div className=" col-md-6">
            <TextArea setInfo={(data) => this.updateCamp(data)} className="textoAreaTop" />
          </div>

          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <label >Nome:</label>
              <Input
                className="form-control"
                value={this.state.newNome}
                onChange={this.getTituloValue}
                type="text" name="nome"
              />

              <section id="contGenero">

                <fieldset className="mb-1 p-1 border">
                  <p>Sexo:</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio" name="genero"
                      value="Masculino"
                      id="flexRadioDefault1"
                      required
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Masculino
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="genero"
                      value="Feminino"
                      id="flexRadioDefault1"
                      required
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Feminino
                    </label>
                  </div>
                </fieldset>

              </section>

              <div className="m-1 form-group">
                <label htmlFor="formFileSm" className="form-label mb-0">Cidade: </label>
                <select id="cidade" className="form-control form-control-sm">
                  <option className="jf" value="Juiz de fora">Juiz de fora</option>
                  <option className="bc" value="Bicas">Bicas</option>
                </select>
              </div>

              <label >Data:</label>
              <Input
                type="date"
                name="newData"
                className="form-control"
                onChange={this.handleChange}
              />

              <section id="areaButton" onSubmit={this.handleSubmit}>
                <Input className="btn btn-primary" type="submit" value="Incluir" />
                <Input onClick={() => this.delete()} className="btn btn-primary" type="button" value="Excluir" />
                <Input onClick={() => this.limpaCampo()} className="btn btn-primary" type="button" value="Limpar" />
              </section>
            </form>

          </div>

          <div className="col-md-12">
            <Analise />
          </div>

        </section>
      </section>

    )
  }
}