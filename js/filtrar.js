//pegar o dado do campo
var campoFiltro = document.querySelector('#filtro-tabela');

/*colocar o escutador de eventos para a digitação , nesse caso é
input, ou seja, cada letra digitada ele chamará o evento */

campoFiltro.addEventListener('input',function(){
  //pegar todo mundo que tem a classe task
  var tasks = document.querySelectorAll('.task');
  //verificar se o campo está vazio
  if (this.value.length > 0) {
    //fazer um for para percorrer o task
    for (var i = 0; i < tasks.length; i++) {
      //pegando o nome armazenar em uma variável chamada task
      var task = tasks[i];
      var tdNome = task.querySelector('.info-nome');
      var nome = tdNome.textContent;

      //verificar se o conteúdo da variável nome é igual ao digitado
      if (nome != this.value) {
        //adcicionar uma classe que esconde o conteúdo
        task.classList.add('esconder');
      }
      else {
        //se for igual remove a classe esconder
        task.classList.remove('esconder');
      }
    }
  }
  else{
    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
      task.classList.remove('esconder');
    }
  }
});
