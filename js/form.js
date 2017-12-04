var botaoAdicionar = document.querySelector('#adicionar-task');
botaoAdicionar.addEventListener("click",function(event){
event.preventDefault();

//pegando todos os dados do form
var form  = document.querySelector("#form-adiciona");

var task = obtemDadosDoForm(form);
// Aqui vc pode ver o task que foi criado endo exibido como objeto

//console.log(task);
//criar a tr e a td do task chamando a função de criação do task

//criar a tr e a td do task
var taskTR = montaTR(task);

//chamando a função para verificação de erros no form
var erros = validatask(task);
if (erros.length > 0) {
  exibeMensagensdeErro(erros);
  return; // sai da função pois retorna um vazio
}

//adicionando o task na tabela
var tabela = document.querySelector('#tabela-tasks');
tabela.appendChild(taskTR);



//limpa os dados do form
form.reset();

//limpar a ul
var mensagensErro = document.querySelector('#mensagens-erro');
mensagensErro.innerHTML="";
});


//criando o objeto task
  function obtemDadosDoForm(form) {
    var task ={
      nome: form.nome.value,
      desc: form.desc.value,
      anexo: form.anexo.value,
      prioridade: form.prioridade.value,
      criador: form.nome.value
    }
    return task;
  }

  /*
    Nesta função vamos pegar todas as classes que estão no task
    quando criamos um elemento na tabela diretamente
  */

  function montaTR(task){
    var taskTR = document.createElement('tr');
    taskTR.classList.add('task');
    taskTR.appendChild(montaTD(task.nome,'info-nome'));
    taskTR.appendChild(montaTD(task.desc,'info-desc'));
    taskTR.appendChild(montaTD(task.anexo,'info-anexo'));
    taskTR.appendChild(montaTD(task.prioridade,'info-prioridade'));
    taskTR.appendChild(montaTD(task.nome,'info-criador'));

    if (task.prioridade == 1){
      taskTR.classList.add("nivel-1") ;
      }else if (task.prioridade == 2) {
        taskTR.classList.add("nivel-2") ;
      }else{
        taskTR.classList.add("nivel-3") ;
      }

    //para deixar a linha vermelha caso seja um task com obesidade-morbida
    return taskTR;
  }

  //tenho que pegar os dados e a classes - dado e classe
  function montaTD(dado, classe){
    var td = document.createElement('td');
    td.textContent = dado;
    td.classList.add(classe);
    return td;
  }

  //não esquecer de criar a ul no html para receber
  //as mensagens de erro

  function validatask(task){

    //criar um array para receber as mensagens de erro
    //quando vc retorna, não pode retornar mais de um valor
    //como tenho muitas possibilidades de erro, retorno
    //um array de erros
    var erros = [];

    if (task.nome.length == 0) {
      erros.push("O nome está inválido ou vazio");
    }

    if (task.desc.length == 0)  {
      erros.push("A descrição está inválida ou vazia");
    }

    if (task.anexo.length == 0)  {
      erros.push("O anexo está inválido ou vazio");
    }

    if ((task.anexo.length == 0) || (task.prioridade.value < 0) || (task.prioridade.value > 3)) {
      erros.push("A prioridade está inválida ou vazia");
    }

    return erros;
  }

  function exibeMensagensdeErro(erros){
    var ul = document.querySelector('#mensagens-erro');
    /*
    para cada item do meu array erros, ele vai fazer alguma,
    o foreach vai percorrer todo o array e par cada elemento ele executará a função determinada, nesse caso recebendo o item do array que ele está no momento
    */

    // Toda vez que tiver erro, aparecerá uma mensagem, se eu arrumar e enviar, mesmo estando correto, a mensagem continuará, então todas vez que ele submeter lo form a linha abaixo zera ul

    ul.innerHTML = "";

    erros.forEach(function(erro){
      var li = document.createElement('li');
      li.textContent=erro;
      ul.appendChild(li);
    });
  }
