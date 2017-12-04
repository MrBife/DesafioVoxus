
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

      //Aqui vou fazer uma expressão regular
      /* passar 2 parâmetros para a expressão -
      1- quero que ele busque o conteúdo do campo, em nosso caso
      o this.value
      2- características do campo - maiúsculo ou minúsculo - usar
      um parâmetro chamado "i"
      */
      var expressao = new RegExp(this.value,"i");

      /*agora vou pedir para ele ao invés de comparar o campo
      inteiro, ele ir testando se o nome do task tem uma
      parte(pedaço) do que está no this.value
      */
      if (!expressao.test(nome)) {
        /*AQUI TENHO DE NEGAR A EXPRESSÃO  - quero testar se
          no nome tem uma parte do que foi digitado - ele retorna
          TRUE ou FALSE - é diferente do exemplo anterior o outro
          não comparava o nome com o campo de pesquisa, ele chamava
          a classe para esconder
        */
        task.classList.add('esconder');
      }
      else{
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
