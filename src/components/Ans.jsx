import React, { Component } from 'react';
import "./Ans.css";
import axios from 'axios';

export default class Analise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contatosJf: [],
            contatosBc: []
        }
    };

    contar = async () => {

        axios.get('http://localhost:8000/api/get/jf')
            .then(res => {
                this.setState({ contatosJf: res.data });
                // console.log(res.data)
            })

        axios.get('http://localhost:8000/api/get/bc')
            .then(res => {
                // console.log(res.data)
                this.setState({ contatosBc: res.data });
            })
    };

    formatData = (data) => {
        console.log("=>", data)
        const meses = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ];
        const confData = data.split('')
        const mes = confData.slice(5, 7).join('');
        return (meses[mes - 1])
    }
    render() {
        const { contatosJf, contatosBc } = this.state
        return (
            <div>
                <div className="AreaCampo ">
                    <section className="areaJf">
                        <h3>Número de contatos no banco de dados:</h3>
                        Contatos em Juiz de fora:
                        {
                            contatosJf.map((res, i) =>
                                <ul key={i}>

                                    <li>{res.sexo}: {res.qtd}</li>
                                </ul>
                            )
                        }
                    </section>

                    <section className="areaBc">
                        <p>Contatos em Bicas::</p>

                        {
                            contatosBc.map((res, i) =>
                                <ul key={i}>
                                    <li>{res.sexo}: {res.qtd}</li>
                                </ul>
                            )
                        }
                    </section>



                </div>

                <button onClick={() => this.contar()} className="form-control btn-primary" type="button">Contar</button>

            </div>

        )
    }

}
