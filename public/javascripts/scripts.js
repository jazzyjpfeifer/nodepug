

//function ConfirmDelete() {
//    return confirm('Are you sure you want to delete?')
//}

//semantic-ui dropdown
$('.ui.dropdown')
    .dropdown()
;

//semantic-ui calendar
$('#calendar').calendar({
    type: 'date'
});

//semantic-ui popup
$('.boundary.example .button')
    .popup({
        boundary: '.boundary.example .segment'
    })
;