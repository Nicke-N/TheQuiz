document.addEventListener("click", whichevent)
function whichevent(event) {

    var selections = [];
    var checkboxElems = document.querySelectorAll("input[type='checkbox']");

    
    for (var i = 0; i < checkboxElems.length; i++) {
      checkboxElems[i].addEventListener("click", displayCheck);
    }
    
    function displayCheck(e) {
      if (e.target.checked) {
        selections[e.target.id] = {
          name: e.target.name,
          value: e.target.value
        };
        for(let define = 0; define < selections.length;define++){
            if (e.target.name == selected[define].name){
                console.log(selections[define].name);
                delete selections[define];
            }
        }
      } 
      else {
        delete selections[e.target.id];
      }
      console.log(selections.name)
    }
}

class question {
    constructor(category, specificquestion = [], someanswers1 = [],
        someanswers2 = [], correctanswers = [],
        someanswer3 = [], alloptions = [], useranswer = []) {
        this.category = category;
        this.specificquestion = specificquestion;
        this.someanswers1 = someanswers1;
        this.someanswers2 = someanswers2;
        this.correctanswers = correctanswers;
        this.someanswer3 = someanswer3;
        this.alloptions = alloptions;
        this.useranswer = useranswer;
    }
    static correction() {
        let corrected = [];
        //this.correctanswers = correctanswers;
        for (let add = 0; add <= this.specificquestion.length + 1; add++) {
            corrected[add] = 0;
        }

        for (let eachquestion = 0; eachquestion < this.specificquestion.length; eachquestion++) {
            let catchanswer;

            for (let eachanswer = 0; eachanswer < this.useranswer[eachquestion].length; eachanswer++) {
                if (catchanswer == null) {
                    catchanswer = this.useranswer[eachquestion].charAt(eachanswer);
                } else {
                    catchanswer += this.useranswer[eachquestion].charAt(eachanswer);
                }
                
                if (catchanswer.includes('|')) {

                    catchanswer = catchanswer.substring(0, catchanswer.length - 1);
                    
                    if (catchanswer == this.correctanswers[eachquestion] || (this.category == "general" &&
                        catchanswer != "dunno" && catchanswer != null)) {
                        corrected[eachquestion] += 1;
                        corrected[this.specificquestion.length] += 1;
                        console.log(catchanswer + " is correct");
                    } else {
                        corrected[eachquestion] -= 1;
                        corrected[this.specificquestion.length + 1] += 1;
                        console.log(catchanswer + " is wrong");
                    }
                    catchanswer = null;
                }

                
            }
            if (catchanswer == this.correctanswers[eachquestion] || (this.category == "general" &&
                catchanswer != "dunno" && catchanswer != null)) {
                    corrected[eachquestion] += 1;
                    corrected[this.specificquestion.length] += 1;
                    console.log(catchanswer + " is correct");

                } else {
                    corrected[eachquestion] -= 1;
                    corrected[this.specificquestion.length + 1] += 1;
                    console.log(catchanswer + " is wrong");
                }
                catchanswer = null;
        }

        return corrected;
    }

    get correct() {
        return this.correction();
    }
    availablepoints(){
        var maxpoints = 0;
        if(this.category == "math") {
            for(let count = 0; count < this.specificquestion.length;count++){
                maxpoints +=1;
                if(this.correctanswers[count] == this.someanswers1[count]) {
                    maxpoints += 1;
                }
                if(this.correctanswers[count] == this.someanswers2[count]) {
                    maxpoints += 1;
                }
                if(this.correctanswers[count] == this.someanswer3[count]) {
                    maxpoints += 1;
                }
            }
            
        } else {
            for(let count = 0; count < this.specificquestion.length;count++){
                if (this.someanswer3[count] != "dunno" && catchanswer != null){
                    maxpoints += 2;
                } else {
                    maxpoints += 1;
                }

            }
           
        }
        
        return maxpoints;
    }
    get maxpoints(){
        return this.availablepoints();
    }
}
class quiz {
    constructor(name, availablequestions, correct, incorrect) {
        this.name = name;
        this.availablequestions = availablequestions;
        this.correct = correct;
        this.incorrect = incorrect;
    }
}

