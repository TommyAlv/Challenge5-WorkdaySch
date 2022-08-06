var scheduleArea = $(".schedule");
var currentDay = $("#currentDay");
var timeBlocks = $(".time-block");
var toDoItems = {};

// Sets The Current Time Using Moment JS
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

// Inputs The Current Day Into HTML To Display On Page
currentDay.text(currentDate);

// On Click Of Save Button, Relative To The Hour, Data Will Be Saved To Local Storage After Running Function
$('button').on('click', function () {
    var time = $(this).closest('div').find('.hour').text();

    var note = $(this).closest('div').find('.note').val();

    toDoItems[time] = note;

    saveToLocalStorage();

});

// Saves To Local Storage
function saveToLocalStorage() {
    
    localStorage.setItem("toDos", JSON.stringify(toDoItems));
};

// Applies Class on each time block based on current hour vs hour in the time block
function setUpTimeBlocks() {
    timeBlocks.each(function () {
        var thisBlock = $(this);
        var thisBlockHr = parseInt(thisBlock.attr("data-hour"));

        if (thisBlockHr == currentHour) {
            thisBlock.addClass("present").removeClass("past future");
        }

        if (thisBlockHr < currentHour) {
            thisBlock.addClass("past").removeClass("present future");
        }

        if (thisBlockHr > currentHour) {
            thisBlock.addClass("future").removeClass("past present");
        }

    });
}

// Pulls from Local Storage and enters values into timeblocks
function generateSchedule() {
    toDoItems = JSON.parse(localStorage.getItem('toDos'));
    if (!toDoItems) {
        toDoItems = {}
    }
    $.each(toDoItems, function(key, value){
        var hour = key;
        var note = value;
        var hourElement = timeBlocks.find('.hour').filter(function() {
            return $(this).text() === hour;
        });
        var hourNote = hourElement.siblings('.note');
        hourNote.val(note);
    });

}


setUpTimeBlocks();
generateSchedule();




