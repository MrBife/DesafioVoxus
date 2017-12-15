![Logo](/vpoo.png)

# Desafio Voxus
> CRUD utilizando Firestore com funções em Real-Time

- Use <kbd>Ctrl</kbd> + <kbd>F</kbd> ou <kbd>command</kbd> + <kbd>F</kbd> para buscar o seu tópico.
- Qualquer tipo de contribuição é bem-vinda, este projeto irá continuar sendo desenvolvido mesmo após o período de testes.

## Conteúdo

### Html

* [Index.html](#index.html)
* [Tasks.html](#tasks.html)

### Css

* [Style.css](#style.css)
* [StyleTask.css](#styleTask.css)
* [Reset.css](#reset.css)
* [Style.scss](#Style.scss)

### Js

* [Cad.js](#cad.js)
* [Dom.js](#dom.js)
* [FiltrarER.js](#filtrar.js)
* [Form.js](#form.js)
* [Index.js](#index.js)

### TODO note ;)

* [TODO](#Todo)

## HTML

### Index.html

Monteia estrutura para Sign In e Sign Up do projeto baseado em um código escrito no Codepen: https://codepen.io/Momciloo/pen/PPvrEz?q=sign&limit=all&type=type-pens

Adicionei Scripts para o funcionamento do Firestore & Firebase

```js
  <script src="https://www.gstatic.com/firebasejs/4.7.0/firebase.js"></script>
  <script src="https://www.gstatic.com/firebasejs/4.7.0/firebase-firestore.js"></script>
```
[⬆ de volta para cima](#conteúdo)

### Tasks.html

Além de adicionar os Scripts para o funcionamento do Firestore & Firebase, desenvolvi por completo o projeto.
Estruturei para que tenha uma tabela em aparente, onde iremos adicionar nossas Tasks vinda do nosso banco (Firestore) e um PopUp ao clicar em adicionar ou DoubleClick em alguma Task na tabela.

[⬆ de volta para cima](#conteúdo)

## CSS

### Style.css

Não precisei modificar nada referente à este .CSS, pois ele impacta diretamente com o index.html que é parte de códigos retirados do CodePen.
[⬆ de volta para cima](#conteúdo)

### StyleTask.css

Por ter desenvolvido inteiro a tela de Tasks(.html), desenvolvi um Style para a página para que tenha pelo menos uma "carinha bonita".
[⬆ de volta para cima](#conteúdo)

### Reset.css

Encontrei este código onde ele resetaria o nosso Form assim que fizesse alguma ação de CRUD.
[⬆ de volta para cima](#conteúdo)

### Style.scss

Parte retirada de CodePen, juntamente com o Index.html
[⬆ de volta para cima](#conteúdo)

## JS

### Cad.js

Inicializei o Firestore com a chave única que pode ser retirado no Google Console (Por favor, não criar projetos com a mesma chave).

```js
  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: '<your-api-key>',
    authDomain: '<your-auth-domain>',
    databaseURL: '<your-database-url>',
    storageBucket: '<your-storage-bucket>'
  };
  firebase.initializeApp(config);

  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
  ```
  
  Fiz uma referência com a `Collection` do Firestore, especificando que irei utilizar o "User".
  
  ```js
  window.storeUser = firestore.collection("User");
  ```
  Para verificar o Log In, utilize:
  
  ```js
  const promise = auth.signInWithEmailAndPassword(email, pass);
  ```
  
  Gravar um usuário no Firestore (Collection) e no Authentication é fácil, neste caso utilizei ambos ao mesmo tempo:
  
  ```js
  storeUser.add({
            emailUser: email,
            nomeUser: name,
            senhaUser: pass
        }).then(function(){
            auth.createUserWithEmailAndPassword(
                email,
                pass
            ).then(function() {
                console.log("Gravado com sucesso!");
                alert("Seja mais que bem-vindo! ;)");
            }).catch(function (error) {
                alert(error);
            });
        }).catch(function(error){
            alert(error);
        });
  ```
     
  Para deixar o projeto em Real-Time, precisamos colocar um Listener para fazer a Stream e ficar escutando qualquer tipo de mudança no projeto, portanto com qualquer alteração (mesmo que não seja do mesmo computador) ele irá modificar automaticamente.
     
  ```js
  firebase.auth().onAuthStateChanged(firebaseUser => {
  ```
     
  Neste caso, além de passar pela URL o nome da pessoa ao se cadastrar, eu "printei" no console o JSON com as informações que acabamos de cadastrar e o e-mail dele. Além de direcionar ele assim que houvesse algum cadastro ou login.
  
  ```js
  if(firebaseUser) {
        location.href = "tasks.html?name=" + encodeURI(window.name_up.val());
        console.log(firebaseUser);
        console.log(user.email);
    }else {
        console.log('not logged in');
    }
    });
  ```
  
  
  
[⬆ de volta para cima](#conteúdo)

### Dom.js

Ainda em Construção!
Aguarde novas mudanças ;)

[⬆ de volta para cima](#conteúdo)

### FiltrarER.js

Selecionamos o campo do Filtro e criamos uma função para pegar todo mundo que tem a classe "Task", verifiquei se eram vazio e percorri eles pegando o nome e armazendo em uma váriavel para dar oportunidade de usarmos uma expressão regular.

```js
campoFiltro.addEventListener('input',function(){
  var tasks = document.querySelectorAll('.task');
  if (this.value.length > 0) {
    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
      var tdNome = task.querySelector('.info-nome');
      var nome = tdNome.textContent;
```

Passamos 2 parâmetros para a expressão, para usar maiúsculo ou minúsculo colocamos como parâmetro o "i". Depois verificamos com um Return de True or False e brincamos de adicionar e esconder uma classe em CSS.

```js
var expressao = new RegExp(this.value,"i");

      if (!expressao.test(nome)) {
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
```


[⬆ de volta para cima](#conteúdo)

### Form.js

Ainda em Construção!
Aguarde novas mudanças ;)

[⬆ de volta para cima](#conteúdo)

### Index.js

Parte do código retirada do CodePen, mas basicamente ele verifica se o SignIn está selecionado ou o SignUp e então ele ativa e esconde algumas classes, para aparecer os campos corretos.

```js
$('.tabs .tab').click(function(){
    if ($(this).hasClass('signin')) {
        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        $('.cont').hide();
        $('.signin-cont').show();
    } 
    if ($(this).hasClass('signup')) {
        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        $('.cont').hide();
        $('.signup-cont').show();
    }
});
```

E aqui é um código onde damos movimentação com o mouse (scroll) na imagem, para ficar bonitinho :)

```js
$('.container .bg').mousemove(function(e){
    var amountMovedX = (e.pageX * -1 / 30);
    var amountMovedY = (e.pageY * -1 / 9);
    $(this).css('background-position', amountMovedX + 'px ' + amountMovedY + 'px');
});
```

[⬆ de volta para cima](#conteúdo)

## TODO ;)

### TODO

Continuarei atualizando o projeto com o tempo, cada vez agregando mais para que tenha cada vez mais funções.

- Double Click Table - Get Data
- Update from the Double Click with the Data
- Delete from the Double Click with the Data
- Update CSS
- Improve Bugs

◔ ⌣ ◔