function addquestions() {
    let chooseamount = document.getElementById("amountofquestions");
    let chosenamount = chooseamount.options[chooseamount.selectedIndex].value;
    let category = document.querySelector('input[name="category"]:checked').value;
    let questionstohtml = document.getElementById("thequestions");
    let username = document.getElementById("name").value;
    if (!username == "") {
        let questions = [];
        let correctanswers = [];
        let someanswers1 = [];
        let someanswers2 = [];
        let someanswers3 = [];

        if (category == "math") {
            let randomfactor1;
            let randomfactor2;
            for (let specificquestion = 0; specificquestion < chosenamount; specificquestion++) {
                randomfactor1 = Math.floor(Math.random() * 10 - 1) + 1;
                randomfactor2 = Math.floor(Math.random() * 10 - 1) + 1;

                questions[specificquestion] = "What is: " + randomfactor1 +
                    " * " + randomfactor2 + "?";

                correctanswers[specificquestion] = randomfactor1 * randomfactor2;
                someanswers1[specificquestion] = randomfactor1 * randomfactor1;
                someanswers2[specificquestion] = randomfactor2 * randomfactor2;
                someanswers3[specificquestion] = randomfactor2 * randomfactor2 - randomfactor1;

                let division = document.createElement("div");
                let paragraph = document.createElement("p");
                let choices = document.createElement("form");
                
                let specifichoice1 = document.createElement("input");
                specifichoice1.setAttribute("type", "checkbox");
                specifichoice1.setAttribute("name", "answer" + specificquestion);
                specifichoice1.setAttribute("value", someanswers1[specificquestion]);
                specifichoice1.classList.add("some1");
                let label1 = document.createElement("label");
                label1.textContent = someanswers1[specificquestion];

                let specifichoice2 = document.createElement("input");
                specifichoice2.setAttribute("type", "checkbox");
                specifichoice2.setAttribute("name", "answer" + specificquestion);
                specifichoice2.setAttribute("value", correctanswers[specificquestion]);
                specifichoice2.classList.add("correct");
                let label2 = document.createElement("label");
                label2.textContent = correctanswers[specificquestion];

                let specifichoice3 = document.createElement("input");
                specifichoice3.setAttribute("type", "checkbox");
                specifichoice3.setAttribute("name", "answer" + specificquestion);
                specifichoice3.setAttribute("value", someanswers2[specificquestion]);
                specifichoice3.classList.add("some2");
                let label3 = document.createElement("label");
                label3.textContent = someanswers2[specificquestion];

                let specifichoice4 = document.createElement("input");
                specifichoice4.setAttribute("type", "checkbox");
                specifichoice4.setAttribute("name", "answer" + specificquestion);
                specifichoice4.setAttribute("value", someanswers3[specificquestion]);
                specifichoice4.classList.add("someanswer3");
                let label4 = document.createElement("label");
                label4.textContent = someanswers3[specificquestion];


                choices.appendChild(specifichoice1);
                choices.appendChild(label1);
                choices.appendChild(specifichoice2);
                choices.appendChild(label2);
                choices.appendChild(specifichoice3);
                choices.appendChild(label3);
                choices.appendChild(specifichoice4);
                choices.appendChild(label4);

                division.id = "div" + specificquestion;
                division.classList.add("hide");
                
                paragraph.innerHTML = questions[specificquestion];
                paragraph.classList.add("aQuestion");
                division.appendChild(paragraph);
                division.appendChild(choices);
                questionstohtml.appendChild(division);
                localStorage.setItem("questions", questions);
            }
        } else if (category == "general") {
            let questions = getJSON("https://www.mocky.io/v2/5d9389083000005b001b7580");
            let allquestions = [];
            for(let add = 0; add < questions.length;add++){
                allquestions[add] = questions[add];
            }

            correctanswers = [
                "9.81",
                "1 calorie",
                "343 m/s",
                "cat",
                "8",
                "4",
                "Through user searches",
                "Golf"
            ];


            someanswers1 = [
                "9.79",
                "2 calories",
                "300 m/s",
                "frog",
                "6",
                "8",
                "Through a new feedback-system",
                "Same sport as Roger Federer"
            ];

            someanswers2 = [
                "10",
                "10 calories",
                "250 m/s",
                "turtle",
                "10",
                "1",
                "Through telemarketing",
                "He doesn't"
            ];

            someanswers3 = [
                "dunno",
                "I prefer joule, so 4.184 Joule",
                "Approximately 0.34 km/s",
                "dunno",
                "More than me",
                "dunno",
                "dunno",
                "dunno"
            ];

            for (let specificquestion = 0; specificquestion < chosenamount; specificquestion++) {

                let division = document.createElement("div");
                let paragraph = document.createElement("p");
                let choices = document.createElement("form");

                let specifichoice1 = document.createElement("input");
                specifichoice1.setAttribute("type", "checkbox");
                specifichoice1.setAttribute("name", "answer" + specificquestion);
                specifichoice1.setAttribute("value", someanswers1[specificquestion]);
                specifichoice1.classList.add("some1");
                let label1 = document.createElement("label");
                label1.textContent = someanswers1[specificquestion];

                let specifichoice2 = document.createElement("input");
                specifichoice2.setAttribute("type", "checkbox");
                specifichoice2.setAttribute("name", "answer" + specificquestion);
                specifichoice2.setAttribute("value", correctanswers[specificquestion]);
                specifichoice2.classList.add("correct");
                let label2 = document.createElement("label");
                label2.textContent = correctanswers[specificquestion];

                let specifichoice3 = document.createElement("input");
                specifichoice3.setAttribute("type", "checkbox");
                specifichoice3.setAttribute("name", "answer" + specificquestion);
                specifichoice3.setAttribute("value", someanswers2[specificquestion]);
                specifichoice3.classList.add("some2");
                let label3 = document.createElement("label");
                label3.textContent = someanswers2[specificquestion];

                let specifichoice4 = document.createElement("input");
                specifichoice4.setAttribute("type", "checkbox");
                specifichoice4.setAttribute("name", "answer" + specificquestion);
                specifichoice4.setAttribute("value", someanswers3[specificquestion]);
                specifichoice4.classList.add("someanswer3");
                let label4 = document.createElement("label");
                label4.textContent = someanswers3[specificquestion];


                choices.appendChild(specifichoice1);
                choices.appendChild(label1);
                choices.appendChild(specifichoice2);
                choices.appendChild(label2);
                choices.appendChild(specifichoice3);
                choices.appendChild(label3);
                choices.appendChild(specifichoice4);
                choices.appendChild(label4);

                division.id = "div" + specificquestion;
                division.classList.add("hide");
                division.classList.add("checkchange");
                paragraph.innerHTML = questions[specificquestion];
                paragraph.classList.add("aQuestion");
                paragraph.id = "q" + specificquestion;
                division.appendChild(paragraph);
                division.appendChild(choices);
                questionstohtml.appendChild(division);
                localStorage.setItem("questions", allquestions);
            }
        }
        console.log(questions);
        
        document.getElementById("div0").classList.remove("hide");
        document.getElementById("settings").classList.add("hide");

        document.getElementById("submit").disabled = false;

        if (chosenamount > 1) {
            document.getElementById("next").disabled = false;
        }
    } else {
        alert("Enter the name, please!");
    }
}

