import { Component } from '@angular/core';
import { AlertController, ToastController, ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-agendar',
  templateUrl: 'agendar.page.html',
  styleUrls: ['agendar.page.scss'],
})
export class AgendarPage {
  consultas: any[] = [];
  constructor(
    private alertaControl:AlertController,
    private toastControl: ToastController,
    private actionSheetControl: ActionSheetController,
    private navContrl: NavController
    ){// os comandos desta sessão são executados durante o load da página
      let consultasJason = localStorage.getItem('consultaDB');
      //debugger;
      if(consultasJason != null)
      {
        this.consultas = JSON.parse(consultasJason);
      }
    }

    logout(){
      this.navContrl.navigateForward("login");
    }

    voltarHome(){
      this.navContrl.navigateForward("home");
    }

async adicionarConsulta(){
  const alerta = await this.alertaControl.create({
    header:'O que precisa fazer?',
    inputs: [
      {name: 'nome',type: 'text', placeholder: 'Seu nome ' },
      {name: 'consulta', type: 'text', placeholder: 'Consulta '},
      {name: 'data', type: 'date', placeholder: 'Data da consulta'},
      {name: 'hora', type: 'time', placeholder: 'Hora da consulta'}

    ],
    buttons:[
      {text:'Cancelar',role:'cancel', cssClass:"tertiay", 
      handler: ()=>{
        // caso o usuário clique em cancelar???
        console.log('Acho que você clicou em cancelar?!?!?!');
      }}
    ,{
      text: 'Ok', 
      handler: (dadosForm) =>{
       //debugger; 
       this.addConsulta(dadosForm);
      }
    }
  ]
  });
  await alerta.present();
}
 async addConsulta(dadosForm: any[]) {//>>>>>>>>>
  //verifica se usuário digitou alguma consulta
  if (dadosForm.length < 1){
    const toast = await this.toastControl.create({
      message: 'Informe todos os campos da consulta...',
      duration: 2000,
      position: 'middle',
      color:'tertiary'
    });  
    toast.present();
    return;
  }
  let consulta = {  nome: dadosForm.nome, 
                  consulta: dadosForm.consulta, 
                  data: dadosForm.data,
                  hora: dadosForm.hora,
                  printar: false,  
                  feito: false};
  //debugger;
  this.consultas.push(consulta);
  this.updateLocalStorage();
}//final do método addConsulta <<<<<<<<<<<<<<<<<<<

updateLocalStorage(){
  localStorage.setItem('consultaDB',JSON.stringify(this.consultas));
}

async abrirAcoes(tarefinha:any){

    const actionsheet = await this.actionSheetControl.create({
      header: "O que deseja fazer?",
      buttons: [
        {
        text: tarefinha.feito ? 'Desmarcar' : 'Marcar como relalizada',
        icon: tarefinha.feito ? 'radio-button-off' : 'checkmark-circle',
        handler:()=>{
          tarefinha.feito = !tarefinha.feito; // inverte o valor de task
          this.updateLocalStorage();
        }
       },
       {
        text: tarefinha.feito ? 'Excluir' : 'Excluir',
        icon: tarefinha.feito ? 'trash-outline' : 'trash-outline',
        handler:()=>{
          this.consultas = this.consultas.filter(a => tarefinha != a); // expressão Lambda
          this.updateLocalStorage();
        }
       },
     {
       text: 'Cancelar',
       icon: 'close',
       role: 'cancel',
       handler: () => {
         console.log('clicou em cancelar');
       }
     }]
    });
    await actionsheet.present();// ecexutar a actionsheet
  }// final do actionsheet
}