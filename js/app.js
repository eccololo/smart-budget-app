

// NOTE: In this app we are creating JS modules. UI Module, Data module, Controller module.

//Controller Module
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {

        var sum = 0;

        //Zliczamy sume inc lub exp
        data.allItems[type].forEach(function (current) {
            sum = sum + current.value;
        });

        //Dodajemy zliczona sume do naszej struktury danych 
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            if (data.allItems[type].length > 0) {
                //Create new ID. Last ID + 1 in array
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            //Create new Item
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //Push it to our data structure
            data.allItems[type].push(newItem);


            //Return the new element
            return newItem;
        },

        deleteItem: function (type, id) {

            //[1, 2, 4, 6, 8]
            var ids, index;

            //Funkcja map zwraca nam tablice z id-s wszystkich itemów danego 
            //typu 
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                //Usuwamy item z naszej struktury danych, uswuamy tylko 1 //element

                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {

            //Calculate total inc and exp
            calculateTotal('exp');
            calculateTotal('inc');

            //Calculate the budget: inc - exp
            data.budget = data.totals.inc - data.totals.exp;

            if (data.totals.inc > 0) {
                //Calculate precentage of inc spend
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }


        },

        //Oblicza procent wydanych pieniedzy na item w stosunku do wszystkich //przychodow
        calculatePercentages: function () {
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        //Zwraca tablice wszystkich procentow z expenses
        getPercentages: function () {
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });

            return allPerc;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function () {
            console.log(data);
        }
    };

})();


//UI Module
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        inputMonth: '.add__month',
        inputYear: '.add__year',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.main_app_container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
        buttonLogin: '.login__btn',
        buttonSignup: '.signup__btn',
        buttonSignupFinal: '.signup__final__btn',
        loginBox: '.login__box',
        signupBox: '.signup__box',
        buttonGoBack: '.goback__btn',
        overlayBox: '.overlay',
        buttonItemDelete: '.item__delete--btn',
        buttonLogout: '.btn-logout',
        buttonOptions: '.btn-options'
    }

    var formatNumber = function (num, type) {

        var num, numSplit, int, dec, sign;

        /*
          + or - before number
          exactly 2 decimal points
          comma separating the thausands
          
          2380.3366 -> + 2,380.34
          2000 -> 2,000.00
        */

        //Usuwamy znak liczby
        num = Math.abs(num);

        //Dodajemy 2 liczby po przecinku, toFixed zwraca stringa
        num = num.toFixed(2);

        numSplit = num.split('.');
        int = numSplit[0];

        //Jesli mamy 1000-ce 
        if (int.length > 3) {
            //input 2345, output 2,345
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        //            type === 'exp' ? sign = '-' : sign = '+';

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    function convertNumToMonth(num) {

        num = parseInt(num);

        switch (num) {
            case 01:
                return "January";
                break;

            case 02:
                return "February";
                break;

            case 03:
                return "Marz";
                break;

            case 04:
                return "April";
                break;

            case 05:
                return "May";
                break;

            case 06:
                return "June";
                break;

            case 07:
                return "July";
                break;

            case 08:
                return "August";
                break;

            case 09:
                return "September";
                break;

            case 10:
                return "October";
                break;

            case 11:
                return "November";
                break;

            case 12:
                return "December";
                break;

            default:
                return "";
                break;
        }
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {

            var html, newHtml, element;

            //Create html string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //Replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            //Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


        },

        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID);
            document.getElementById(selectorID).parentNode.removeChild(el);
        },

        clearFields: function () {
            var fields, fieldsArr;

            //Pobieramy dwa wezly DOM, opis i ilosc pieniedzy, zwraca typ danych typu lista.
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            //Konwertujemy liste na tablice
            fieldsArr = Array.prototype.slice.call(fields);

            //Przechodzimy przez wszystkie elementy tablicy i czyscimy wezly DOM, tak zeby byly puste (opis, i ilosc pieniedzy)
            fieldsArr.forEach(function (current, index, array) {
                current.value = '';
            });

            //Dajemy po dodaniu itemu focus na opis nowego itemu
            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {

            var type;

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }



        },

        displayProcentages: function (percentages) {

            //Zmienna przechowuje liste node-ow
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });

        },

        displayMonth: function () {
            var now, year, month, months;

            months = ['January', 'February', 'Marz', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            now = new Date();
            month = now.getMonth();
            month = months[month];
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = month + ', ' + year;
        },

        //Zmienia kolor obramowania na czerwony lub niebieski (inc, exp)
        changeType: function () {

            var fields = document.querySelectorAll(
                DOMstrings.inputType + ', ' +
                DOMstrings.inputDescription + ', ' +
                DOMstrings.inputValue + ', ' +
                DOMstrings.inputMonth + ', ' +
                DOMstrings.inputYear
            );

            nodeListForEach(fields, function (cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

        },

        getDOMstrings: function () {
            return DOMstrings;
        },

        changeMonthTitle: function () {
            var year = $('.add__year').val();
            var month = $('.add__month').val();
            var separator = null;

            month = convertNumToMonth(month);

            if (month == "") {
                separator = " ";
            } else {
                separator = ", ";
            }

            var all = month + separator + year;

            $('.budget__title--month').text(all);
        },

        changeYearTitle: function () {
            var year = $('.add__year').val();
            var month = $('.add__month').val();
            var separator = null;
            var all = null;

            month = convertNumToMonth(month);

            if (month == "") {
                separator = " ";
            } else {
                separator = ", ";
            }

            if (year == "") {
                all = "";
            } else {
                all = month + separator + year;
            }

            $('.budget__title--month').text(all);
        },

        deleteItemFromDB: function() {

            alert($(this));

            // $.ajax({
            //     type: "POST",
            //     url: "php/delete.php",
            //     cache: false,
            //     data: {
            //         item_id: item_id
            //     },
            //     success: function (result, status, xhr) {

            //         //    WHEN WE LOGGED IN SUCCESSFULY
            //         if (result.toLowerCase().indexOf('done') != -1) {


            //         } else if (result.toLowerCase().indexOf('error') != -1) {
            //             // alert('ERROR: Logging failed. Contact Admin.');

            //             $('.message-box').text('ERROR: Deleting item from database failed.')
            //                 .css('background', 'tomato')
            //                 .slideDown(650)
            //                 .delay(2500)
            //                 .slideUp(400);
            //             return;
            //         }

            //     },
            //     error: function (xhr, status, error) {
            //         // alert('ERROR: Nie znaleziono uzytkownika o podanej nazwie w bazie danych. Prosze zalozyc nowe konto lub  skontaktowac sie z administratorem.');
            //         $('.message-box').text('ERROR: Deleting item from database failed.')
            //             .css('background', 'tomato')
            //             .slideDown(650)
            //             .delay(2500)
            //             .slideUp(400);
            //         return;
            //     }
            // });
        }
    };
})();