function next() {
    let pressedbutton = document.getElementById("next");
    let anotherbutton = document.getElementById("previous");
    let allquestions = document.getElementById("amountofquestions");
    let chosenamount = allquestions.options[allquestions.selectedIndex].value;
    let define = 0;

    for (let change = 0; change < chosenamount; change++) {
        ++define;

        if (pressedbutton.value == change) {

            if (pressedbutton.value < chosenamount - 1) {
                let displayclass = document.getElementById("div" + define).classList.remove("hide");
                let hideclass = document.getElementById("div" + change).classList.add("hide");
                anotherbutton.disabled = false;
            }
            pressedbutton.value = define;
            anotherbutton.value = define;
            if (pressedbutton.value == chosenamount - 1) {
                pressedbutton.disabled = true;
            }
            break;
        }

    }
}

function previous() {
    let pressedbutton = document.getElementById("previous");
    let anotherbutton = document.getElementById("next");
    let allquestions = document.getElementById("amountofquestions");
    let chosenamount = allquestions.options[allquestions.selectedIndex].value;
    let define = chosenamount - 1;

    for (let change = chosenamount - 1; 0 < change; change--) {
        --define;

        if (pressedbutton.value == change) {

            if (pressedbutton.value >= 0) {
                let displayclass = document.getElementById("div" + define).classList.remove("hide");
                let hideclass = document.getElementById("div" + change).classList.add("hide");
                anotherbutton.disabled = false;
            }
            pressedbutton.value = define;
            anotherbutton.value = define;
            if (pressedbutton.value == 0) {
                pressedbutton.disabled = true;
            }
            break;
        }


    }
}

