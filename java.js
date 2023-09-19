const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "O que é cibersegurança?",
    answers: [
      { text: "Proteção de ecossistemas naturais.", correct: false },
      { text: "Proteção de sistemas, redes e dados contra ameaças cibernéticas.", correct: true },
      { text: "Um novo sistema operacional.", correct: false },
      { text: "Um novo software de edição de fotos.", correct: false },
    ]
  },
  {
    question: "Qual é a importância da cibersegurança?",
    answers: [
      { text: "Garantir a disponibilidade de produtos nas lojas.", correct: false },
      { text: "Manter a temperatura ideal em ambientes fechados.", correct: false },
      { text: "Prevenir danos físicos em dispositivos eletrônicos.", correct: false },
      { text: "Prevenir danos financeiros e proteger informações contra ameaças cibernéticas.", correct: true }
    ]
  },
  {
    question: 'O que é um ataque de phishing?',
    answers: [
      { text: "Uma tentativa de pescar em um rio.", correct: false },
      { text: "Um ataque de hackers usando técnicas de pesca submarina.", correct: false },
      { text: "Uma tentativa de enganar usuários para revelar informações pessoais através de comunicações falsas.", correct: true },
      { text: "Um tipo de ataque de jogadores de video game.", correct: false }
    ]
  },
  {
    question: "A autenticação de dois fatores (2FA) envolve o uso de duas senhas para acessar uma conta.",
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: "O que é um firewall?",
    answers: [
      { text: "Um dispositivo que protege contra incêndios florestais.", correct: false },
      { text: "Uma barreira física que impede a entrada de vírus em um sistema.", correct: false },
      { text: "Um componente de segurança que controla o tráfego de rede e protege contra ameaças externas.", correct: true },
      { text: "Um dispositivo para aquecer escritórios nos dias frios.", correct: false }
    ]
  },
  {
    question: 'Quais são os principais tipos de malware?',
    answers: [
      { text: 'Bactérias, vírus, fungos e protozoários.', correct: false },
      { text: 'Vírus, worms, trojans, ransomware e spyware.', correct: true },
      { text: 'Programas de TV, filmes, livros e músicas.', correct: false },
      { text: 'Laptops, smartphones, tablets e desktops.', correct: false }
    ]
  },
  {
    question: 'O que é uma vulnerabilidade de segurança?',
    answers: [
      { text: 'Um ponto fraco em um sistema de artes marciais.', correct: false },
      { text: 'Uma fraqueza em um sistema ou software que pode ser explorada por invasores.', correct: true },
      { text: 'Uma técnica de defesa contra ataques cibernéticos.', correct: false },
      { text: 'Um tipo de ataque de espionagem cibernética.', correct: false },
    ]
  },
  {
    question: 'Qual é a diferença entre um vírus e um worm de computador?',
    answers: [
      { text: 'Ambos são termos diferentes para o mesmo tipo de ameaça cibernética.', correct: false },
      { text: 'Um vírus é transmitido através de cabos de fibra ótica, enquanto um worm é transmitido via Wi-Fi.', correct: false },
      { text: 'Um vírus se anexa a arquivos, enquanto um worm é um programa autônomo que se espalha por redes.', correct: true },
      { text: 'Um vírus é inofensivo, enquanto um worm é malicioso.', correct: false },
    ]
  },
  {
    question: 'O que é criptografia?',
    answers: [
      { text: 'Um método de codificação de informações para proteger sua confidencialidade.', correct: true },
      { text: 'Um código de programação usado para criar jogos.', correct: false },
      { text: 'Um tipo de ataque cibernético.', correct: false },
      { text: 'Uma técnica de design de sites.', correct: false },
    ]
  },
  {
    question: 'O que é engenharia social em cibersegurança?',
    answers: [
      { text: 'Um processo de construção de pontes em ambientes digitais.', correct: false },
      { text: 'Um método de engenharia mecânica aplicado a sistemas cibernéticos.', correct: false },
      { text: 'Uma técnica em que os invasores manipulam psicologicamente indivíduos para obter informações confidenciais.', correct: false },
      { text: 'Um tipo de ataque de engenharia de software.', correct: true },
    ]
  },
]