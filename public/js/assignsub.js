const dropZone= document.querySelector(".drop_zone");
const fileInput=document.querySelector("#fileInput");
const browseBtn=document.querySelector(".browseBtn");

const fileUrl= "https://innshares.herokuapp.com/ "
const uploadUrl= `${fileUrl}api/files`;

dropZone.addEventListener("dragover", (e)=>{
  e.preventDefault();
  if (!dropZone.classList.add("dragged")){
    dropZone.classList.add("dragged")
  }
});
dropZone.addEventListener("dragleave", ()=>{
  dropZone.classList.remove("dragged")
});

dropZone.addEventListener("drop", (e)=>{
  e.preventDefault();
  dropZone.classList.remove("dragged")
  const files= e.dataTransfer.files;
  console.log(files);
  if(files.length){
    fileInput.files=files;
    uploadFile();
  }
 
});

// browseBtn.addEventListener("click",()=>{
//   fileInput.click()
// });

// const uploadFile= () =>{
//   const file=fileInput.files[0];
//   const formData =new FormData();
//   formData.append("myfile",file);

//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = ()=>{
//     if(xhr.readyState===XMLHttpRequest.DONE){
//       console.log(xhr.response)
//     }
//   };
//   xhr.open("POST", "http://127.0.0.1:5500/test");
//   console.log(xhr.open("POST", uploadUrl));
//   xhr.send(formData);

//   // xhr.open("POST",formData.action, true);
//   // xhr.send(formData);
// };