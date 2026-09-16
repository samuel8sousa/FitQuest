// ==========================
// EVOLUÇÃO DO TREINO
// ==========================


const matricula =
localStorage.getItem("matricula");



const alunos =
JSON.parse(
localStorage.getItem("alunos")
) || {};



const aluno =
alunos[matricula];



if(!aluno){

    window.location.href =
    "index.html";

}





// Nome usuário

const nome =
document.getElementById("nomeUsuario");


if(nome){

    nome.innerHTML =
    `${aluno.nome}`;

}






// ==========================
// ÚLTIMO TREINO
// ==========================


const historico =
aluno.historico || [];



const ultimoTreino =
historico[historico.length - 1];





const xpGanho =
document.getElementById("xpGanho");



if(xpGanho){


    xpGanho.innerHTML =

    ultimoTreino

    ?

    `+${ultimoTreino.xp} XP`

    :

    "+0 XP";


}





// Mensagem

const mensagem =
document.getElementById("mensagem");



if(mensagem){


    mensagem.innerHTML =

    `Excelente trabalho, ${aluno.nome}! Continue mantendo sua evolução.`;

}







// ==========================
// NÍVEIS
// ==========================


const niveis = [

{
nivel:1,
xp:0
},

{
nivel:2,
xp:300
},

{
nivel:3,
xp:700
},

{
nivel:4,
xp:1200
},

{
nivel:5,
xp:2000
}

];





let atual =
niveis[0];


let proximo =
null;



niveis.forEach((nivel)=>{


    if(aluno.xp >= nivel.xp){

        atual = nivel;

    }

});




proximo = niveis.find((nivel)=>{


    return nivel.xp > aluno.xp;


});







// ==========================
// MOSTRAR NÍVEIS
// ==========================


document
.getElementById("nivelAtual")
.innerHTML =

atual.nivel;





document
.getElementById("proximoNivel")
.innerHTML =


proximo

?

proximo.nivel

:

"MAX";








// ==========================
// BARRA DE PROGRESSO
// ==========================


const barra =
document.getElementById(
"barraNivel"
);



const xpTexto =
document.getElementById(
"xpProgresso"
);





if(proximo){


    let progresso =


    ((aluno.xp - atual.xp)

    /

    (proximo.xp - atual.xp))

    *100;



    progresso = Math.min(
        Math.max(progresso,0),
        100
    );



    if(barra){

        barra.style.width =
        `${progresso}%`;

    }




    if(xpTexto){

        xpTexto.innerHTML =

        `${aluno.xp} XP / ${proximo.xp} XP`;

    }


}
else{


    if(barra){

        barra.style.width =
        "100%";

    }



    if(xpTexto){

        xpTexto.innerHTML =

        `${aluno.xp} XP - Nível máximo`;

    }


}







// ==========================
// RECOMPENSA
// ==========================


const recompensa =
document.getElementById("recompensa");



if(recompensa){


    recompensa.innerHTML =


    ultimoTreino

    ?

    ultimoTreino.treino.toUpperCase()

    :

    "Continue treinando";


}







// ==========================
// BOTÃO VOLTAR
// ==========================


const voltar =
document.getElementById(
"voltarDashboard"
);



if(voltar){


    voltar.addEventListener(
    "click",
    ()=>{


        window.location.href =
        "dashboard.html";


    });


}