import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  //Variáveis
  public rodada: number = 0
  public rodadaFrase: Frase = new Frase('', '')

  public progresso: number = 0
  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{

  }

  public atualizaResposta(resposta: Event): void{
    this.resposta = ((<HTMLInputElement>resposta.target).value)
  }

  public verificaResposta(): void{

    //Trocar pergunta da rodada
    if (this.rodadaFrase.frasePtBr == this.resposta){
      //Atualizar índice
      this.rodada++
      //Progesso
      this.progresso = this.progresso + 100 / this.frases.length

      //Encerramento
      if(this.rodada === this.frases.length){
        this.encerrarJogo.emit('vitoria')
      }

      //Trocar frase
      this.atualizaRodada()
    }

    else{
      alert('Resposta incorreta.')
      //Reduzir a quantidade de tentativas
      this.tentativas--

      if(this.tentativas === -1){
        this.encerrarJogo.emit('derrota')
      }
      this.resposta = ''
    }
  }

  public atualizaRodada(): void{
    //Atualiza frase
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }

}
