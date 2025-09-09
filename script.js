// 유저 값 입력
// +버튼 클릭 (할일 추가)
// delete 버튼을 누르면 할일 삭제
// check 버튼을 누르면 할일이 끝남, 밑줄
// 진행중 완료 탭을 누르면, 언더바 이동
// 진행중, 완료 탭을 누르면 해당하는 아이템만 나옴
// 전체탭을 누르면 전체 아이템으로 돌아옴
let horizontalUnderLine = document.getElementById("under-line");
let horizontalMenus = document.querySelectorAll("nav:first-child div");
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
addButton.addEventListener("click",addTask);
let taskList = [];
let mode = "all";
let filterList = [];

for(let i=1; i<tabs.length;i++){
  tabs[i].addEventListener("click",function(event){
    filter(event);
  });
}

function keyPress(e){
  if(e.keyCode == 13){
    addTask();
  }
}

function addTask(){
  // let taskContent = ;
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }
  if(taskInput.value == ""){
    alert("내용을 입력해주세요");
    return;
  }else{
    taskList.push(task);
    console.log(taskList);
    taskInput.value = "";
    render(mode);
  }
}

function render(mode){  
  // 내가 선택한 탭에 따라서 리스트를 달리 보여준다
  // all -> taskList
  // onGoing, done -> filterList
  let list = [];
  if(mode === "all"){
    list = taskList;
  }else if(mode === "onGoing"){
    list = filterList;
  }else{
    list = filterList;
  }

  let resultHTML = '';
  for(let i=0;i<list.length;i++){
    if(list[i].isComplete == true){
      resultHTML += `
      <div class="task">
        <div class="task-done task-content">${list[i].taskContent}</div>
        <div>
          <button class="toggle-done" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    }else{
      resultHTML += `
      <div class="task">
        <div class="task-content">${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
  // console.log(taskList);
}

function deleteTask(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList.splice(i,1);
      break;
    }
  }
  filter();
  // console.log(taskList);
}

function filter(event){
  mode = event.target.id;
  filterList = [];
  console.log("filter", mode);
  if(mode == "all"){
    render(mode);
  }else if(mode == "onGoing"){
    // 진행중 (isComplete == false)
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete == false){
        filterList.push(taskList[i]);
      }
    }
    render(mode);
  }else{
    // 완료 (isComplete == true)
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete == true){
        filterList.push(taskList[i]);
      }
    }
    render(mode);
  }
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

// 언더바 이동
function horizontalIndicator(e){
  horizontalUnderLine.style.left = e.currentTarget.offsetLeft + "px";
  horizontalUnderLine.style.width = e.currentTarget.offsetWidth + "px";
  horizontalUnderLine.style.top = e.currentTarget.offsetTop/4 + e.currentTarget.offsetHeight/4 - 1 + "px";
}

horizontalMenus.forEach(menu=>menu.addEventListener("click",(e)=>horizontalIndicator(e)));