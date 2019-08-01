<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,600" rel="stylesheet" type="text/css">
    <link href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <!-- load that FontAwesome library -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"> -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">
    <link type="text/css" rel="stylesheet" href="css/style.css">
    <title>Budgety</title>
</head>

<body>
    <div class="message-box">

    </div>
    <div class="overlay">

    </div>
    <div class="top">
        <div class="budget">
            <div class="budget__title">
                Available Budget in
                <span class="budget__title--month">%Month%</span>:
            </div>

            <div class="budget__value">+ 2,345.64</div>

            <div class="budget__income clearfix">
                <div class="budget__income--text">Income</div>
                <div class="right">
                    <div class="budget__income--value">+ 4,300.00</div>
                    <div class="budget__income--percentage">&nbsp;</div>
                </div>
            </div>

            <div class="budget__expenses clearfix">
                <div class="budget__expenses--text">Expenses</div>
                <div class="right clearfix">
                    <div class="budget__expenses--value">- 1,954.36</div>
                    <div class="budget__expenses--percentage">45%</div>
                </div>
            </div>
        </div>
    </div>



    <div class="bottom">
        <div class="add">
            <div class="add__container">
                <select class="add__year">
                    <option value="" selected>Year</option>
                    <?php
                        $nowYear = date('Y');
                        echo "<option value='$nowYear'>$nowYear</option>";
                        for($i = 1; $i <= 10; $i++) {
                            $nextTime = time() + ($i * 365 * 24 * 60 * 60);
                            $nextYear = date('Y', $nextTime);
                            echo "<option value='$nextYear'>$nextYear</option>";
                        }
                    ?>
                </select>
                <select class="add__month">
                    <option value="" selected>Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">Marz</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select class="add__type">
                    <option value="inc" selected>+</option>
                    <option value="exp">-</option>
                </select>
                <input type="text" class="add__description" placeholder="Add description">
                <input type="number" class="add__value" placeholder="Value">
                <button class="add__btn">
                    <i class="ion-ios-checkmark-outline"></i>
                </button>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="main_app_container clearfix">
                    <div class="income col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <h2 class="icome__title">Income</h2>

                        <div class="income__list">

                            <!--
                        <div class="item clearfix" id="income-0">
                            <div class="item__description">Salary</div>
                            <div class="right clearfix">
                                <div class="item__value">+ 2,100.00</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="item clearfix" id="income-1">
                            <div class="item__description">Sold car</div>
                            <div class="right clearfix">
                                <div class="item__value">+ 1,500.00</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>
                        -->

                        </div>
                    </div>



                    <div class="expenses col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <h2 class="expenses__title">Expenses</h2>

                        <div class="expenses__list">

                            <!--
                        <div class="item clearfix" id="expense-0">
                            <div class="item__description">Apartment rent</div>
                            <div class="right clearfix">
                                <div class="item__value">- 900.00</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>

                        <div class="item clearfix" id="expense-1">
                            <div class="item__description">Grocery shopping</div>
                            <div class="right clearfix">
                                <div class="item__value">- 435.28</div>
                                <div class="item__percentage">10%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>
                        -->

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <div class="login__box">
        <div class="form-group">
            <label for="email" class="bold">Email: </label>
            <div class="input-group">
                <span class="input-group-addon">
                    <i class="fas fa-at"></i>
                </span>
                <input type="email" class="form-control my-form-control" id="email" placeholder="Enter email" required>
            </div>
        </div>
        <div class="form-group" id="passContainer">
            <label for="password" class="bold">Password: </label>
            <div class="input-group">
                <span class="input-group-addon">
                    <i class="fas fa-key"></i>
                </span>
                <input type="password" class="form-control my-form-control" id="password" placeholder="Password" required>
            </div>
        </div>
        <div class="form-group login__buttons">
            <button name="login" class="btn btn-md login__btn">
                <i class="fas fa-sign-in-alt"></i> Log in</button>

            <button name="signup" class="btn btn-md signup__btn">
                <i class="fas fa-user-plus"></i> Sign Up</button>
        </div>
    </div>
    <div class="signup__box">
        <div class="form-group">
            <label for="email" class="bold">Email: </label>
            <div class="input-group">
                <span class="input-group-addon">
                    <i class="fas fa-at"></i>
                </span>
                <input type="email" class="form-control" id="signup__email" placeholder="Enter email">
            </div>
        </div>
        <div class="form-group">
            <label for="signup__pass_1" class="bold">Password: </label>
            <div class="input-group">
                <span class="input-group-addon">
                    <i class="fas fa-key"></i>
                </span>
                <input type="password" class="form-control" id="signup__pass_1" placeholder="Password">
            </div>
            <div class="pass_str"></div>
        </div>
        <div class="form-group">
            <label for="signup__pass_2" class="bold">Repeat Password: </label>
            <div class="input-group">
                <span class="input-group-addon">
                    <i class="fas fa-key"></i>
                </span>
                <input type="password" class="form-control" id="signup__pass_2" placeholder="Repeat Password">
            </div>
        </div>
        <div class="form-group signup__buttons">
            <button name="signup2" class="btn btn-md signup__final__btn">
                <i class="fas fa-user-plus"></i> Sign Up</button>
            <button name="goback" class="btn btn-md goback__btn">
                <i class="fas fa-undo"></i> Go Back</button>
        </div>
    </div>
    <script src="lib/jquery-3.1.1.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
    <script src="js/app.js"></script>
</body>

</html>