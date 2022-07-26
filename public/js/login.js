var stu=  document.getElementById("studentLogin");
var tea =  document.getElementById("teacherLogin");
console.log("hello workd")
document.getElementsByTagName("button").style.backgroundColor="yellow"
function show(index){
    if(index == 0){
        tea.style.display="none"
        stu.style.display="block"
        teabtn.style.backgroundColor="#084177" 
        stubtn.style.backgroundColor="white"      
        stubtn.style.color="black"
   teabtn.style.color="white"


    }
    if(index == 1){
      stu.style.display="none"
    tea.style.display="block"
     stubtn.style.backgroundColor="#084177"      
   teabtn.style.backgroundColor="white" 
   teabtn.style.color="black" 
   stubtn.style.color="white"

      
    }
}

