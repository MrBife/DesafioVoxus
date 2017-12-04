//Get Tasks
var tasks = document.querySelectorAll(".task");

//Percorrendo Tasks e adicionando em Array para consumir valores
//Verificando o nivel das tasks

  for (var i = 0; i < tasks.length; i++) {
    var tdprio = tasks[i].querySelector(".info-prioridade");
    var prio = tdprio.textContent;

  //Logica para mudar a cor da tabela por nivel
  if (prio == 0) {
    tasks[i].classList.add("nivel-1") ;
    }else if (prio == 1){
      tasks[i].classList.add("nivel-2") ;
    }else {
      tasks[i].classList.add("nivel-3") ;
    }
}

/* Adicionando uma Task */
var botaoAdicionar = document.querySelector('#adicionar-task');
botaoAdicionar.addEventListener("click",function(event){
    event.preventDefault();

//Pegando todos os dados do form
var form    = document.querySelector("#form-adiciona");
var nome    = form.nome.value;
var desc    = form.desc.value;
var anexo  = form.anexo.value;
var prioridade = form.prioridade.value;

//usar createElement - criar a tr e as td´s correspondentes
var taskTR = document.createElement("tr");
var nomeTD = document.createElement("td");
var descTD = document.createElement("td");
var anexoTD = document.createElement("td");
var prioridadeTD = document.createElement("td");
var criadorTD = document.createElement("td");

//atribuir valores que foram recuperados do formulário
nomeTD.textContent = nome;
descTD.textContent = desc;
anexoTD.textContent = anexo;
prioridadeTD.textContent = prioridade;

//agora vamos colocar os dados dentro do task
//eles entrarão como filhos do task - pelo dom
//eles são filhos diretos

taskTR.appendChild(nomeTD);
taskTR.appendChild(descTD);
taskTR.appendChild(anexoTD);
taskTR.appendChild(prioridadeTD);


//agora vamos colocar o task no tbody temos o id="tabela-tasks", vamos pegar esse cara e usar o appendChild para inserir a tr do task

var tabela = document.querySelector('#tabela-tasks');
tabela.appendChild(taskTR);

});
