// ==========================
// NÍVEIS DO FITQUEST
// ==========================

const niveis = [

    {
        nivel: 1,
        titulo: "Iniciante",
        xpMinimo: 0,
        xpProximo: 300
    },

    {
        nivel: 2,
        titulo: "Atleta em Evolução",
        xpMinimo: 300,
        xpProximo: 700
    },

    {
        nivel: 3,
        titulo: "Guerreiro Fitness",
        xpMinimo: 700,
        xpProximo: 1200
    },

    {
        nivel: 4,
        titulo: "Elite Fitness",
        xpMinimo: 1200,
        xpProximo: 2000
    },

    {
        nivel: 5,
        titulo: "Mestre Fitness",
        xpMinimo: 2000,
        xpProximo: 3000
    }

];




// ==========================
// LOGIN
// ==========================

const btnEntrar =
document.getElementById("btnEntrar");


if(btnEntrar){


    btnEntrar.addEventListener("click",()=>{


        const matricula =
        document.getElementById("matricula")
        .value.trim();


        const nome =
        document.getElementById("nome")
        .value.trim();



        if(!matricula || !nome){

            alert("Preencha todos os campos!");

            return;

        }



        localStorage.setItem(
            "matricula",
            matricula
        );


        localStorage.setItem(
            "aluno",
            nome
        );



        criarAluno();



        window.location.href =
        "dashboard.html";


    });

}



// ==========================
// CRIAR / BUSCAR ALUNO
// ==========================


function criarAluno(){


    const matricula =
    localStorage.getItem("matricula");


    let alunos =
    JSON.parse(
        localStorage.getItem("alunos")
    ) || {};



    if(!alunos[matricula]){


        alunos[matricula] = {

            nome:
            localStorage.getItem("aluno"),

            xp:0,

            treinosTotal:0,

            treinosSemana:0,

            ultimoTreino:null,

            historico:[],

            conquistas:[]

        };


        salvarAlunos(alunos);

    }



    return alunos[matricula];

}




function salvarAlunos(alunos){


    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );

}





function alunoAtual(){


    const matricula =
    localStorage.getItem("matricula");


    let alunos =
    JSON.parse(
        localStorage.getItem("alunos")
    ) || {};



    return alunos[matricula];

}




// ==========================
// SAUDAÇÃO
// ==========================


function obterSaudacao(){


    const hora =
    new Date().getHours();



    if(hora < 12){

        return "Bom dia";

    }


    if(hora < 18){

        return "Boa tarde";

    }


    return "Boa noite";

}





const saudacao =
document.getElementById("saudacao");



if(saudacao){


    saudacao.innerHTML =
    `${obterSaudacao()}, ${localStorage.getItem("aluno")}!`;

}



const nomeUsuario =
document.getElementById("nomeUsuario");



if(nomeUsuario){


    nomeUsuario.innerHTML =
    `${localStorage.getItem("aluno")}`;

}






// ==========================
// ATUALIZAR NÍVEL
// ==========================


function atualizarNivel(){


    const aluno =
    alunoAtual();



    if(!aluno) return;



    const xp =
    aluno.xp;



    const nivelAtual =

    niveis.find((nivel)=>{

        return xp >= nivel.xpMinimo &&
        xp < nivel.xpProximo;

    }) || niveis[4];





    const nivel =
    document.getElementById("nivel");



    const titulo =
    document.getElementById("tituloNivel");



    const xpElemento =
    document.getElementById("xpAtual");



    const proximo =
    document.getElementById("proximoNivel");




    if(nivel){

        nivel.innerHTML =
        `Nível ${nivelAtual.nivel}`;

    }



    if(titulo){

        titulo.innerHTML =
        nivelAtual.titulo;

    }



    if(xpElemento){

        xpElemento.innerHTML =
        `${xp} XP`;

    }




    if(proximo){


        const falta =
        nivelAtual.xpProximo - xp;



        proximo.innerHTML =

        falta > 0 ?

        `${falta} XP para alcançar o nível ${nivelAtual.nivel + 1}`

        :

        "Nível máximo alcançado!";


    }





    const barra =
    document.querySelector(
        ".progress-value"
    );



    if(barra){


        const progresso =

        ((xp - nivelAtual.xpMinimo) /

        (nivelAtual.xpProximo - nivelAtual.xpMinimo))

        *100;



        barra.style.width =
        `${progresso}%`;

    }


}






// ==========================
// CONQUISTA SEMANAL
// ==========================


function atualizarConquista(){


    const aluno =
    alunoAtual();



    if(!aluno) return;



    const progresso =
    Math.min(
        aluno.treinosSemana / 5 * 100,
        100
    );



    const texto =
    document.getElementById(
        "progressoConquista"
    );



    if(texto){


        texto.innerHTML =
        `${aluno.treinosSemana}/5 treinos`;

    }



    const barra =
    document.querySelector(
        ".achievement-value"
    );



    if(barra){

        barra.style.width =
        `${progresso}%`;

    }

}





// ==========================
// XP DO TREINO
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
            xp = 100;
            break;


        case "perna":
            xp = 150;
            break;


        case "cardio":
            xp = 80;
            break;


        case "fullbody":
            xp = 200;
            break;

    }



    if(dificuldade.value === "medio"){

        xp += 50;

    }



    if(dificuldade.value === "dificil"){

        xp += 100;

    }



    return xp;

}





const xpReceber =
document.getElementById("xpReceber");



if(xpReceber){


    const treino =
    document.getElementById("tipoTreino");


    const dificuldade =
    document.getElementById("dificuldade");



    function atualizarPreview(){


        xpReceber.innerHTML =
        `+${calcularXP()} XP`;

    }



    treino.addEventListener(
        "change",
        atualizarPreview
    );


    dificuldade.addEventListener(
        "change",
        atualizarPreview
    );


    atualizarPreview();

}






// ==========================
// CONFIRMAR CHECK-IN
// ==========================


const btnConfirmar =
document.getElementById(
    "btnConfirmarTreino"
);



if(btnConfirmar){


btnConfirmar.addEventListener(
"click",
()=>{


    const matricula =
    localStorage.getItem("matricula");



    let alunos =
    JSON.parse(
        localStorage.getItem("alunos")
    );



    let aluno =
    alunos[matricula];



    const hoje =
    new Date()
    .toISOString()
    .split("T")[0];





    if(aluno.ultimoTreino === hoje){


        alert(
        "Você já realizou treino hoje 💪"
        );


        return;

    }





    const ganho =
    calcularXP();



    aluno.xp += ganho;


    aluno.treinosTotal++;


    aluno.treinosSemana++;


    aluno.ultimoTreino =
    hoje;



    aluno.historico.push({

        data:hoje,

        treino:
        document.getElementById("tipoTreino").value,

        dificuldade:
        document.getElementById("dificuldade").value,

        xp:ganho

    });





    if(
        aluno.treinosSemana >=5 &&
        !aluno.conquistas.includes(
            "Foco Semanal"
        )
    ){

        aluno.conquistas.push(
            "Foco Semanal"
        );


        aluno.treinosSemana = 0;


    }





    alunos[matricula] =
    aluno;



    salvarAlunos(alunos);



    alert(
    `Treino concluído! +${ganho} XP`
    );



    window.location.href =
    "dashboard.html";


});


}





// ==========================
// INICIALIZAÇÃO
// ==========================


atualizarNivel();

atualizarConquista();