// ==========================
// RANKING FITQUEST
// ==========================


// Buscar alunos salvos

const alunos =

JSON.parse(
    localStorage.getItem("alunos")
) || {};



const matriculaAtual =

localStorage.getItem("matricula");




// ==========================
// USUÁRIO HEADER
// ==========================


const nomeUsuario =
document.getElementById("nomeUsuario");


if(nomeUsuario && alunos[matriculaAtual]){


    nomeUsuario.innerHTML =

    `${alunos[matriculaAtual].nome}`;


}





// ==========================
// CRIAR RANKING
// ==========================


let ranking =


Object.keys(alunos).map((matricula)=>{


    return {

        matricula: matricula,

        nome:
        alunos[matricula].nome,


        xp:
        alunos[matricula].xp || 0

    };


});





// Ordenar maior XP primeiro


ranking.sort((a,b)=>{

    return b.xp - a.xp;

});







// ==========================
// PODIUM
// ==========================


const podium =

document.getElementById("podium");



if(podium){


    podium.innerHTML = "";


    const top3 = ranking.slice(0,3);



    const ordem = [

        top3[1],

        top3[0],

        top3[2]

    ];



    const medalhas = [

        "🥈",

        "🥇",

        "🥉"

    ];




    ordem.forEach((aluno,index)=>{


    if(!aluno) return;



    podium.innerHTML += `

    <div class="position ${
        index === 0 ? "second" :
        index === 1 ? "first" :
        "third"
    }">


        <span>
            ${medalhas[index]}
        </span>


        <strong>
            ${aluno.nome}
        </strong>


        <p>
            ${aluno.xp} XP
        </p>


    </div>

    `;



    });


}








// ==========================
// LISTA COMPLETA
// ==========================


const lista =

document.getElementById(
"rankingList"
);



if(lista){


    lista.innerHTML = "";



    ranking.forEach((aluno,index)=>{


        const usuarioAtual =

        aluno.matricula === matriculaAtual;



        lista.innerHTML += `


        <div class="
        player 
        ${usuarioAtual ? "current" : ""}
        ">


            <span>

            ${index+1}º

            </span>



            <div>


                <strong>

                ${aluno.nome}

                </strong>



                ${
                usuarioAtual
                ?
                "<small>Você</small>"
                :
                ""
                }


            </div>




            <b>

            ${aluno.xp} XP

            </b>



        </div>


        `;



    });



}







// ==========================
// VOLTAR DASHBOARD
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