function submit() {
    let amount = document.getElementById("amountofquestions");
    let chosenamount = amount.options[amount.selectedIndex].value;
    let username = document.getElementById("name").value;
    let category = document.querySelector('input[name="category"]:checked').value;
    let wrongset1 = document.getElementsByClassName("some1");
    let wrongset2 = document.getElementsByClassName("some2");
    let correctset = document.getElementsByClassName("correct");
    let someanswer3 = document.getElementsByClassName("someanswer3");
    let specificquestionhtml = document.getElementsByClassName("aQuestion");
    
    document.getElementById("submit").disabled;
    document.getElementById("thequestions").classList.add("hide");
    document.getElementById("quizNav").classList.add("hide");
    document.getElementById("results").classList.remove("hide");

    let allquestions = localStorage.getItem("questions");
    let catchspecificquestion = Array.from(specificquestionhtml);
    let arrayofwrongset1 = Array.from(wrongset1);
    let arrayofwrongset2 = Array.from(wrongset2);
    let arrayofcorrectset = Array.from(correctset);
    let arrayofsomeanswer3set = Array.from(someanswer3);

    let realarrayofwrongset1 = arrayofwrongset1.map((element) => {
        if (element.value == null) {
            return element.textContent;
        } else {
            return element.value;
        }
    });

    let realarrayofwrongset2 = arrayofwrongset2.map((element) => {
        if (element.value == null) {
            return element.textContent;
        } else {
            return element.value;
        }
    });

    let realarrayofcorrect = arrayofcorrectset.map((element) => {
        if (element.value == null) {
            return element.textContent;
        } else {
            return element.value;
        }
    });

    let someanswers3 = arrayofsomeanswer3set.map((element) => {
        if (element.value == null) {
            return element.textContent;
        } else {
            return element.value;
        }
    });

    let specificquestions = catchspecificquestion.map((element) => {
        return element.textContent;
    });

    let usersanswer = [];

    for (let arrays2array = 0; arrays2array < chosenamount; arrays2array++) {
        let usersanswershtml = document.getElementsByName("answer" + arrays2array);
        let arrayofusersanswers = Array.from(usersanswershtml);
        let usersanswersfiltered = arrayofusersanswers.filter((element) => {

            return element.checked;

        });

        let usersanswersmapped = usersanswersfiltered.map((element) => {

            if (element.value == null) {
                return element.textContent;
            } else {
                return element.value;

            }
        });

        usersanswer[arrays2array] = usersanswersmapped.join("|");
    }

    let alloptions = [];
    for (let count = 0; count < someanswers3.length; count++) {
        alloptions[count] = realarrayofcorrect[count] + " | " +
            realarrayofwrongset1[count] + " | " + realarrayofwrongset2[count] +
            " | " + someanswers3[count];
    }
    let questioninfo = new question(
        category, specificquestions, realarrayofwrongset1,
        realarrayofwrongset2, realarrayofcorrect,
        someanswers3, alloptions, usersanswer);

    let pointsearned = questioninfo.correct;
    let score = 0;

    for(let add = 0; add < pointsearned.length-2;add++ ){
        score += Number(pointsearned[add]);

    }

        let quizinfo = new quiz(
            username, allquestions,
            pointsearned[specificquestions.length], pointsearned[specificquestions.length+1]);

        let tablebody = document.getElementById("tbody");
        let tablefoot = document.getElementById("tfoot");

        for (let info2table = 0; info2table < specificquestions.length; info2table++) {
            let tablerow = document.createElement("tr");
            let thequestion = document.createElement("td");
            let thealternatives = document.createElement("td");
            let theanswer = document.createElement("td");
            let pointearned = document.createElement("td");

            thequestion.textContent = questioninfo.specificquestion[info2table];

            thealternatives.textContent = questioninfo.alloptions[info2table];

            theanswer.textContent = questioninfo.useranswer[info2table];

            pointearned.textContent = pointsearned[info2table];

            tablerow.appendChild(thequestion);
            tablerow.appendChild(thealternatives);
            tablerow.appendChild(theanswer);
            tablerow.appendChild(pointearned);

            tablebody.appendChild(tablerow);
        }
        let tfootrow = document.createElement("tr");
        let maxscore = document.createElement("td");
        let correctguesses = document.createElement("td");
        let incorrectguesses = document.createElement("td");
        let userscore = document.createElement("td");

        maxscore.textContent = "Current Max points: " + questioninfo.maxpoints;
        correctguesses.textContent = "Correct guesses: " + quizinfo.correct;
        incorrectguesses.textContent = "Incorrect guesses: " + quizinfo.incorrect;
        userscore.textContent = "Score: " + score;

        tfootrow.appendChild(maxscore);
        tfootrow.appendChild(correctguesses);
        tfootrow.appendChild(incorrectguesses);
        tfootrow.appendChild(userscore);
        tablefoot.appendChild(tfootrow);

        let list = document.getElementById("list");
        let listitem1 = document.createElement("li");
        let listitem2 = document.createElement("li");
        let listitem3 = document.createElement("li");
        let listitem4 = document.createElement("li");
        let listitem5 = document.createElement("li");
        let listitem6 = document.createElement("li");

        listitem1.textContent = quizinfo.name + " chose the category: " + questioninfo.category;
        listitem2.textContent = "These questions are available: " + quizinfo.availablequestions;
        listitem3.textContent = "Correct guesses give 1 point.";
        listitem4.textContent = "Incorrent guesses and/or not answering give -1 point.";
        listitem5.textContent = "Missed points give 0 points.";
        
        if(score < Math.round(Number(maxscore)*0.5)){
            listitem6.textContent = "Test comment: You need more training.";
        } else if(score < Math.round(Number(maxscore)*0.7)){
            listitem6.textContent = "Test comment: You did well, I guess.";
        } else if(score <  Math.round(Number(maxscore)*0.85)){
            listitem6.textContent = "Test comment: You passed!.";
        } else if(score> Math.round(Number(maxscore)*0.85)) {
            listitem6.textContent = "Test comment: Well done!";
        } else{
            listitem6.textContent = "Test comment: Shit happens. Try getting a positive result.";
        }

        list.appendChild(listitem1);
        list.appendChild(listitem2);
        list.appendChild(listitem3);
        list.appendChild(listitem4);
        list.appendChild(listitem5);
        list.appendChild(listitem6);

    }

    function loadJSON(file, callback) {

        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, false);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") { //readystate 4 = done && status = done

                callback(xobj.responseText);

            }
        }
        xobj.send(null);

    }

    function getJSON(file) {
        let result = null;

        loadJSON(file, function (response) {
            result = JSON.parse(response);
        });
        return result;
    }