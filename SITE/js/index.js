var state = [];
let endpoint = 'https://localhost:7185/api/TodoList';
var idList = 0;

function setDefaultState() {
    var baseState = {};
    baseState = {
        status: "new",
        title: "Este site é para acompanhar suas tarefas"
    };
    pushToState(baseState.status, baseState.title)
}

async function pushToState(title, status) {
    console.log('passou aqui');
    (async () => {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                title: title, 
                status: status 
            }),
        });
        const content = await response.json();
        console.log('pushToState');
        console.log(content.id);
        idList = content.id;
  
    })();
}

async function deleteTodo(id) {
    (async () => {
        const response = await fetch(endpoint +'/'+ id, {
            method: "DELETE"
        });
    })();
    document.location.reload(true);
}

async function setToDone(id) {
    (async () => {
        const response = await fetch(endpoint +"/"+ id);
        const content = await response.json();
        if(id === content.id){
            var status ="new"; 
            if (content.status === "new") {
                status = "done";
            } else {
                status = "new";
            }

            const response1 = fetch(endpoint+ "?id="+ id , {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    id: content.id,
                    title: content.title,
                    status: status
                }),
            });
        }
    })();
}

async function getState() {
    var baseState = {};
    (async () => {
        const response = await fetch(endpoint);
        const content = await response.json();
        Object.keys(content).forEach(function(dt) {
            addItem(content[dt].title, content[dt].status, content[dt].id, true);
        });
    })();
}

async function getAll() {
    var baseState = {};
    (async () => {
        const response = await fetch(endpoint);
        const content = await response.json();
        Object.keys(content).forEach(function(dt) {
            baseState[content[dt].id] = {
                status: content[dt].status,
                title: content[dt].title
            };
        });
    })();
    return baseState;
}
async function addItem(text, status, id, noUpdate) {
    
    var c = status === "done" ? "danger" : "";
    var item =
        '<li data-id="' +
        id +
        '" class="animated flipInX ' +
        c +
        '"><div class="checkbox"><span class="close"><i class="fa fa-times"></i></span><label><span class="checkbox-mask"></span><input type="checkbox" />' +
        text +
        "</label></div></li>";

    var isError = $(".form-control").hasClass("hidden");

    if (text === "") {
        $(".err").removeClass("hidden").addClass("animated bounceIn");
    } else {
        $(".err").addClass("hidden");
        $(".todo-list").append(item);
    }

    $(".refresh").removeClass("hidden");

    $(".no-items").addClass("hidden");

    $(".form-control").val("").attr("placeholder", "✍️ Add item...");
    setTimeout(function () {
        $(".todo-list li").removeClass("animated flipInX");
    }, 500);

    if (!noUpdate) {
        pushToState(text, "new");
    }
}

function refresh() {
    $(".todo-list li").each(function (i) {
        $(this)
        .delay(70 * i)
        .queue(function () {
            $(this).addClass("animated bounceOutLeft");
            $(this).dequeue();
        });
    });

    setTimeout(function () {
        $(".todo-list li").remove();
        $(".no-items").removeClass("hidden");
        $(".err").addClass("hidden");
    }, 800);
}

$(function () {
    var err = $(".err"),
    formControl = $(".form-control"),
    isError = formControl.hasClass("hidden");

    if (!isError) {
        formControl.blur(function () {
        err.addClass("hidden");
        });
    }

    $(".add-btn").on("click", function () {
        var itemVal = $(".form-control").val();
        console.log('itemVal');
        console.log(itemVal);
        addItem(itemVal);
        formControl.focus();
    });

    $(".refresh").on("click", refresh);

    $(".todo-list").on("click", 'input[type="checkbox"]', function () {
        var li = $(this).parent().parent().parent();
        li.toggleClass("danger");
        li.toggleClass("animated flipInX");
        setToDone(li.data().id);

        setTimeout(function () {
        li.removeClass("animated flipInX");
        }, 500);
    });

    $(".todo-list").on("click", ".close", function () {
        var box = $(this).parent().parent();

        if ($(".todo-list li").length == 1) {
        box
            .removeClass("animated flipInX")
            .addClass("animated                bounceOutLeft");
        setTimeout(function () {
            box.remove();
            $(".no-items").removeClass("hidden");
            $(".refresh").addClass("hidden");
        }, 500);
        } else {
        box.removeClass("animated flipInX").addClass("animated bounceOutLeft");
        setTimeout(function () {
            box.remove();
        }, 500);
        }

        deleteTodo(box.data().id);
    });

    $(".form-control").keypress(function (e) {
        if (e.which == 13) {
        var itemVal = $(".form-control").val();
        addItem(itemVal);
        }
    });
    $(".todo-list").sortable();
    $(".todo-list").disableSelection();
});

$(document).ready(function () {
    getState();
});


var todayContainer = document.querySelector(".today");

var d = new Date();

var weekday = new Array(7);
weekday[0] = "Domingo 🖖";
weekday[1] = "Segunda 💪😀";
weekday[2] = "Terça 😜";
weekday[3] = "Quarta 😌☕️";
weekday[4] = "Quinta 🤗";
weekday[5] = "Sexta 🍻";
weekday[6] = "Abado 😴";


var n = weekday[d.getDay()];


var randomWordArray = Array(
  "Oh meu, é ",
  "Uau, é ",
  "Parece que é ",
  "Incrível, é ",
  "Tenha um boa ",
  "Aproveite sua "
);

var randomWord =
  randomWordArray[Math.floor(Math.random() * randomWordArray.length)];

todayContainer.innerHTML = randomWord + n;