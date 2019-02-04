class Form {
  constructor(questions) {
    this.questions = questions;
    this.questionIndex = 0;
    this.score = 0;
    this.dom = {
      container: document.getElementById("container"),
      card: null
    };
    this.progression = 0;
    this.soundClick = new Audio("public/audio/sound_clic_others_buttons.mp3");
  }

  addScore(value) {
    this.score += parseInt(value, 10);
  }

  changeProgression() {
    this.progression = this.questionIndex / this.questions.length;
  }

  emitEvent() {
    const event = new CustomEvent("changeScore", {
      detail: {
        score: this.score,
        progression: this.progression
      }
    });
    document.dispatchEvent(event);
  }

  onQuestionClick(event) {
    event = event || window.event;
    const target = event.target || event.srcElement;
    const value = target.dataset.value;
    this.questionIndex++;

    this.addScore(value);
    this.changeProgression();
    this.emitEvent();

    this.soundClick.play();

    this.dom.card.classList.remove("card-visible");

    setTimeout(() => {
      this.dom.card.remove();
      if (this.questionIndex < this.questions.length) {
        this.render();
      }
    }, 1000);
  }

  render() {
    this.dom.card = document.createElement("div");
    this.dom.card.classList.add("card");

    const titleAsk = document.createElement("h1");
    titleAsk.classList.add("title-ask");
    this.dom.card.appendChild(titleAsk);

    const askContainer = document.createElement("ul");
    askContainer.classList.add("ask");
    this.dom.card.appendChild(askContainer);

    this.dom.container.appendChild(this.dom.card);

    titleAsk.textContent = this.questions[this.questionIndex].question;

    this.questions[this.questionIndex].choices
      .sort(() => {
        return 0.5 - Math.random();
      })
      .forEach((choice) => {
        const $choice = document.createElement("li");
        $choice.classList.add("question");
        $choice.textContent = choice.title;
        $choice.dataset.value = choice.value;
        $choice.addEventListener("click", (event) =>
          this.onQuestionClick(event)
        );
        askContainer.appendChild($choice);
      });
    setTimeout(() => {
      this.dom.card.classList.add("card-visible");
    }, 10);
  }
}

export default Form;
