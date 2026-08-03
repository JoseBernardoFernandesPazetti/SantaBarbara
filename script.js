/* ======================================
   SANTA BÁRBARA
   script.js
====================================== */

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

/* ==============================
   ADICIONAR AO CARRINHO
============================== */

function adicionarCarrinho(nome, preco, imagem = "") {

    const produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1

        });

    }

    salvarCarrinho();

    atualizarContador();

    alert(nome + " foi adicionado ao carrinho!");

}

/* ==============================
   SALVAR
============================== */

function salvarCarrinho() {

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

}

/* ==============================
   CONTADOR
============================== */

function atualizarContador() {

    const contador = document.getElementById("contador-carrinho");

    if (!contador) return;

    let total = 0;

    carrinho.forEach(item => {

        total += item.quantidade;

    });

    contador.innerText = total;

}

/* ==============================
   MOSTRAR CARRINHO
============================== */

function mostrarCarrinho() {

    const lista = document.getElementById("lista-carrinho");

    const total = document.getElementById("total");

    if (!lista || !total) return;

    lista.innerHTML = "";

    let valorTotal = 0;

    carrinho.forEach((item, indice) => {

        valorTotal += item.preco * item.quantidade;

        lista.innerHTML += `

        <div class="item-carrinho">

            <div>

                <h3>${item.nome}</h3>

                <p>Quantidade: ${item.quantidade}</p>

                <strong>R$ ${(item.preco * item.quantidade).toFixed(2)}</strong>

            </div>

            <button onclick="removerProduto(${indice})">

                Remover

            </button>

        </div>

        `;

    });

    total.innerHTML = "Total: R$ " + valorTotal.toFixed(2);

}

/* ==============================
   REMOVER
============================== */

function removerProduto(indice){

    carrinho.splice(indice,1);

    salvarCarrinho();

    mostrarCarrinho();

    atualizarContador();

}

/* ==============================
   LIMPAR CARRINHO
============================== */

function limparCarrinho(){

    if(confirm("Deseja realmente limpar o carrinho?")){

        carrinho = [];

        salvarCarrinho();

        mostrarCarrinho();

        atualizarContador();

    }

}

/* ==============================
   INICIALIZAÇÃO
============================== */

document.addEventListener("DOMContentLoaded", () => {

    atualizarContador();

    mostrarCarrinho();

});

/* ==============================
   FINALIZAR WHATSAPP
============================== */

function finalizarWhatsapp(){

    if(carrinho.length === 0){

        alert("Seu carrinho está vazio.");

        return;

    }

    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A%0A";

    let total = 0;

    carrinho.forEach(item => {

        mensagem += `• ${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2)}%0A`;

        total += item.preco * item.quantidade;

    });

    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

    // TROQUE PELO SEU NÚMERO
    const telefone = "5511912345678";

    window.open(`https://wa.me/${telefone}?text=${mensagem}`,"_blank");

}