$(document).ready(function () {

    function QuizQuestion(question, choices, correctAnswer) {
        this.question = question;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
        // console.log("question:",question);
        // console.log("choices:",choices);
        // console.log("correctAnswer:",correctAnswer)
    }

    var allQuestions = [
        new QuizQuestion("Name the largest freshwater lake in the world?", [" Lake Superior", "hsome kind lake", "railway station", "None of the above"], 0),
        new QuizQuestion("Bray Studios, near Windsor in Berkshire, was home to which famous brand of horror films?", ["SAW3", "HammerHorror", "TheGame"], 0),
        new QuizQuestion("Name the world famous gardens situated ten miles outside of London, close to the River Thames.", ["Kew", "Kew Gardens", "Europe", "Garden"], 1),
        new QuizQuestion(" Garampani sanctuary is located at ", ["Junagarh, Gujarat", "Diphu, Assam", "Kohima, Nagaland", "Gangtok, Sikkim"], 1),
        new QuizQuestion("For which of the following disciplines is Nobel Prize awarded?", ["Physics and Chemistry", "Physiology or Medicine", "Literature, Peace and Economics", "All of the above"], 3),
    ];
    var currentquestion = 0;
    var correctAnswers = 0;
    var counter = 10;
    // 

    function timerWrapper() {
        // var counter = 10;
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timerWrapper()
                
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }

    function setupOptions() {
        $('#question').html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
        var options = allQuestions[currentquestion].choices;
        var formHtml = '';
        for (var i = 0; i < options.length; i++) {
            formHtml += '<div><input type="radio" name="option" value="' + i + '" class="qiz"><label for="option' + i + '">' + options[i] + '</label></div><br/>';
        }
        $('#form').html(formHtml);

    }

    function checkAns() {
        if ($("input[name=option]:checked").val() == allQuestions[currentquestion].correctAnswer) {
            correctAnswers++;
        }
    }
    var mainScreen = $(".main");
    var start = $("#start");
    var next = $("#next");
    var result = $("#result");
    // hides 
    mainScreen.hide();
    start.click(function () {
        $('.toHideMain').hide()
        timerWrapper()
        mainScreen.fadeIn();
        $(this).hide();
        console.log("jumbo", $(this).hide())
    });
    function countiming() {
        formHtml += "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>"
        $('#form').html(formHtml);
    }
    var theClock;
    var currentquestion = 0;
    var correctAnswers = 0;
    var counter = 10;
    setupOptions();


    next.click(function () {
        event.preventDefault();
        checkAns();
        clearInterval(theClock);
        counter = 10;
        timerWrapper()
        currentquestion++;
        if (currentquestion < allQuestions.length) {
            setupOptions();
            if (currentquestion == allQuestions.length - 1) {
                next.html("Submit");
                next.click(function () {
                    mainScreen.hide();
                    result.html("You correctly answered " + correctAnswers + " out of " + currentquestion + " questions! ").hide();
                    result.fadeIn(100);
                });

            }

        };
    });
});