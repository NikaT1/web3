$(function () {
    let param_x;
    let param_y;
    let param_r;

    document.querySelectorAll('.x-button').forEach(x => x.addEventListener("mousedown", (function () {
                param_x.classList.remove("x-button-choose");
                param_x.classList.add("x-button");
                x.classList.add("x-button-choose");
                x.classList.remove("x-button");
                document.getElementById("main-f:inputX").value = x.innerText;
                param_x = x;
            }
        )
        )
    );

    document.querySelector("input[type=text]").addEventListener('focus', function (e) {
        document.getElementById('main-f:inputY').classList.remove('errorY');
    });

    document.querySelector("svg").addEventListener('mousedown', function (e) {
        if (checkR()) {
            param_x = (e.offsetX - 100) / 80 * param_r;
            param_y = (100 - e.offsetY) / 80 * param_r;
            document.getElementById('main-f:inputY').value = String(param_y).substr(0,4);
            document.getElementById("main-f:inputX").value = String(param_x).substr(0,4);
            document.getElementById("main-f:submit").click();
        } else {
            alert('Не выбран радиус R!');
        }
    });

    document.getElementById("main-f:inputR").addEventListener('change', function () {
        let x, y, r;
        checkR();
        document.querySelectorAll('.coord').forEach(point => {
            x = point.getAttribute('data-x');
            y = point.getAttribute('data-y');
            r = point.getAttribute('data-r');
            x = 80 * x / param_r + 100;
            y = -80 * y / param_r + 100;
            if (r === param_r && point.classList.contains('old-coord')) {
                point.classList.remove("old-coord");
                point.classList.add("coord");
            } else if (r != param_r && point.classList.contains("coord")) {
                point.classList.add("old-coord");
                point.classList.remove("coord");
            }
            point.setAttribute('cx', x + 'px');
            point.setAttribute('cy', y + 'px');
        });
    });

    function init() {
        param_x = document.getElementById('main-f:x-button-default');
        if (!param_x.classList.contains("x-button-choose")) {
            param_x.classList.add("x-button-choose");
            param_x.classList.remove("x-button");
        }
        document.getElementById("main-f:inputX").value = param_x.innerText;
    }

    function checkX() {
        let arrayX = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
        let x = document.getElementById("main-f:inputX").value;
        if (!isNaN(parseInt(x)) && isFinite(parseInt(x)) && arrayX.includes(parseInt(x))) {
            param_x = parseInt(x);
            return true;
        } else return false;
    }

    function checkR() {
        let arrayR = [1, 2, 3, 4, 5];
        let select = document.getElementById("main-f:inputR");
        let r = select.options[select.selectedIndex].value;
        if (!isNaN(parseInt(r)) && isFinite(parseInt(r)) && arrayR.includes(parseInt(r))) {
            param_r = parseInt(r);
            return true;
        } else return false;
    }

    function checkY() {
        let line = document.getElementById('main-f:inputY').value;
        line = line.replace(",", ".");
        let regex = /^[-]?[0-9]{1,17}([.][0-9]{1,17}|[0-9]{0,17})$/;
        let OK = regex.exec(line);
        const MAX = 5;
        const MIN = -3;
        if (OK && !isNaN(parseFloat(line)) && isFinite(parseFloat(line)) && parseFloat(line) > MIN && parseFloat(line) < MAX) {
            param_y = parseFloat(line.substr(0,3));
            return true;
        } else {
            document.getElementById('main-f:inputY').classList.add('errorY');
            return false;
        }
    }

    function checkAll() {
        return checkY() && checkX() && checkR();
    }

    function rectangle() {
        return param_x <= 0 && param_x >= -param_r && param_y <= 0 && param_y >= -param_r;
    }

    function triangle() {
        return param_x >= 0 && param_x <= param_r && param_y >= 0 && param_y <= param_r - param_x;
    }

    function circle() {
        return param_x >= 0 && param_x <= param_r && param_y <= 0 && param_y * param_y >= -param_x * param_x + param_r * param_r;
    }

    function drawAll() {
        //ggggfffffgggggggggg
    }

    function drawPoint() {
        let point = document.createElementNS("http://www.w3.org/2000/svg",'circle');
        point.setAttribute('cx', param_r/80*param_x+100);
        point.setAttribute('cy', -param_r/80*param_y+100);
        point.setAttribute('r', 3);
        point.setAttribute('data-x', param_x);
        point.setAttribute('data-y', param_y);
        if (rectangle() || triangle() || circle())
            point.classList.add("good-coord");
        else point.classList.add("bad-coord");
        document.getElementById("svg").appendChild(point);
    }

    document.getElementById("main-f:reset").addEventListener('click', function (e) {
        document.querySelectorAll(".good-coord").forEach(x => x.remove());
        document.querySelectorAll(".bad-coord").forEach(x => x.remove());
        document.querySelectorAll(".old-coord").forEach(x => x.remove());
    });

    document.getElementById("main-f:submit").addEventListener('click', function (e) {
        if (checkAll()) {
            drawPoint();
        } else {
            e.preventDefault();
        }
    });
    init();
    drawAll();
});