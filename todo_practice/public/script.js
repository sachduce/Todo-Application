console.log("Is script file loading");
const RESPONSE_DONE =4;
const STATUS_OK = 200;
const TODOS_LiST_ID = "todo_list_id";
function add_todo_list(id, tools_data_json){
    var parent = document.getElementById(id);
    parent.innerHTML = tools_data_json;
}
function getTodoAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos", true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState ==RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                add_todo_list(TODOS_LiST_ID, xhr.responseText);

            }
        }
    }
    xhr.send(data= null);
}