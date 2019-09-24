class answers{
    constructor(useranswers = [], correctanswers = []){
        this.useranswers = useranswers;
        this.correctanswers = correctanswers;
    }
    correction(){
        for(let check of this.userguesses){
            return this.userguesses[check] == this.correctanswers;
        }
    }
    get correct(){
        return this.correction();
    }
}
function addquestions(){
    let allquestions = document.getElementById("amountofquestions");
    let chosenamount = allquestions.options[allquestions.selectedIndex].value;
    let category = document.querySelector('input[name="category"]:checked').value;
    let questionstohtml = document.getElementById("thequestions");    
    let randomquestions = [];
    let correctanswers = [];
    let wronganswers1 = [];
    let wronganswers2 = [];
    
    let randomfactor1;
    let randomfactor2;
    if(category == "math") {
    for(let specificquestion = 0; specificquestion < chosenamount;specificquestion++){
        randomfactor1 = Math.floor(Math.random() * 10 -1 + 1) + 1;
        randomfactor2 = Math.floor(Math.random() * 10 -1 + 1) + 1;

        randomquestions[specificquestion] = "What is: " +
        randomfactor1 + " * " + randomfactor2 + "?";

        correctanswers[specificquestion] = randomfactor1 * randomfactor2;
        wronganswers1[specificquestion] = randomfactor1 * randomfactor1;
        wronganswers2[specificquestion] = randomfactor1 * randomfactor2 + 1;

        let paragraph = document.createElement("p");
        let choices = document.createElement("select");
        let specifichoice1 = document.createElement("option");
        let specifichoice2 = document.createElement("option");
        let specifichoice3 = document.createElement("option");

        specifichoice1.textContent = wronganswers1[specificquestion];
        specifichoice2.textContent = correctanswers[specificquestion];
        specifichoice3.textContent = wronganswers2[specificquestion];
        

        choices.appendChild(specifichoice1);
        choices.appendChild(specifichoice2);
        choices.appendChild(specifichoice3);
        
        paragraph.id = "q" + specificquestion;
        paragraph.classList.add("hide");
        paragraph.innerHTML = randomquestions[specificquestion];
        paragraph.appendChild(choices);     
        questionstohtml.appendChild(paragraph);

    }
} else if (category == "general") {
    let questions = [
        "What is Earths' gravity value? ", 
        "How many calories is needed to raise 1 gram of water 1C(elsius)? ",
        "What is the speed of sound in dry air? ", 
        "Which animal is the fastest? ",
        "How man legs does a spider have?" ,
        "How many stomachs does 2 cows have together? ",
        "How can Alphabet inc(Google) know about coming flu seasons? ",
        "What sport does Tiger Woods play? "
    ]

    let answers = [
        "9.81",
        "1 calorie", 
        "343 m/s",

    ]
}
    localStorage.setItem("corr", correctanswers);

    document.getElementById("q0").classList.remove("hide");
    document.getElementById("add").disabled = true;
    document.getElementById("submit").disabled = false;

    if(chosenamount >1){
    document.getElementById("next").disabled = false;
    }
    
}
function next(){
    let pressedbutton = document.getElementById("next");
    let anotherbutton = document.getElementById("previous");
    let allquestions = document.getElementById("amountofquestions");
    let chosenamount = allquestions.options[allquestions.selectedIndex].value;
    let define = 0;
    
    for(let change = 0; change < chosenamount;change++){
        ++define; 
        
        if(pressedbutton.value==change){
           
           if(pressedbutton.value<chosenamount-1){
            let displayclass = document.getElementById("q" + define).classList.remove("hide");
            let hideclass = document.getElementById("q" + change).classList.add("hide");
            anotherbutton.disabled = false;
           }
           pressedbutton.value = define;
           anotherbutton.value = define;
           if(pressedbutton.value == chosenamount-1){
            pressedbutton.disabled=true;
        }
           break;
        }
                     
    }
}
function previous(){
    let pressedbutton = document.getElementById("previous");
    let anotherbutton = document.getElementById("next");
    let allquestions = document.getElementById("amountofquestions");
    let chosenamount = allquestions.options[allquestions.selectedIndex].value;
    let define = chosenamount-1;
    
    for(let change = chosenamount-1; 0<change;change--){
        --define;

        if(pressedbutton.value==change){
           
           if(pressedbutton.value>=0){
            let displayclass = document.getElementById("q" + define).classList.remove("hide");
            let hideclass = document.getElementById("q" + change).classList.add("hide");
            anotherbutton.disabled = false;
           }
           pressedbutton.value = define;
           anotherbutton.value = define;
           if(pressedbutton.value == 0){
            pressedbutton.disabled=true;
        }
           break;
        }
        
              
    }
}
function submit(){
    let question = document.getElementsByClassName("question"); 
    let question2array = Array.from(question);
    let valuefromquestion = question2array.map((element) => {
        if(element.value == null){
            return element.textContent;
        }
        return element.value;
    });
    console.log(valuefromquestion);
    
    let quiz = document.getElementsByClassName("quiz");
    let quiz2array = Array.from(quiz);
    let valuefromquiz = quiz2array.map((element) => {
        if(element.value == null){
            return element.textContent;
        }
        return element.value;
   
    });
    console.log(quiz2array);
    console.log(valuefromquiz);
    let test = localStorage.getItem("corr");
    
}
