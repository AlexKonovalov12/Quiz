// next prev
var divs = $('.show-section section');
var now = 0; // currently shown div
divs.hide().first().show(); // hide all divs except first

function next() {
    divs.eq(now).hide();
    now = (now + 1 < divs.length) ? now + 1 : 0;
    divs.eq(now).show();
    window.scrollTo(0, 0)
}

$(".prev").click(function () {
    divs.eq(now).hide();
    now = (now > 0) ? now - 1 : divs.length - 1;
    divs.eq(now).show(); // show previous
});


$(".file").on('change', function (e) {
    // alert("file is selected");
    var filename = e.target.files[0].name;
    $(".filename").text(filename);
    $(".upload-counter-hide").addClass("upload-counter-show");
    $(".uploading-number-e").addClass("uploading-number");
});

// change style on change
$(document).on('change', '.selection-field select', function () {
    $(this).addClass("selected")
});

//   step-5

$(document).ready(function () {
    makeActive();
    $(".hire-field-detail input[type=radio]").on("change", function () {
        makeActive();
    });
});
function makeActive() {
    $(".hire-field-detail input[type=radio]").each(function () {
        if ($(this).prop("checked")) {
            $(this).closest('.hire-field').find(".hire-field-icon").addClass("active");
        } else {
            $(this).closest('.hire-field').find(".hire-field-icon").removeClass("active");
        }
    });
}


// disable on enter
$('form').on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
});


