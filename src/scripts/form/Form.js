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
    this.soundHover = new Audio("public/audio/slim.mp3");
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
    if (this.dom.card.classList.contains("card-visible")) {
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

        const title1 = document.createElement("span");
        const title2 = document.createElement("button");
        title1.textContent = choice.title;
        title2.textContent = choice.title;
        $choice.classList.add("button-container-1");
        title1.classList.add("mas");

        //title2.classList.add("button2");

        $choice.appendChild(title1);
        $choice.appendChild(title2);

        $choice.classList.add("question");
        $choice.dataset.value = choice.value;
        $choice.addEventListener("mouseover", () => {
          this.soundHover.currentTime = 0;
          this.soundHover.play();
        });
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