var utilityController = (function (UICtrl) {

    var DOM = UICtrl.getDOMstrings();
    //Flaga dla options boxa
    var optionsBoxOpened = false;

    var isEmailCorrect = function (email) {
        var emailRegExp;

        emailRegExp = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i;
        return emailRegExp.test(email);
    }

    var is2PassSame = function (pass1, pass2) {
        return pass1 === pass2;
    }

    function setCookie(cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (60 * 60 * 24 * 1000)); //EXPIRE IN 1 DAY
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    //NOTE: Funkcja sprawdzajaca dlugosc hasla
    function passwordLengthPoints(password) {
        var points = 0;
        //NOTE: If password length is more than 7 letter : +5 points
        if (password >= 4 && password < 10) {
            points = 4;
        } else if (password >= 10 && password < 19) {
            //NOTE: If password length is more than 14 letter : +5 points
            points = 10;
        } else if (password >= 19 && password < 24) {
            //NOTE: If password length is more than 21 letter : +5 points
            points = 15;
        }

        return points;

    }

    //NOTE: Funkcja sprawdzajaca czy mamy w hasle przekazane w parametrze litery
    function searchedLettersPoints(password, setOfLetter) {
        var hasLetter = false;
        var numOfSearched = 0;
        var points = 0;

        //NOTE: We are checking every letter 
        for (var i = 0; i < password.length; i++) {
            var passLetter = password.charAt(i);
            if (setOfLetter.indexOf(passLetter) != -1) {
                hasLetter = true;
                numOfSearched++;
            }
        }

        if (hasLetter && numOfSearched >= 2) {
            points = 10;
        }

        return points;
    }

    return {
        //Mechanizm logowania sie
        login: function () {
            var usernameXML, passwordXML;
            var usernameBox, passwordBox;
            var incorrectLog = false;

            usernameBox = $('#email').val();
            passwordBox = $('#password').val();

            if (usernameBox === '' || passwordBox === '') {
                // alert('Enter your login data to login to application.');
                $('.message-box').text('Enter your login data to login to application.')
                    .css('background', 'tomato')
                    .slideDown(650)
                    .delay(2500)
                    .slideUp(400);
                return false;
            }

            if (!isEmailCorrect(usernameBox)) {
                // alert('Email must be correct.');
                $('.message-box').text('Email must be correct.')
                    .css('background', 'tomato')
                    .slideDown(650)
                    .delay(2500)
                    .slideUp(400);
                return false;
            }

            if (usernameBox !== '' && passwordBox !== '') {

                $.ajax({
                    type: "POST",
                    url: "php/login.php",
                    cache: false,
                    data: {
                        email: usernameBox,
                        pass: passwordBox
                    },
                    success: function (result, status, xhr) {

                        //    WHEN WE LOGGED IN SUCCESSFULY
                        if (result.toLowerCase().indexOf('done') != -1) {

                            $('.login__box').fadeOut(400);
                            document.querySelector(DOM.signupBox).style.display = 'none';
                            document.querySelector(DOM.overlayBox).style.display = 'none';

                            // WE ARE SETTING COOKIE THAT WE ARE LOGGED IN
                            setCookie('loggedIn', 'true');

                        } else if (result.toLowerCase().indexOf('error') != -1) {
                            // alert('ERROR: Logging failed. Contact Admin.');

                            $('.message-box').text('ERROR: Incorrect login credentials.')
                                .css('background', 'tomato')
                                .slideDown(650)
                                .delay(2500)
                                .slideUp(400);
                            return;
                        }

                    },
                    error: function (xhr, status, error) {
                        // alert('ERROR: Nie znaleziono uzytkownika o podanej nazwie w bazie danych. Prosze zalozyc nowe konto lub  skontaktowac sie z administratorem.');
                        $('.message-box').text('ERROR: Nie znaleziono uzytkownika o podanej nazwie w bazie danych. Prosze zalozyc nowe konto lub  skontaktowac sie z administratorem.')
                            .css('background', 'tomato')
                            .slideDown(650)
                            .delay(2500)
                            .slideUp(400);
                        return;
                    }
                });

            } else {
                // alert('Prosze wpisac haslo oraz email przypisane do konta.');
                $('.message-box').text('Prosze wpisac haslo oraz email przypisane do konta.')
                    .css('background', 'tomato')
                    .slideDown(650)
                    .delay(2500)
                    .slideUp(400);
                return;
            }
        },

        goToSignup: function () {

            document.querySelector(DOM.loginBox).style.display = 'none';
            $('.signup__box').fadeIn(400);
        },

        //Mechanizm tworzenia konta 
        signup: function () {
            //Pobieramy wprowadzone dane
            var signUpEmail = $('#signup__email').val();
            var signUpPass1 = $('#signup__pass_1').val();
            var signUpPass2 = $('#signup__pass_2').val();

            //Sprawdzic czy email jest poprawny 
            if (!isEmailCorrect(signUpEmail)) {
                // alert('Email is incorect!');
                $('.message-box').text('Email is incorect!')
                    .css('background', 'tomato')
                    .slideDown(650)
                    .delay(2500)
                    .slideUp(400);
                return false;
            }

            //Sprawdzić czy hasla sa takie same
            if (!is2PassSame(signUpPass1, signUpPass2)) {
                // alert('Password doesn\'t match!');
                $('.message-box').text('Password doesn\'t match!')
                    .css('background', 'tomato')
                    .slideDown(650)
                    .delay(2500)
                    .slideUp(400);
                return false;
            }

            $.ajax({
                url: 'php/signup.php',
                type: 'POST',
                cache: false,
                data: {
                    email: signUpEmail,
                    pass: signUpPass1
                },
                success: function (response) {
                    //Jesli konto zostalo utworzone to sie logujemy
                    if (response.toLowerCase().indexOf('done') != -1) {
                        $('.login__box').fadeIn(400);
                        document.querySelector(DOM.signupBox).style.display = 'none';

                        // alert('Please login now with your data.');

                        $('.message-box').text('Please login now with your data.')
                            .css('background', '#28B7B3')
                            .slideDown(650)
                            .delay(2500)
                            .slideUp(400);

                    } else if (response.toLowerCase().indexOf('error') != -1) {
                        // alert('ERROR: Registering failed. Contact Admin.');
                        $('.message-box').text('ERROR: Registering failed. Contact Admin.')
                            .css('background', 'tomato')
                            .slideDown(650)
                            .delay(2500)
                            .slideUp(400);
                        return;

                    } else if (response.toLowerCase().indexOf('same') != -1) {
                        // alert('ERROR: Registering failed. Contact Admin.');
                        $('.message-box').text('ERROR: This email address is already registered.')
                            .css('background', 'tomato')
                            .slideDown(650)
                            .delay(2500)
                            .slideUp(400);
                        return;
                    }
                },
                error: function (error) {
                    // alert('ERROR: An error has occured. Contact admin.');
                    $('.message-box').text('ERROR: An error has occured. Contact admin.')
                        .css('background', 'tomato')
                        .slideDown(650)
                        .delay(2500)
                        .slideUp(400);
                    return;
                }
            });
        },

        goback: function () {
            $('.login__box').fadeIn(400);
            document.querySelector(DOM.signupBox).style.display = 'none';
        },

        //Mechanizm pozostania zalogowanym na podstawie cookies
        getCookie() {
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            var searchValue = ca[0];
            var splitted = searchValue.split("=");
            if (splitted[0] == "loggedIn" && splitted[1] == 'true') {
                document.querySelector(DOM.loginBox).style.display = 'none';
                document.querySelector(DOM.signupBox).style.display = 'none';
                document.querySelector(DOM.overlayBox).style.display = 'none';
            }
        },

        //Mechanizm pozostania zalogowanym na podstawie session
        checkSessions() {
            $.ajax({
                type: "POST",
                url: "php/session.php",
                cache: false,
                success: function (result, status, xhr) {

                    if (result.toLowerCase().indexOf('done') != -1) {
                        document.querySelector(DOM.loginBox).style.display = 'none';
                        document.querySelector(DOM.signupBox).style.display = 'none';
                        document.querySelector(DOM.overlayBox).style.display = 'none';

                    } else if (result.toLowerCase().indexOf('error') != -1) {
                        document.querySelector(DOM.loginBox).style.display = 'block';
                        document.querySelector(DOM.overlayBox).style.display = 'block';
                    }

                },
                error: function (xhr, status, error) {
                    $('.message-box').text('ERROR: Something went wrong during checking sessions.')
                        .css('background', 'tomato')
                        .slideDown(650)
                        .delay(2500)
                        .slideUp(400);
                    return;
                }
            });
        },

        //   SHOWING PASS STRENGTH 
        showPassStr() {
            var $password = $('#signup__pass_1');
            var $passValue = $password.val();
            var $passLength = $password.val().length;
            var points = 0;
            points = passwordLengthPoints($passLength);
            points += searchedLettersPoints($passValue, 'ABCDEFGHIJKLMNOPRSTUWXYZQ');
            points += searchedLettersPoints($passValue, '!?@#$%^&*\/\_-.,)');
            points += searchedLettersPoints($passValue, '1234567890');

            console.log(points);

            if (points <= 0) {
                $('.pass_str').css('width', '0%').css('background', 'red');
            } else if (points <= 5) {
                $('.pass_str').css('width', '20%').css('background', 'red');
            } else if (points > 6 && points <= 15) {
                $('.pass_str').css('width', '40%').css('background', 'orange');
            } else if (points > 16 && points <= 30) {
                $('.pass_str').css('width', '70%').css('background', 'green');
            } else if (points >= 35) {
                $('.pass_str').css('width', '100%').css('background', 'lightgreen');
            }
        },

        logout: function() {
            $.ajax({
                url: 'php/quick_logout.php',
                type: 'POST',
                cache: false,
                success: function (response) {
                    $("#email").val("");
                    $("#password").val("");
                    document.querySelector(DOM.loginBox).style.display = 'block';
                    document.querySelector(DOM.overlayBox).style.display = 'block';
                },
                error: function (xhr, status, error) { 
                    $('.message-box').text('ERROR: Something went wrong during logout.')
                        .css('background', 'tomato')
                        .slideDown(650)
                        .delay(2500)
                        .slideUp(400);
                    return;
                }
            });
        },

        showHideOption: function() {

            //Jesli otwieramy dopiero options box
            if(!optionsBoxOpened) {
                optionsBoxOpened = true;
                $(".options-options").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 200);
            } else {
                optionsBoxOpened = false;
                $(".options-options").css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
            }
            
        }

    };
})(UIController);

