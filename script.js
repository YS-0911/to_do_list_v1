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
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render()
}

function render(){
  let resultHTML = '';
  for(let i=0;i<taskList.length;i++){
    resultHTML += `
      <div class="task">
        <div>${taskList[i]}</div>
        <div>
          <button>Check</button>
          <button>Delete</button>
        </div>
      </div>`;
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}
