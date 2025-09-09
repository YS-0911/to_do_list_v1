// 언더바 이동
let horizontalUnderLine = document.getElementById("under-line");
let horizontalMenus = document.querySelectorAll("nav:first-child a");

function horizontalIndicator(e){
  horizontalUnderLine.style.left = e.currentTarget.offsetLeft + "px";
  horizontalUnderLine.style.width = e.currentTarget.offsetWidth + "px";
  horizontalUnderLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 16 + "px";
}

horizontalMenus.forEach(menu=>menu.addEventListener("click",(e)=>horizontalIndicator(e)));

// 유저 값 입력
// +버튼 클릭 (할일 추가)
// delete 버튼을 누르면 할일 삭제
// check 버튼을 누르면 할일이 끝남, 밑줄
// 진행중 완료 탭을 누르면, 언더바 이동
// 진행중, 완료 탭을 누르면 해당하는 아이템만 나옴
// 전체탭을 누르면 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
addButton.addEventListener("click",addTask);
let taskList = [];

taskInput.addEventListener("click",()=>{
  taskInput.value = "";
})

function addTask(){
  // let taskContent = ;
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }
  taskList.push(task);
  console.log(taskList);
  render()
}

function render(){
  let resultHTML = '';
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].isComplete == true){
      resultHTML += `
      <div class="task">
        <div class="task-done task-content">${taskList[i].taskContent}</div>
        <div>
          <button class="toggle-done" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
          <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    }else{
      resultHTML += `
      <div class="task">
        <div class="task-content">${taskList[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
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
  render();
  console.log(taskList);
}

function deleteTask(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList.splice(i,1);
      break;
    }
  }
  render();
  console.log(taskList);
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}