//Global APP Controller
var controller = (function (budgetCtrl, UICtrl, UtilCtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstrings();

        //Jak klikniemy na ptaszka obok dodawania value
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            //Wykona sie gdy klikniemy Enter (which dla starszych przegladarek)
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        //Event Bubbling, Event Delegation used here
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);

        //Jak klikniemy na login button pobieramy dane z XML i logujemy 
        document.querySelector(DOM.buttonLogin).addEventListener('click', UtilCtrl.login);

        //Jak nacisniemy przycisk sign up pokazuje sie ekran tworzenia konta
        document.querySelector(DOM.buttonSignup).addEventListener('click', UtilCtrl.goToSignup);

        //Jak nacisniemy przycisk sign up pokazuje sie ekran tworzenia konta
        document.querySelector(DOM.buttonSignupFinal).addEventListener('click', UtilCtrl.signup);

        //Jak klikniemy na przycisk go back wracamy do ekranu logowania
        document.querySelector(DOM.buttonGoBack).addEventListener('click', UtilCtrl.goback);

        //Jak zakladamy haslo to pokazuje sie sila hasla
        $("#signup__pass_1")[0].addEventListener("keyup", utilityController.showPassStr);

        //Kiedy zmieniamy miesiac tytul na gorze ekranu tez sie zmienia.
        document.querySelector(DOM.inputMonth).addEventListener('change', UICtrl.changeMonthTitle);

        //Kiedy zmieniamy rok tytul na gorze ekranu tez sie zmienia.
        document.querySelector(DOM.inputYear).addEventListener('change', UICtrl.changeYearTitle);

        //Kiedy klikamy na logout button w appce wylogowujemy sie
        document.querySelector(DOM.buttonLogout).addEventListener('click', utilityController.logout);

        //kiedy klikniemy na ikonke gear pokazuja nam sie opcje
        document.querySelector(DOM.buttonOptions).addEventListener('click', utilityController.showHideOption);
    }

    var updateBudget = function () {
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. Return the budget
        var budget = budgetCtrl.getBudget();

        //3. Display Budget on the UI
        UICtrl.displayBudget(budget);
    };

    //FIXME: NAPRAWIC tak zeby w tablcy pojawialy sie liczby zamiast undefined
    var updatePercentages = function () {

        //1. Calculate percentages
        budgetCtrl.calculatePercentages();

        //2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();

        //3. Update the UI with new percentages
        UICtrl.displayProcentages(percentages);
    };

    var ctrlAddItem = function () {
        var input, newItem;

        //1. Get the field input data
        input = UICtrl.getInput();

        //Dodajemy item tylko jesli wpisalismy opis, i wpisalismy liczbe //wieksza niz 0
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            var year = $('.add__year').val();
            var month = $('.add__month').val();

            createItemInDB(input.description, input.value, input.type, month, year, input);

        }
    }

    //Event Bubbling, Event Delegation used here
    var ctrlDeleteItem = function (event) {

        var itemID, splitID, type, ID;

        //DOM Traversing
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1. Delete item from the data structure
            budgetCtrl.deleteItem(type, ID);

            //2. Delete the item from teh UI
            UICtrl.deleteListItem(itemID);

            //3. Update and show the new budget
            updateBudget();

            //4. Calculate and Update the percentages
            updatePercentages();
        }
    };

    var createItemInDB = function (text, value, type, month, year, input) {

        $.ajax({
            type: "POST",
            url: "php/create.php",
            cache: false,
            data: {
                text: text,
                value: value,
                type: type,
                month: month,
                year: year
            },
            success: function (result, status, xhr) {

                if (result.toLowerCase().indexOf('done') != -1) {

                    var newItem;

                    //2. Add the item to the budget ctrl
                    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

                    //3. Add the item to the UI
                    UICtrl.addListItem(newItem, input.type);

                    //4. Clear the fields
                    UICtrl.clearFields();

                    //5. Calculate and update budget
                    updateBudget();

                    //6. Calculate and Update the percentages
                    updatePercentages();

                    return;

                } else if (result.toLowerCase().indexOf('error') != -1) {
                    $('.message-box').text('ERROR: Something went wrong during adding item to database.')
                        .css('background', 'tomato')
                        .slideDown(650)
                        .delay(2500)
                        .slideUp(400);
                    return;
                }

            },
            error: function (xhr, status, error) {
                $('.message-box').text('ERROR: Something went wrong during adding item to database.')
                    .css('background', 'tomato')
                    .slideDown(650)
                    .delay(2500)
                    .slideUp(400);
                return;
            }
        });
    }

    return {
        init: function () {
            console.log('Application started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
            $('.login__box').fadeIn(500);
            $(".options-options").css("visibility", "hidden");
            utilityController.getCookie();
            utilityController.checkSessions();

        }
    };

})(budgetController, UIController, utilityController);

controller.init();