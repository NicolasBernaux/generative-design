class Form {
  constructor(questions) {
    this.questions = questions;
    this.questionIndex = 0;
    this.score = 0;
    this.dom = {
      container: document.getElementById("container"),
      card: null
    };
  }

  getScore() {
    return this.score;
  }

  addScore(value) {
    this.score += parseInt(value, 10);
  }

  onQuestionClick(event) {
    event = event || window.event;
    const target = event.target || event.srcElement;
    const value = target.dataset.value;
    this.addScore(value);

    this.questionIndex++;
    this.dom.card.remove();
    if (this.questionIndex < this.questions.length) {
      this.render();
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

    this.questions[this.questionIndex].choices.forEach((choice) => {
      const $choice = document.createElement("li");
      $choice.classList.add("question");
      $choice.textContent = choice.title;
      $choice.dataset.value = choice.value;
      $choice.addEventListener("click", (event) => this.onQuestionClick(event));
      askContainer.appendChild($choice);
    });
  }
}

export default Form;
