// ==========================
// DASHBOARD FITQUEST
// ==========================


// Buscar aluno logado

const matricula =
localStorage.getItem("matricula");



let alunos =
JSON.parse(
    localStorage.getItem("alunos")
) || {};



const aluno =
alunos[matricula];



if(!aluno){

    window.location.href =
    "index.html";

}




// ==========================
// SAUDAÇÃO
// ==========================


function obterSaudacao(){


    const hora =
    new Date().getHours();



    if(hora >= 5 && hora < 12){

        return "Bom dia";

    }


    if(hora >= 12 && hora < 18){

        return "Boa tarde";

    }


    return "Boa noite";

}





const saudacao =
document.getElementById("saudacao");



if(saudacao){


    saudacao.innerHTML =

    `${obterSaudacao()}, ${aluno.nome}!`;


}





const nomeUsuario =
document.getElementById("nomeUsuario");



if(nomeUsuario){

    nomeUsuario.innerHTML =
    aluno.nome;

}






// ==========================
// NÍVEIS
// ==========================


const niveis = [


{
    nivel:1,
    titulo:"Iniciante",
    xpMinimo:0,
    xpProximo:300
},


{
    nivel:2,
    titulo:"Atleta em Evolução",
    xpMinimo:300,
    xpProximo:700
},


{
    nivel:3,
    titulo:"Guerreiro Fitness",
    xpMinimo:700,
    xpProximo:1200
},


{
    nivel:4,
    titulo:"Elite Fitness",
    xpMinimo:1200,
    xpProximo:2000
},


{
    nivel:5,
    titulo:"Mestre Fitness",
    xpMinimo:2000,
    xpProximo:3000
}

];






function atualizarNivel(){


    const xp =
    aluno.xp || 0;



    const nivelAtual =

    niveis.find((nivel)=>{

        return xp >= nivel.xpMinimo &&
        xp < nivel.xpProximo;


    }) || niveis[niveis.length-1];





    document.getElementById("nivel")
    ?.replaceChildren(
        document.createTextNode(
            `Nível ${nivelAtual.nivel}`
        )
    );



    document.getElementById("tituloNivel")
    ?.replaceChildren(
        document.createTextNode(
            nivelAtual.titulo
        )
    );



    document.getElementById("xpAtual")
    ?.replaceChildren(
        document.createTextNode(
            `${xp} XP`
        )
    );





    const proximo =
    document.getElementById("proximoNivel");



    if(proximo){


        const falta =
        nivelAtual.xpProximo - xp;



        proximo.innerHTML =

        falta > 0

        ?

        `${falta} XP para alcançar o nível ${nivelAtual.nivel + 1}`

        :

        "Nível máximo alcançado!";


    }






    const barra =
    document.querySelector(
        ".progress-value"
    );



    if(barra){


        let progresso =


        ((xp - nivelAtual.xpMinimo)

        /

        (nivelAtual.xpProximo - nivelAtual.xpMinimo))

        *100;



        progresso =
        Math.min(
            Math.max(progresso,0),
            100
        );



        barra.style.width =
        `${progresso}%`;

    }


}







// ==========================
// ESTATÍSTICAS
// ==========================


document.getElementById("treinos")
?.replaceChildren(

document.createTextNode(

aluno.treinosTotal ??
aluno.treinos ??
0

)

);




document.getElementById("xpCard")
?.replaceChildren(

document.createTextNode(

`${aluno.xp || 0} XP`

)

);





document.getElementById("conquistas")
?.replaceChildren(

document.createTextNode(

aluno.conquistas?.length || 0

)

);







// ==========================
// CONQUISTA SEMANAL
// ==========================


function atualizarConquista(){



    const treinosSemana =

    aluno.treinosSemana || 0;



    const progresso =

    document.getElementById(
        "progressoConquista"
    );



    if(progresso){


        progresso.innerHTML =

        `${treinosSemana}/5 treinos`;

    }




    const barra =

    document.querySelector(
        ".achievement-value"
    );



    if(barra){


        barra.style.width =

        `${(treinosSemana/5)*100}%`;

    }


}








// ==========================
// CALCULAR XP
// ==========================


function calcularXP(){


    const treino =
    document.getElementById("tipoTreino");



    const dificuldade =
    document.getElementById("dificuldade");



    if(!treino || !dificuldade){

        return 0;

    }



    let xp = 0;



    switch(treino.value){


        case "superior":

            xp=100;

            break;


        case "perna":

            xp=150;

            break;


        case "cardio":

            xp=80;

            break;


        case "fullbody":

            xp=200;

            break;

    }



    if(dificuldade.value==="medio"){

        xp+=50;

    }



    if(dificuldade.value==="dificil"){

        xp+=100;

    }



    return xp;

}






// ==========================
// CHECK-IN
// ==========================


const btnCheckin =
document.getElementById("btnCheckin");



if(btnCheckin){


btnCheckin.addEventListener(
"click",
()=>{


    let alunos =

    JSON.parse(
        localStorage.getItem("alunos")
    ) || {};



    let aluno =
    alunos[matricula];



    const hoje =
    new Date()
    .toISOString()
    .split("T")[0];




    if(aluno.ultimoTreino === hoje){


        alert(
        "Você já treinou hoje! Volte amanhã 💪"
        );


        return;

    }




    const ganho =
    calcularXP();



    aluno.xp += ganho;


    aluno.treinosTotal =
    (aluno.treinosTotal || 0)+1;


    aluno.treinosSemana =
    (aluno.treinosSemana || 0)+1;


    aluno.ultimoTreino =
    hoje;




    aluno.historico =
    aluno.historico || [];



    aluno.historico.push({

        data:hoje,

        treino:
        document.getElementById("tipoTreino").value,

        dificuldade:
        document.getElementById("dificuldade").value,

        xp:ganho

    });





    aluno.conquistas =
    aluno.conquistas || [];




    if(
        aluno.treinosSemana >=5 &&
        !aluno.conquistas.includes(
            "Foco Semanal"
        )
    ){


        aluno.conquistas.push(
            "Foco Semanal"
        );


        aluno.treinosSemana=0;


    }





    alunos[matricula]=aluno;



    localStorage.setItem(

        "alunos",

        JSON.stringify(alunos)

    );



    window.location.href =
    "evolution.html";


});


}







// ==========================
// BOTÕES DE NAVEGAÇÃO
// ==========================


document.getElementById("btnEvolucao")
?.addEventListener(
"click",
()=>{


    window.location.href =
    "evolution.html";


});





document.getElementById("btnRanking")
?.addEventListener(
"click",
()=>{


    window.location.href =
    "ranking.html";


});







// ==========================
// INICIAR
// ==========================


atualizarNivel();

atualizarConquista();