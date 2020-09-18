import { Post } from './../../services/post';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
id:string = "";
nome:string = "";
cpf:string = '';
telefone:string = "";
cep:string = "";
endereco:string = "";
numero:string = "";
complemento:string = '';
bairro:string = "";
cidade:string = "";
usuario:string = "";
senha:string = "";
nivel:string = "";

  constructor(  private router: Router,
                private provider: Post,
                private routerAct: ActivatedRoute) { }

  ngOnInit() {
    this.routerAct.params.subscribe((data:any)=>{
      this.id = data.id;
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.telefone = data.telefone;
      this.cep = data.cep;
      this.endereco = data.endereco;
      this.numero = data.numero;
      this.complemento = data.complemento;
      this.bairro = data.bairro;
      this.cidade = data.cidade;
      this.usuario = data.usuario;
      this.senha = data.senha;
      this.nivel = data.nivel;
      });
  }

  voltarLogin(){
    this.router.navigate(['login']);
  }

  cadastrar(){
    return new Promise(resolve =>{
      let dados = {
        requisicao: 'add',
        nome: this.nome,
        cpf: this.cpf,
        telefone: this.telefone,
        cep: this.cep,
        endereco: this.endereco,
        numero: this.numero,
        complemento: this.complemento,
        bairro: this.bairro,
        cidade: this.cidade,
        usuario: this.usuario,
        senha: this.senha,
        nivel: this.nivel
      };

      this.provider.dadosApi(dados,'api.php').subscribe(data=>{
        console.log(data);
        this.router.navigate(['login'])
      });
    })
  }

}
