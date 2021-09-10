import React, { Component } from 'react';
import "./TextArea.css";
import api from '../services/api';
import { compareAsc, format } from 'date-fns'

export default class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    };

    componentDidMount = async () => {
        const res = await api.get('/api/getcontt')
        this.setState({ list: res.data })
        // console.log(res.data)
    };

    getId = (key, nome, sexo, cidade, data) => {
        let date = [{
            id: key,
            name: nome,
            sex: sexo,
            cidd: cidade,
            dat: data
        }]
        console.log()
        this.props.setInfo(date)
    };
    formatData = (data) => {
        const forData = format(new Date(data), 'dd/MM/yyyy')
        return forData;
    }

    render() {
        const { list } = this.state;
        return (
            <div id="AreaTop">

                {
                    list.map((pers, i) =>
                        <ul key={i} className="list-group">
                            <li onClick={() => this.getId(pers.codcontato, pers.nome, pers.sexo, pers.cidade, pers.dataReg)} className="list-group-item">
                                <h3>Nome: {pers.nome}</h3>
                                <h3>Sexo: {pers.sexo}</h3>
                                <h3>Cidade: {pers.cidade}</h3>
                                <h3>Data: {this.formatData(pers.dataReg)}</h3>
                            </li>
                        </ul>
                    )
                }

            </div>
        )
    }
}