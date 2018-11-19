$(document).ready(function(){
	
	$('button[type=list]').click(function(event){
		event.preventDefault();
		
		$.ajax({
			method:"get",
			url: "/list_id",
      success: function(data){
       $('#table').html(data);
        console.log(data);
      }
		});
	});

  $('.ajax-form button[type=search]').click(function(event){
    event.preventDefault();

    $.ajax({
      method:"get",
      url:'/search',
      data:{
        id: $(".ajax-form input[name=id_search]").val()
       },
      success: function(data){
        $('#search').html(data);
        console.log(data);
      }
    });
   });

	$('.ajax-form button[type=submit]').click(function(event){
		event.preventDefault();
		
		$.ajax({
			method:"get",
			url:'/ajax_data',
			data:{
				id: $(".ajax-form input[name=id_submit]").val(),
        name: $(".ajax-form input[name=name]").val()
			},
			success: function(data){
				$('#sayhi').text(data);
			}
		});
	});

  $('.ajax-form button[type=delete]').click(function(event){
    event.preventDefault();

    $.ajax({
      method:"get",
      url:'/delete',
      data:{
        id: $(".ajax-form input[name=id_delete]").val()
       }
    });
   });

});
