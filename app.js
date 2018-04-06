var data = {
  questions: [
    {
      "category": "Test",
      "question": "Lorem ipsum dolor sit amet?",
      "answer": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus."
    },
    {
      "category": "Test2",
      "question": "2nd Lorem ipsum dolor sit amet?",
      "answer": "2nd Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus."
    },
    {
      "category": "Test3",
      "question": "3nd Lorem ipsum dolor sit amet?",
      "answer": "3nd Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus."
    },
    {
      "question": "4rd Lorem ipsum dolor sit amet?",
      "answer": "4rd Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus."
    },
    {
      "category": "Test",
      "question": "5nd Lorem ipsum dolor sit amet?",
      "answer": "5nd Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempora cum amet rem esse pariatur voluptatum sit harum perferendis, doloremque ullam natus, aliquid quis quisquam neque quae adipisci doloribus, voluptatibus."
    }
  ]
};

Vue.component('question',{
  props: ['question', 'answer'],
  template: `
    <div class="box" v-if="isEditable">
      <div class="media-content">
        <div class="content">

          <div class="hero is-small">
            <div class="hero-body">
              <div class="field">
                <div class="control">
                  <input class="input" type="text" :value="question" @input="this.question = $event.target.value"></input>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <textarea class="textarea" :value="answer" style="height: fit-content;"></textarea>
            </div>
          </div>

          <div class="level-right"><button class="button is-success is-small" type="submit" @click="editQuestion(this.isEditable)">Save</button></div>
        </div>
      </div>
    </div>


    <div class="box" v-else>
      <div class="media-content">
        <div class="content">

          <div class="hero is-small">
            <div class="hero-body">
              <h3 class="title">{{ question }}</h3>
            </div>
          </div>

          <p>{{ answer }}</p>

          <div class="level-right"><button class="button is-small" @click="editQuestion(this.isEditable)"><span class="icon-edit"></span></button></div>
        </div>
      </div>
    </div>
  `,

  data(){
    return {
      isEditable: false
    };
  },

  methods: {
    editQuestion(){
      if (this.isEditable === false) {
        return this.isEditable = true
      }
      else {
        return this.isEditable = false
      }
    }
  }
})

new Vue({
  el: '#content',
  data: {
    newQuestion: {
      //"category": this.category,
      "question": this.question,
      "answer": this.answer
    },
    questions: data.questions,
    output: ""
  },
  methods: {
    addQuestion() {
      var newQuestion = this.newQuestion
      var addingQuestion = new Object();
      //addingQuestion.category = newQuestion.category;
      addingQuestion.question = newQuestion.question;
      addingQuestion.answer =  newQuestion.answer;
      data.questions.push(addingQuestion);

      this.newQuestion = {"question": "", "answer": ""};
    },
    outputData() {
      this.output = "var data = {\nquestions: "
        + JSON.stringify(this.questions, null, 2)
        + "\n}"
    },

  },
  computed: {
    categorized: function() {
      function prepareQuestions(currentObj, question) {
        if (currentObj.hasOwnProperty(question.category)) {
          currentObj[question.category].push(question)
        }
        else {
          currentObj[question.category] = [question]
        }
        return currentObj
      }
      return this.questions.reduce(prepareQuestions, {})
    },
    categories: function() {
      return Object.keys(this.categorized);
    }
  }
})
