$(document).ready(function(){

    $('form').on('submit', function(){
        
        var item = $('form input');
        var todo = {item: item.val()};
        
        $.ajax({
            type: "POST",
            url: "/todo",
            data: todo,
            success: function (data) {
                // console.log(data);
                // do something with the data via front-end framework
                location.reload();
            }
        });
    });

    $("li").on('click', function() {
        // alert();
        var item = $(this).text().replace(/ /g, "-");

        $.ajax({
            type: "DELETE",
            url: `/todo/${item}`,
            success: function (data) {
                location.reload();
            }
        });
    });
});