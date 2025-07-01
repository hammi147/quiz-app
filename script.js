
if (window.location.pathname.includes("signup.html")) {
  document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    localStorage.setItem("quiz_username", username);
    localStorage.setItem("quiz_password", password);

    alert("Signup successful! Please login.");
    window.location.href = "index.html";
  });
}


if (window.location.pathname.includes("index.html")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const inputUsername = document.getElementById("loginUsername").value.trim();
    const inputPassword = document.getElementById("loginPassword").value.trim();

    const storedUsername = localStorage.getItem("quiz_username");
    const storedPassword = localStorage.getItem("quiz_password");

    if (inputUsername === storedUsername && inputPassword === storedPassword) {
     localStorage.setItem("quiz_currentUser", inputUsername);
      alert("Login successful!");
      window.location.href = "quiz.html";
    } else {
      alert("❌ Invalid username or password.");
    }
  });
}


if (window.location.pathname.includes("quiz.html")) {
  const questions = [
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Media Language"],
      correct: "HyperText Markup Language"
    },
    {
      question: "Which HTML tag is used to define a paragraph?",
      options: ["<p>", "<para>", "<text>", "<pg>"],
      correct: "<p>"
    },
    {
        question: "Which property is used to change text color in CSS?",
    options: ["background-color", "color", "text-color", "font-color"],
    correct: "color"
    },
    {
    question: "Which symbol is used for comments in CSS?",
    options: ["//", "<!-- -->", "/* */", "#"],
    correct: "/* */"
  },{
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    correct: "<script>"
  },
   {
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
    options: ["msgBox('Hello World')", "alert('Hello World')", "msg('Hello World')", "alertBox('Hello World')"],
    correct: "alert('Hello World')"
  },
  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheet", "Colorful Style Sheet", "Creative Style Sheet", "Cascading Style Sheets"],
    correct: "Cascading Style Sheets"
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    correct: "Float"
  },
  {
    question: "Which tag is used to link an external CSS file in HTML?",
    options: ["<style>", "<link>", "<css>", "<script>"],
    correct: "<link>"
  },
  {
    question: "Which method is used to add a new element at the end of an array in JavaScript?",
    options: ["push()", "pop()", "append()", "insert()"],
    correct: "push()"
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function:myFunction()", "function = myFunction()", "function myFunction()", "def myFunction()"],
    correct: "function myFunction()"
  },
  {
    question: "What is the default position value of an HTML element?",
    options: ["fixed", "static", "relative", "absolute"],
    correct: "static"
  },
  {
    question: "Which HTML tag is used to display a picture on a webpage?",
    options: ["<pic>", "<image>", "<img>", "<src>"],
    correct: "<img>"
  },
  {
    question: "Which attribute is used to provide an alternate text for an image?",
    options: ["alt", "src", "title", "caption"],
    correct: "alt"
  },
  {
    question: "How can you make a numbered list in HTML?",
    options: ["<ul>", "<list>", "<ol>", "<dl>"],
    correct: "<ol>"
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["Aonmouseover", "onchange", "onclick", "onmouseclick"],
    correct: "onclick"
  },
  {
    question: "Which input type defines a slider control?",
    options: ["range", "slider", "scroll", "scale"],
    correct: "range"
  },
  {
    question: "What does the `this` keyword refer to in JavaScript (inside object)?",
    options: ["The browser", "The parent function", "The current object", "Global window"],
    correct: "The current object"
  },
  {
    question: "Which CSS unit is relative to the root element?",
    options: ["em", "px", "rem", "%"],
    correct: "C. rem"
  },
  {
    question: "Which tag is used for creating hyperlinks in HTML?",
    options: ["<link>", "<a>", "<href>", "<hyper>"],
    correct: "<a>"
  }
    
  ];

  let currentIndex = 0;
  let score = 0;
  let totalTime = 20 * 60; 
  let questionTime = 60;   

  const questionText = document.getElementById("questionText");
  const optionsList = document.getElementById("optionsList");
  const nextBtn = document.getElementById("nextBtn");
  const totalTimerEl = document.getElementById("totalTimer");
  const questionTimerEl = document.getElementById("questionTimer");

  let totalTimer, questionTimer;

  function loadQuestion() {
    if (currentIndex >= questions.length) {
      endQuiz();
      return;
    }

    const q = questions[currentIndex];
    questionText.textContent = `Q${currentIndex + 1}: ${q.question}`;
    optionsList.innerHTML = "";
    nextBtn.style.display = "none";

    const labels = ["A", "B", "C", "D"];

    q.options.forEach((opt, index) => {
      const li = document.createElement("li");
      li.innerText = `${labels[index]}. ${opt}`;
      li.className = "option";
      li.setAttribute("data-answer", opt);
      li.addEventListener("click", () => selectOption(li, q.correct));
      optionsList.appendChild(li);
    });

    questionTime = 60;
  }

  function selectOption(selected, correctAnswer) {
    const options = document.querySelectorAll(".option");

    options.forEach(opt => {
      opt.style.pointerEvents = "none"; 
    });

    const selectedText = selected.getAttribute("data-answer");

    if (selectedText === correctAnswer) {
      selected.style.background = "lightgreen";
      score++;
    }

    nextBtn.style.display = "inline-block";
  }

  nextBtn.onclick = () => {
    currentIndex++;
    loadQuestion();
  };

  function updateDisplay(el, time) {
    const m = String(Math.floor(time / 60)).padStart(2, '0');
    const s = String(time % 60).padStart(2, '0');
    el.textContent = `${m}:${s}`;
  }

  function startTimers() {
    totalTimer = setInterval(() => {
      totalTime--;
      updateDisplay(totalTimerEl, totalTime);
      if (totalTime <= 0) endQuiz();
    }, 1000);

    questionTimer = setInterval(() => {
      questionTime--;
      updateDisplay(questionTimerEl, questionTime);
      if (questionTime <= 0) {
        currentIndex++;
        loadQuestion();
      }
    }, 1000);
  }

  function endQuiz() {
    clearInterval(totalTimer);
    clearInterval(questionTimer);
    const percentage = (score / questions.length) * 100;
    localStorage.setItem("quiz_result", percentage);
    window.location.href = "result.html";
  }

  loadQuestion();
  startTimers();
}
