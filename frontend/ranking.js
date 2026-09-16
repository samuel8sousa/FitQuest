// ==========================
// RANKING FITQUEST
// ==========================

const nomeUsuario =
document.getElementById("nomeUsuario");


if(nomeUsuario){

    const aluno =
    alunos[matriculaAtual];


    nomeUsuario.innerHTML =
    `${aluno.nome} `;

}

// Buscar alunos

const alunos =

JSON.parse(

localStorage.getItem("alunos")

) || {};





const matriculaAtual =

localStorage.getItem("matricula");





// Transformar objeto em lista

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





// Ordenar por XP

ranking.sort((a,b)=>{


    return b.xp - a.xp;


});







// ==========================
// PODIUM
// ==========================


const podium =

document.getElementById(
"podium"
);



if(podium){


let top3 = ranking.slice(0,3);



let ordem = [

top3[1],

top3[0],

top3[2]

];



let medalhas = [

"🥈",

"🥇",

"🥉"

];




ordem.forEach((aluno,index)=>{


    if(!aluno) return;



    podium.innerHTML += `

    <div class="position">

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


ranking.forEach((aluno,index)=>{


    const usuarioAtual =

    aluno.matricula === matriculaAtual;




    lista.innerHTML += `


    <div class="player ${usuarioAtual ? "current" : ""}">


        <span>
            ${index + 1}º
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