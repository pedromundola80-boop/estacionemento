let capacidade = 20
let carros = JSON.parse(localStorage.getItem("carros")) || []

let faturamento = Number(localStorage.getItem("faturamento")) || 0



function registrar(){

    if(carros.length >= capacidade){
        alert("Estacionamento cheio!")
        return
    }

    let placa = document.getElementById("placa").value.trim().toUpperCase()

    if(placa === ""){
        alert("Digite uma placa!")
        return
    }

    let existe = carros.some(carro => carro.placa === placa)

    if(existe){
        alert("Esse carro já está estacionado!")
        return
    }

    let carro = {
        placa: placa,
        entrada: new Date()
    }

    carros.push(carro)

    salvarDados()

    mostrar()

    document.getElementById("placa").value = ""
}




function mostrar(){

    let lista = document.getElementById("lista")

    lista.innerHTML = ""

    carros.forEach(function(carro, index){

        let linha = document.createElement("tr")

        let colunaPlaca = document.createElement("td")
        colunaPlaca.textContent = carro.placa

        let colunaEntrada = document.createElement("td")
        colunaEntrada.textContent = new Date(carro.entrada).toLocaleTimeString()

        let colunaTempo = document.createElement("td")
        colunaTempo.textContent = calcularTempo(carro.entrada)

        let colunaAcao = document.createElement("td")

        let botao = document.createElement("button")
        botao.textContent = "Remover"
        botao.onclick = function(){
            remover(index)
        }

        colunaAcao.appendChild(botao)

        linha.appendChild(colunaPlaca)
        linha.appendChild(colunaEntrada)
        linha.appendChild(colunaTempo)
        linha.appendChild(colunaAcao)

        lista.appendChild(linha)

        let fat = document.getElementById("faturamento")
fat.textContent = "Faturamento: R$ " + faturamento


    })

    let contador = document.getElementById("contador")
    contador.textContent = "Vagas: " + carros.length + " / " + capacidade

}


function remover(index){

    let saida = new Date()

    let carro = carros[index]

    let tempo = saida - carro.entrada

    let horas = Math.ceil(tempo / (1000 * 60 * 60))

    let valor = horas * 5
    faturamento += valor

localStorage.setItem("faturamento", faturamento)


    alert("Tempo estacionado: " + horas + " hora(s)\nValor: R$ " + valor)

    carros.splice(index,1)

    mostrar()

}

function salvarDados(){
    localStorage.setItem("carros", JSON.stringify(carros))
}

function limparEstacionamento(){

    let confirmar = confirm("Tem certeza que deseja limpar todo o estacionamento?")

    if(confirmar){

        carros = []

        localStorage.removeItem("carros")

        mostrar()

    }

}

function calcularTempo(entrada){

    let agora = new Date()

    let tempo = agora - new Date(entrada)

    let minutos = Math.floor(tempo / 60000)

    return minutos + " min"

}

setInterval(function(){

    mostrar()

}, 1000)
