class Form {
  constructor(ask) {
    this.ask = ask;
    this.count = 0;
    this.indexOfAsk = 0;
  }

  getCount() {
    return this.count;
  }

  updateCount(value) {
    this.count += parseInt(value);
  }

  onClickQuestion(element) {
    element = element || window.event;
    const target = element.target || element.srcElement;
    const value = target.dataset.value;
    const questions = document.querySelectorAll(".question");
    questions.forEach((element) => element.parentNode.removeChild(element));
    this.indexOfAsk++;
    this.updateCount(value);
    if (this.indexOfAsk >= this.ask.length) {
      // End of questionnaire
      document
        .querySelector(".card")
        .parentNode.removeChild(document.querySelector(".card"));
    } else {
      this.start();
    }
  }

  start() {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h1");
    title.classList.add("title-ask");
    card.appendChild(title);

    const _ask = document.createElement("ul");
    _ask.classList.add("ask");
    card.appendChild(_ask);

    document.getElementById("container").appendChild(card);

    this.titleAsk = document.querySelector(".title-ask");
    this.askContainer = document.querySelector(".ask");

    this.titleAsk.innerHTML = this.ask[this.indexOfAsk].question;

    for (
      let index = 0;
      index < this.ask[this.indexOfAsk].responses.length;
      index++
    ) {
      const question = document.createElement("li");
      question.classList.add("question");
      question.innerHTML = this.ask[this.indexOfAsk].responses[index].title;
      question.dataset.value = this.ask[this.indexOfAsk].responses[index].value;
      question.addEventListener("click", (element) =>
        this.onClickQuestion(element)
      );
      this.askContainer.appendChild(question);
    }
  }
}

export default Form;
