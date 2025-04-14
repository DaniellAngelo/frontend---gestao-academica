const apiAluno = "http://localhost:8081/alunos";
const apiDisciplina = "http://localhost:8082/disciplinas";
const apiNota = "http://localhost:8083/notas";

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.style.display = "none";
  });
  document.getElementById(tabId).style.display = "block";
}

async function cadastrarAluno() {
  const nome = document.getElementById("aluno-nome").value;
  const matricula = document.getElementById("aluno-matricula").value;
  const res = await fetch(apiAluno, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nome, matricula })
  });
  await listarAlunos();
}

async function listarAlunos() {
  const res = await fetch(apiAluno);
  const alunos = await res.json();
  const lista = document.getElementById("lista-alunos");
  lista.innerHTML = alunos.map(a => `<li>${a.nome} - ${a.matricula} (ID: ${a.id})</li>`).join("");
}

async function cadastrarDisciplina() {
  const nome = document.getElementById("disciplina-nome").value;
  const codigo = document.getElementById("disciplina-codigo").value;
  await fetch(apiDisciplina, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nome, codigo })
  });
  await listarDisciplinas();
}

async function listarDisciplinas() {
  const res = await fetch(apiDisciplina);
  const disciplinas = await res.json();
  const lista = document.getElementById("lista-disciplinas");
  lista.innerHTML = disciplinas.map(d => `<li>${d.nome} - ${d.codigo} (ID: ${d.id})</li>`).join("");
}

async function cadastrarNota() {
  const alunoId = document.getElementById("nota-aluno-id").value;
  const disciplinaId = document.getElementById("nota-disciplina-id").value;
  const valor = document.getElementById("nota-valor").value;
  await fetch(apiNota, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ alunoId, disciplinaId, valor })
  });
  await listarNotas();
}

async function listarNotas() {
  const res = await fetch(apiNota);
  const notas = await res.json();
  const lista = document.getElementById("lista-notas");
  lista.innerHTML = notas.map(n => `<li>Aluno ${n.alunoId} - Disciplina ${n.disciplinaId}: Nota ${n.valor}</li>`).join("");
}

// Carregar listas ao iniciar
listarAlunos();
listarDisciplinas();
listarNotas();
