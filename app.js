let timeSelectionButtons = document.querySelectorAll('.time-selection-button');
let managingButtonsContainer = document.getElementById('manageButton-Container');
let mainSection = document.getElementById('panel-container');
//* ------------------------------
let button_WHITE = document.getElementById('timeButton_WHITE');
let button_BLACK = document.getElementById('timeButton_BLACK');
let selectedTime = null;
let timer_WHITE = null;
let timer_BLACK = null;
let time_WHITE = 0;
let time_BLACK = 0; 

timeSelectionButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        selectedTime = event.target.getAttribute('data-time');
        localStorage.setItem('selectedTime', selectedTime);
        window.location.href = "panel.html";
    });
});

function startTimer() {
    managingButtonsContainer.style.display = "none";
    mainSection.style.display = "flex";

    const [minutes, seconds] = localStorage.getItem("selectedTime").split(":").map(Number);
    selectedTime = minutes * 60 + seconds;
  
    time_WHITE = selectedTime;
    time_BLACK = selectedTime;
  
    updateButton(button_WHITE, time_WHITE);
    updateButton(button_BLACK, time_BLACK);
  
    startWhiteTimer();
    button_WHITE.style.background = "darkgreen";
  }

  function startWhiteTimer() {
    clearInterval(timer_WHITE); // Vor dem Starten sicherstellen, dass kein Timer läuft
    clearInterval(timer_BLACK); // Stoppe auch den anderen Timer
    timer_WHITE = setInterval(() => {
        if (time_WHITE > 0) {
            time_WHITE--;
            updateButton(button_WHITE, time_WHITE);
        } else {
            clearInterval(timer_WHITE);
            alert("Time for White ran out, BLACK WINS!");
        }
    }, 1000);
}

function startBlackTimer() {
    clearInterval(timer_BLACK);
    clearInterval(timer_WHITE);
    timer_BLACK = setInterval(() => {
        if (time_BLACK > 0) {
            time_BLACK--;
            updateButton(button_BLACK, time_BLACK);
        } else {
            clearInterval(timer_BLACK);
            alert("Time for Black ran out, WHITE WINS!");
        }
    }, 1000);
}

if (button_WHITE) {
    button_WHITE.addEventListener('click', () => {
        startBlackTimer();
        button_WHITE.style.background = "rgba(0, 100, 0, 0.3)";
        button_BLACK.style.background = "darkgreen";
    });
}

if (button_BLACK) {
    button_BLACK.addEventListener('click', () => {
        startWhiteTimer();
        button_BLACK.style.background = "rgba(0, 100, 0, 0.3)";
        button_WHITE.style.background = "darkgreen";
    });
}

function pauseTimers() {
    clearInterval(timer_WHITE);
    clearInterval(timer_BLACK);
  }

function updateButton(button, time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    button.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

function returnToHome() {
    if (confirm("Are you sure you want to abandon this session and return to home?")) {
        window.location.href = "index.html";
        localStorage.removeItem("selectedTime");
    }
}
