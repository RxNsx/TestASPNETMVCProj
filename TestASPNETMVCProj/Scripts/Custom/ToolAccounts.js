$(document).ready(function () {
    loadData();
});

//Подгрузить все данные из БД без перезагрузки страницы
function loadData() {
    $.ajax({
        url: "/ToolAccounts/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr class="text-center">';
                html += '<td>' + item.ToolAccountId + '</td>';
                html += '<td>' + item.Tool.Name + '</td>';
                html += '<td>' + item.Worker.LastName + " " + item.Worker.FirstName + " " + item.Worker.MiddleName + '</td>';
                html += '<td class="d-flex justify-content-center"><button class="btn btn-danger" onclick="deleteuser(' + item.ToolAccountId + ')">Delete</select></td>'
                html += '</tr>'
            });

            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    })
}

//Добавление строки с кнопками для подтверждения добавления сотрудника в таблицу
function addrow() {
    $.ajax({
        url: "/ToolAccounts/GetLastTools",
        type: "GET",
        contentType: "application/json;cahrset=utf-8",
        dataType: "json",
        success: function (result) {

            var table = document.getElementById("table");
            var row = table.insertRow();

            row.setAttribute("id", "configuringRow");

            var cell = row.insertCell();
            cell = row.insertCell();

            //Дроплист с инструментами
            var dropListTool = document.createElement("select");
            dropListTool.setAttribute("id", "dropListTool");

            $.each(result, function (key, item) {

                if (item.toolsRemaining > 0) {

                    var option = document.createElement("option");
                    option.value = item.Id;
                    option.text = item.Name;
                    dropListTool.appendChild(option);
                }

            });
            cell.appendChild(dropListTool);

            //Добавляем вторую строку для кнопок
            row = table.insertRow();
            cell = row.insertCell();

            //Если список пустой - удалить отображение дроплиста, оставить только кнопку Отмены
            if (!$("#dropListTool").val()) {

                $("#dropListTool").remove();

                //Кнопка отменить
                cell = row.insertCell();
                cell.setAttribute("id", "canceladduserbtn");
                cell.setAttribute("type", "button");
                $('#canceladduserbtn').addClass("btn btn-danger");
                $('#canceladduserbtn').attr({
                    "onclick": "loadData()"
                });

                cell.innerHTML = "Отмена";
            }
            //Полный функционал  если в списке есть инструменты для выдачи
            else {

                //Кнопка добавить
                cell = row.insertCell();
                cell.setAttribute("id", "adduserbtn");
                $('#adduserbtn').addClass("btn btn-primary");
                $('#adduserbtn').attr({
                    "onclick": "add()"
                });
                cell.innerHTML = "Добавить"

                //Кнопка отменить
                cell = row.insertCell();
                cell.setAttribute("id", "canceladduserbtn");
                $('#canceladduserbtn').addClass("btn btn-danger");
                $('#canceladduserbtn').attr({
                    "onclick": "loadData()"
                });

                cell.innerHTML = "Отмена";
            }

            //Дроплист с рабочими
            getallworkers();
        }
    })
}

//Добавление второго дроплиста с данными работников
function getallworkers() {
    $.ajax({
        url: "/ToolAccounts/WorkerList",
        type: "GET",
        contentType: "application/json;cahrset=utf-8",
        dataType: "json",
        success: function (result) {

            var row = document.getElementById("configuringRow")
            var cell = row.insertCell();

            var dropListWorker = document.createElement("select");
            dropListWorker.setAttribute("id", "dropListWorker");

            $.each(result, function (key, item) {
                var option = document.createElement("option");
                option.value = item.WorkerId;
                option.text = item.LastName + " " + item.FirstName  + " " + item.MiddleName;
                dropListWorker.appendChild(option);
            });

            cell.appendChild(dropListWorker);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    })
}


//Добавление новых данных в сводную таблицу
function add() {
    var empObj = {
        ToolId: document.getElementById("dropListTool").value,
        WorkerId: document.getElementById("dropListWorker").value
    };

    $.ajax({
        url: "/ToolAccounts/AddToolsWorker",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function () {
            loadData();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    })
}

//Удаление конкретных данных из таблицы
function deleteuser(Id) {
    $.ajax({
        url: "/ToolAccounts/Delete/" + Id,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    })
}