function plural(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

var declension = ['год', 'года', 'лет'];


// form validiation
var inputschecked = false;


function formvalidate(stepnumber) {
    // check if the required fields are empty
    inputvalue = $("#step" + stepnumber + " :input").not("button").map(function () {
        if (this.value.length > 0) {
            $(this).removeClass('invalid');
            return true;

        }
        else {

            if ($(this).prop('required')) {
                $(this).addClass('invalid');
                return false
            }
            else {
                return true;
            }

        }
    }).get();


    // console.log(inputvalue);

    inputschecked = inputvalue.every(Boolean);

    // console.log(inputschecked);
}

let phoneInput = document.getElementById('phone')
phoneInput.addEventListener('click', function () {
    if (phoneInput.value == '') {
        phoneInput.value = '+7'
    }
})


function validPhone() {
    let regExp = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
    let phoneInput = document.getElementById('phone');
    let phoneInputValue = document.getElementById('phone').value;
    let phoneMessage = document.getElementById('message');
    let valid = regExp.test(phoneInputValue);
    let output = ''
    function checkPhoneArray() {
        let arr = Array.from(phoneInputValue);
        if (arr.length > 5) {
            arr.splice(0, 5)
            return arr.every(elem => elem == arr[0])
        } else {
            return true
        }  
    }
    if (valid && !checkPhoneArray()) {
        phoneInput.style.border = 'solid 1px green'
    }
    else {
        output = 'Номер телефона введен неправильно!';
        phoneMessage.style.color = 'red'
        phoneInput.style.border = 'solid 1px red'
    };
    phoneMessage.innerHTML = output;
    return (valid && !checkPhoneArray());
}

phoneInput.addEventListener('input', validPhone)



$(document).ready(function () {
    // check step1
    $("#step1btn").on('click', function () {
        formvalidate(1);


        if (inputschecked == false) {
            formvalidate(1);
        }
        else {
            next();
        }
    })

    let roomsArray = Array.from(document.querySelectorAll('.text-radio-field')).splice(0, 8);
    let imagesArray = Array.from(document.querySelectorAll('.room_image'));
    let sum = Array.from(document.querySelectorAll('.sum'));
    let currentSum = '';
    let resultImages = Array.from(document.querySelectorAll('.result_image'));
    let resultSum = document.querySelector('.result_sum');

    function hideImages() {
        imagesArray.forEach((element) => {
            if (element.classList.contains('image_active')) {
                element.classList.remove('image_active');
            }
        })

        resultImages.forEach((item) => {
            if (item.classList.contains('image_active')) {
                item.classList.remove('image_active');
            }
        });
    };

    roomsArray.forEach((el) => {
        el.addEventListener('click', function () {
            if (imagesArray[roomsArray.indexOf(el)].classList.contains('image_active')) {
                imagesArray[roomsArray.indexOf(el)].classList.remove('image_active')
            } else {
                hideImages();
                imagesArray[roomsArray.indexOf(el)].classList.add('image_active');
                resultImages[roomsArray.indexOf(el)].classList.add('image_active');
                el.scrollIntoView();
                currentSum = sum[roomsArray.indexOf(el)].textContent;
                output.innerHTML = (parseInt(currentSum.replace(/\D/g, '')) * 15 / 100).toLocaleString("ru");
                resultSum.innerHTML = sum[roomsArray.indexOf(el)].textContent;
            }
            return currentSum
        })
    });

    let creditList = Array.from(document.querySelectorAll('.credit_container'));
    let textCredit = imagesArray.splice(8, 5);
    let minPercentsArray = Array.from(document.querySelectorAll('.min_percent'));
    let percentResult = document.querySelector('.percent_result');
    let minPercent = '';

    creditList.forEach((el) => {
        el.addEventListener('click', function () {
            if (textCredit[creditList.indexOf(el)].classList.contains('image_active')) {
                textCredit[creditList.indexOf(el)].classList.remove('image_active')
            } else {
                textCredit.forEach((el) => {
                    if (el.classList.contains('image_active')) {
                        el.classList.remove('image_active')
                    }
                })
                textCredit[creditList.indexOf(el)].classList.add('image_active')
                percentResult.innerHTML = minPercentsArray[creditList.indexOf(el)].textContent;
            }
        })
    });


    var slider = document.getElementById("myRange");
    var slider2 = document.getElementById("myRange2");
    let output = document.getElementById("currentrange");
    let percent = document.getElementById('percent');
    let years = document.getElementById('years');
    let firstSum = document.querySelector('.result_first_sum');

    percent.innerHTML = slider.value;

    slider.oninput = function () {
        output.innerHTML = (this.value * parseInt(currentSum.replace(/\D/g, '')) / 100).toLocaleString("ru");
        percent.innerHTML = this.value
        var value = (this.value - this.min) / (this.max - this.min) * 100
        this.style.background = 'linear-gradient( 90deg, rgb(244,85,26) 0%, rgb(255,143,55) ' + value + '%, rgb(228, 239, 251) ' + value + '%, rgb(228, 239, 251) 100%)'
        firstSum.innerHTML = (this.value * parseInt(currentSum.replace(/\D/g, '')) / 100).toLocaleString("ru");
    };

    slider2.oninput = function () {
        //  output.innerHTML = (this.value * parseInt(currentSum.replace(/\D/g, '')) / 100).toLocaleString("ru");
        years.innerHTML = this.value;
        $("#yearsText").html(plural(this.value, declension));
        var value2 = (this.value - this.min) / (this.max - this.min) * 100
        this.style.background = 'linear-gradient( 90deg, rgb(244,85,26) 0%, rgb(255,143,55) ' + value2 + '%, rgb(228, 239, 251) ' + value2 + '%, rgb(228, 239, 251) 100%)'
        //   firstSum.innerHTML = (this.value * parseInt(currentSum.replace(/\D/g, '')) / 100).toLocaleString("ru");
    };

    // check step2
    $("#step2btn").on('click', function () {
        formvalidate(2);

        if (inputschecked == false) {
            formvalidate(2);
        }


        else {

            let cash = 0;
            let yscr = 30;

            $(".step2radio").each(function () {

                if ($(this).is(':checked')) {
                    textCredit = $(this).val();
                }
            });
            if (textCredit == 'За наличный расчет') {

            }
            else {
                $("#formCredit").show();
                $("#creditBlock").show();
                $("#tcr").show();
                $("#tcr2").show();
                if (textCredit == 'Ипотека для молодых семей' || textCredit == 'Ипотека для врачей и учителей') {
                    $(".yearsRange li").each(function () {
                        $(this).css("width", "210px");
                    })
                    yscr = 20;
                    $("#myRange2").attr("max", yscr);
                }
                else $("#liCredit").css("display", "flex");

            }
            next();
        }
    })

    // check step3
    $("#step3btn").on('click', function () {
        formvalidate(3);


        if (inputschecked == false) {
            formvalidate(3);
        }

        else {
            next();
        }
    })



    // check step4
    $("#step4btn").on('click', function () {
        formvalidate(4);
        validPhone()

        let sumApart = $(".result_sum").html();
        sumApart = sumApart.replaceAll(' ', '');
        sumApart = sumApart.replaceAll('₽', '');
        let percentCredit = $(".percent_result").html();
        percentCredit = percentCredit.replaceAll('%', '');
        percentCredit = percentCredit.replaceAll(',', '.');
        let yearsCredit = $("#years").html();
        $("#yearsCredit").html(yearsCredit + " " + plural(yearsCredit, declension));
        let sumFirst = $("#currentrange").html();
        $("#sumFirst").html(sumFirst + "₽");
        sumFirst = sumFirst.replaceAll('&nbsp;', '');

        let budget = $("#budget").val();


        if (budget && budget != 0) {
            $("#matSum").html(budget + "₽");
            $("#matBlock").show();
            budget = budget.replaceAll(' ', '');
        }

        let matType = $("#hire4").val();
        let matSum = 0;

        if (matType == 'after') matSum = budget;

        if (matType == 'before') $("#sumFirst").html((sumFirst - budget) + "₽");
        let sumCredit = sumApart - sumFirst - matSum;



        let bill = (sumCredit * (percentCredit / 1200)) / (1 - Math.pow((1 + (percentCredit / 1200)), (1 - (yearsCredit * 12))));
        bill = parseInt(bill);
        $("#bill").html(bill + "₽");

        if (inputschecked == false || validPhone() == false) {
            formvalidate(4);
        }

        else {

            let textApart = '';
            let textCredit = '';
            $(".step1radio").each(function () {

                if ($(this).is(':checked')) {
                    textApart = $(this).val();
                }
            });

            $(".step2radio").each(function () {

                if ($(this).is(':checked')) {
                    textCredit = $(this).val();
                }
            });
            let name = $("#name").val();
            let phone = $("#phone").val();
            let others = $("#others").val();

            let period = $("#hire3").val();

            $.post("send.php", { json_string: JSON.stringify({ name: name, phone: phone, others: others, textApart: textApart, textCredit: textCredit, period: period, bill: bill, matSum: budget, sumFirst: sumFirst, sumApart: sumApart, yearsCredit: yearsCredit, percentCredit: percentCredit }) });
            next();
        }
    })

    // check last step
    $("#sub").on('click', function () {

        formvalidate(5);


        if (inputschecked == false) {
            formvalidate(5);
        }
        else {



            $("#sub").html("<img src='assets/images/loading.gif'>");



            var dataString = new FormData(document.getElementById("steps"));


            console.log(dataString);


            // send form to send.php
            $.ajax({
                type: "POST",
                url: "form handling/send.php",
                data: dataString,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data, status) {

                    $("#sub").html("Success!");
                    console.log(data);

                    window.location = "thankyou.html";

                },
                error: function (data, status) {
                    $("#sub").html("failed!");
                    console.log(data);
                }
            });
        }

    });
}
);

