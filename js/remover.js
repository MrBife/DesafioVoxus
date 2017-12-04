//selecionar o tbody
var tabela = document.querySelector('tbody');

//colocando o escutador de eventos
tabela.addEventListener('dblclick',function(event){
  /*Estou usando o event(lembrando event.prevenDefault()) - porque ele vai falar quem foi o cara que foi clicado, se deixar com o this ele vai achar que foi o tbody e vai remover os dados da tabela  - na realidade preciso remover a linha da td - lembrando qu e o evento pode ser chamado por qq filhos e o pai vai escutar - o this indica a quem pertence o evento, quem é o dono do evento-
  vamos usar o target que vai informar quem irá sofrer o evento
  */

  var alvoDoElemento = event.target; // pegar o elemento que foi clicado
  var paiDoElemento = alvoDoElemento.parentNode; //pegando o pai do elemento que foi clicado, ou seja, o cara a ser excluído

  paiDoElemento.classList.add('sumindo');
  setTimeout(function(){
    paiDoElemento.remove();
  },480);
})

tabela.addEventListener('click',function(event){
  var alvoDoElemento = event.target; // pegar o elemento que foi clicado
  var paiDoElemento = alvoDoElemento.parentNode; //pegando o pai do elemento que foi clicado, ou seja, o cara que vai mudar de cor

  paiDoElemento.classList.add('done');
});
