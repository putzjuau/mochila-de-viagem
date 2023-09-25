const form = document.getElementById("novoItem");
//Normalmente, um formulario em vez de salvar no navegador os dados, ele insere diretamente no link da pagina os dados passados

const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [] //Se estiver vazio, no caso, se for false. Vai criar um Array vazio

//vamos criar um foreach pra roletar esse array

itens.forEach(element => { // buscamos os dados do local aqui
    criaElemento(element) //criando de forma paralela os elementos html dos mesmo
});
form.addEventListener("submit", (evento) => {

    //por causa d o caso normal de um formulario, VAMOS interromper o comportamento com:
    evento.preventDefault(); //aqui, prevenimos o comportamento padrão das paginas web

    //formas de chegar nos inputs do formulario
    /*         Abordagem Horrivel!
    console.log(evento.target[0].value);
    console.log(evento.target[1].value);
    */

    //elements é um array que existe dentro de target

    //passando nome e quantidade 
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    const existe = itens.find(elemento => elemento.nome === nome.value) //vamos verificar se existe o elemento nome dentro do array
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    if (existe) {
        //se existir, precisamos criar um elemento de controle dentro dos itens
        itemAtual.id = existe.id //vamos criar esse id no cria elemento, pelos data-attributes

        atualizaElemento(itemAtual)

        //itens[existe.id] = itemAtual // reeescrever por cima para atualizar o localStorage
        //vamos fazer de outro jeito, vamos buscar o elemento correto para atualizar 
        itens[itens.findIndex(elemento => elemento.id === existe.id)]    = itemAtual    
    }
    else { // se n existir
        //pegamos e colocar o id o tamanho do array
                                                /*se existe adiciona 1                         se n existe nada no array, o id vira 0*/
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1                : 0
        //criamos o elemento, puxamos no array
        criaElemento(itemAtual)

        //Vamos colocar dentro do LocalStorage
        //localStorage so le string
        //vamos colocar dentro deu um objeto

        itens.push(itemAtual) //usando o metodo push para inserir dentro do array
    }






    localStorage.setItem("itens", JSON.stringify(itens)) //json.stringfy transverte para uma string


    nome.value = "";
    quantidade.value = "";
})

//vamos criar os elementos por meio do js
function criaElemento(item) {

    const novoItem = document.createElement('li'); //criando um novo Li
    novoItem.classList.add("item"); //adicionando a classe item nele, para trazer o css

    const numeroItem = document.createElement('strong'); //criando um strong para usar dentro desse novo item
    numeroItem.innerHTML = item.quantidade; // colocando a quantidade dentro do strong
    numeroItem.dataset.id = item.id;
    //adicionando um appendChild para adicionar um elemento html dentro de outro
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));
    
    lista.appendChild(novoItem)//adicionando na lista o novoitem
}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade; // atualizando na mesma linha o html
}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = "X";
    elementoBotao.addEventListener('click', function(){ //arrow function n pode usar o elemento this
        deletaElemento(this.parentNode, id) //estamos passando o pai desse elemento e n o filho(que seria o this)
    })
    return elementoBotao;
}
function deletaElemento(tag, id){
    tag.remove();
    //remove um item do Array
   // itens.splice("o que queremos remover", 1);
 itens.splice(itens.findIndex(elemento => elemento.id === id ), 1);

    //escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens)) //json.stringfy transverte para uma string

}