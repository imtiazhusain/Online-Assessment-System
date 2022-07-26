
                
                const resultContainer = document.querySelector('.quizSuccess');
                const quizContainer = document.querySelector('.quizContiner');
                const question = document.querySelector('.question');
                const optionA= document.querySelector('#lOptionA');
          
                const optionB= document.querySelector('#lOptionB');
                const optionC= document.querySelector('#lOptionC');
                const optionD= document.querySelector('#lOptionD');
                const answers = document.querySelectorAll('.radiobtn')



// countdown potion
const countDownEl= document.querySelector('#countdown');
const startingMinutes = quizDurationMnts;
let time = startingMinutes * 60;

setInterval(updateCountdown,1000);

function updateCountdown(){


    const minutes = Math.floor(time/60);
    let seconds = time % 60

    if(seconds < 0){
        console.log('time is over');
    countDownEl.innerHTML = `00:00`

    }else{
        seconds = seconds < 10 ? '0' + seconds : seconds

        countDownEl.innerHTML = `${minutes}:${seconds}`
        time--;
    }

   


}








                // const correctAns= document.querySelector('#optionA');

                    let questionCount = 0;
                    var score = 0;
                  let quizCODE = quizQuestions[0][6]
                  let quizDATE = quizQuestions[0][7]
                  let quizTIME = quizQuestions[0][8]

                  console.log("quoz code ..." + quizCODE)
           
                const loadQuestion= ()=>{
                    // const questionList = quizDB[];
                    question.innerText = quizQuestions[questionCount][0];
                    optionA.innerText = quizQuestions[questionCount][1];
                    optionB.innerText = quizQuestions[questionCount][2];
                    optionC.innerText = quizQuestions[questionCount][3];
                    optionD.innerText = quizQuestions[questionCount][4];
                    // console.log(optionA);
                    // console.log(questionList.optionB);
                }
                loadQuestion()
    
    
           function getCheckAnswers(){
               let ans;
                    answers.forEach((currentRadioBtn) =>{
                        
                        if(currentRadioBtn.checked){
                            ans = currentRadioBtn.id
                        }
                    })
                    return ans
                }

     function  deSelectALl(){
         answers.forEach((currentRadioBtn)=>{
            currentRadioBtn.checked = false;
         })
     }
                function loadNextQuestion(){
                    const checkedAnswer = getCheckAnswers();
                    console.log(checkedAnswer);
                    console.log(quizQuestions[questionCount][5]);
                    if(checkedAnswer == quizQuestions[questionCount][5]){
                        score++;
                   
                        console.log('correct');
                    }
                    questionCount++;
                    deSelectALl()
                    if(questionCount<noOfQuestions){
                        loadQuestion()
                    }else{
                      
                        console.log('your score is' + score);
                        score = score + '/' + quizSize;
                        console.log(score)
                        function postScore(score){
                            // axios.post('/result',score).then(res =>{
                            //     console.log(res);
                            // })
                            axios({
                                method:'post',
                                url: '/result',
                                data:{
                                    score:score,
                                    quizCode:quizCODE,
                                    quizDate:quizDATE,
                                    quizTime:quizTIME
                                }
                            }).then(res =>{
                                console.log(res);
                            })
                        }
                        
                         postScore(score)
                        resultContainer.style.display = "block";
                        quizContainer.style.display = "none";
                    }
                }

            


