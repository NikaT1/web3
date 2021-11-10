$(function () {
    let param_x;
    let param_y;
    let param_r;

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
        document.querySelector('#inputX').classList.remove('errorY');
    });

    function clear() {
        document.getElementById('result-table').getElementsByTagName("tbody")[0].innerHTML = document.getElementById("result-table").rows[0].innerHTML;
        document.getElementById("inputX").value = "";
        document.querySelector("#inputX").classList.remove('errorY');
        document.querySelectorAll('input[name="rCheckBox"]').forEach(x => x.checked = false);
        document.getElementById('defaultBox').checked = true;
        document.getElementById('selectY').selectedIndex = 0;
    }

    document.querySelector("svg").addEventListener('mousedown', function (e) {
        if (checkR()) {
            param_x = (e.offsetX - 100) / 80 * param_r;
            param_y = (100 - e.offsetY) / 80 * param_r;
            ///sssssss
        } else {
            alert('Не выбран радиус R!');
        }
    });
/*
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
*/
    function init() {
        param_x = document.getElementById('main-f:x-button-default');
        param_x.classList.add("x-button-choose");
        param_x.classList.remove("x-button");
        document.getElementById("main-f:inputX").value = param_x.innerText;
    }

    function checkR() {
        let boxes = document.querySelectorAll('input[name="rCheckBox"]');
        for (let elem in boxes) {
            if (boxes[elem].checked)
                param_r = boxes[elem].value;
        }
        return true;
    }

    /* document.querySelector("#submit").addEventListener('click', function (e) {
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
             //dddddddddd
         } else {
             document.querySelector('#inputX').classList.add('errorY');
         }
     })*/
    init();
});