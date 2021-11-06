document.addEventListener('DOMContentLoaded', function () {
    let param_x;
    let param_y;
    let param_r;

    function getXmlHttpReq() {
        let req = new XMLHttpRequest();
        try {
            if (window.XMLHttpRequest) {
                req = new XMLHttpRequest();
            } else {
                if (window.ActiveXObject) {
                    try {
                        req = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (e) {
                        req = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                }
            }
        } catch (ex) {
        }
        return req;
    }

    function sendRequest(command, args) {
        let result = "";
        let auth = document.getElementById("auth").value;
        if (auth == "false") {
            result = prompt("Введите кодовое слово", "");
            result = "Bearer " + result;
        }
        const req = getXmlHttpReq();
        const url = 'controller?' + 'command=' + command.toString() +
            '&args=' + args.toString();
        req.open("GET", url, true);
        req.setRequestHeader("Authorization", result);
        req.addEventListener("readystatechange", () => {
            try {
                if (req.readyState === 4 && req.status === 200) {
                    window.location.href = '../index.xhtml';
                }
                if (req.readyState === 4 && req.status === 401) {
                    alert("Проверка на Сервер не прошла");
                }
            } catch (e) {
                alert("Проверка на Сервер не прошла");
            }
        });
        req.send();
        /*$.ajax({
            type: 'GET',
            url: 'controller',
            data: {
                "command": command,
                "args": args
            },
            headers: {'Authorization': result},
            success: function () {
                window.location.href = '/web2-1.0-SNAPSHOT/index.xhtml';
            },
            error: function () {
                alert("Проверка на Сервер не прошла");
            }
        });*/
    }

    document.querySelectorAll('input[name="rCheckBox"]').forEach(x => x.addEventListener("change", (function () {
                if (x.checked) {
                    let boxes = document.querySelectorAll('input[name="rCheckBox"]');
                    for (let box of boxes) {
                        if (x.value != box.value) {
                            box.checked = false;
                        }
                    }
                } else x.checked = true;
            }
        )
        )
    );

    document.querySelector("input[type=text]").addEventListener('focus', function (e) {
        e.preventDefault();
        document.querySelector('#inputX').classList.remove('errorY');
    });
    document.querySelector("#reset").addEventListener('click', function (e) {
        e.preventDefault();
        clear();
        sendRequest("clear", "");
    });

    function clear() {
        document.getElementById('result-table').getElementsByTagName("tbody")[0].innerHTML = document.getElementById("result-table").rows[0].innerHTML;
        document.getElementById("inputX").value = "";
        document.querySelector("#inputX").classList.remove('errorY');
        document.querySelectorAll('input[name="rCheckBox"]').forEach(x => x.checked = false);
        document.getElementById('defaultBox').checked = true;
        document.getElementById('selectY').selectedIndex = 0;
    }

    document.querySelector('#changeColor').addEventListener('click', function (e) {
        e.preventDefault();
        if (document.querySelector("body").classList.contains('dark-body')) {
            sendRequest("color", "0");
        } else {
            sendRequest("color", "1");
        }
    });

    document.querySelector("svg").addEventListener('mousedown', function (e) {
        if (checkR()) {
            param_x = (e.offsetX - 100) / 80 * param_r;
            param_y = (100 - e.offsetY) / 80 * param_r;
            sendRequestWithArgs();
        } else {
            alert('Не выбран радиус R!');
        }
    })

    function sendRequestWithArgs() {
        let result = "";
        let auth = document.getElementById("auth").value;
        if (auth == "false") {
            result = prompt("Введите кодовое слово", "");
            result = "Bearer " + result;
        }
        const req = getXmlHttpReq();
        const url = 'controller?' + 'x=' + param_x.toString() +
            '&y=' + param_y.toString() +
            '&r=' + param_r.toString();
        req.open("GET", url, true);
        req.setRequestHeader("Authorization", result);
        req.addEventListener("readystatechange", () => {
            try {
                if (req.readyState === 4 && req.status === 200) {
                    window.location.href = '../index.xhtml';
                }
                if (req.readyState === 4 && req.status === 401) {
                    alert("Проверка на Сервер не прошла");
                }
            } catch (e) {
                alert("Проверка на Сервер не прошла");
            }
        });
        req.send();
       /* $.ajax({
            type: 'GET',
            url: 'controller',
            data: {
                'x': param_x,
                'y': param_y,
                'r': param_r,
            },
            headers: {'Authorization': result},
            success: function () {
                //window.location.href = '/web2-1.0-SNAPSHOT/index.xhtml';
            },
            error: function () {
                alert("Проверка на Сервер не прошла");
            }
        });*/
    }

    document.querySelectorAll('input[name="rCheckBox"]').forEach(r => r.addEventListener('change', function () {
        let x, y;
        checkR();
        document.querySelectorAll('circle').forEach(point => {
            x = point.getAttribute('data-x');
            y = point.getAttribute('data-y');
            r = point.getAttribute('data-r');
            x = 80 * x / param_r + 100;
            y = -80 * y / param_r + 100;
            if (r == param_r && point.classList.contains('old-coord')) {
                point.classList.remove("old-coord");
                point.classList.add("coord");
            } else if (r != param_r && point.classList.contains("coord")) {
                point.classList.add("old-coord");
                point.classList.remove("coord");
            }
            point.setAttribute('cx', x + 'px');
            point.setAttribute('cy', y + 'px');
        });
    }))

    function checkR() {
        let boxes = document.querySelectorAll('input[name="rCheckBox"]');
        for (let elem in boxes) {
            if (boxes[elem].checked)
                param_r = boxes[elem].value;
        }
        return true;
    }

    document.querySelector("#submit").addEventListener('click', function (e) {
        e.preventDefault();

        function checkX() {
            let line = document.querySelector("#inputX").value;
            line = line.replace(",", ".");
            let regex = /^[-]?[0-9]{1,17}([.][0-9]{1,17}|[0-9]{0,17})$/;
            let OK = regex.exec(line);
            let x = parseFloat(line);
            const MAX = 5;
            const MIN = -5;
            if (!isNaN(x) && x > MIN && x < MAX && OK) {
                param_x = x;
                document.querySelector('#inputX').classList.remove('errorY');
                return true;
            } else {
                return false;
            }
        }

        function checkY() {
            let select = document.getElementById('selectY');
            param_y = select.options[select.selectedIndex].value;
            return true;
        }

        if (checkY() && checkX() && checkR()) {
            sendRequestWithArgs();
        } else {
            document.querySelector('#inputX').classList.add('errorY');
        }
    })
});