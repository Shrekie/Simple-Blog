$( document ).ready(function() {
	
	// Post to server
	$('#addPost').click(()=>{

		var data = {
			title: $('#titleData').val(),
			content: $('#contentData').val()
		}

		$.ajax({
			type: "POST",
			url: '/blog/new',
			data,
			dataType : 'json',
			success: (res)=>{
				console.log(res);
				$('#titleData').val('');
				$('#contentData').val('');
				$('#titleData').removeClass('valid');
				$('#contentData').removeClass('valid');
				Materialize.toast('Posted!', 2000);
			},
			error: (res) =>{
				Materialize.toast('Invalid request', 2000);
			}
		});
		
	});

	$('.removePostButton').click(function(){

		var containerElement = $(this).parent().parent();
		console.log(containerElement[0]);
		var blogPostID = containerElement[0].id;

		$.ajax({
			type: "DELETE",
			url: `/blog/remove/${blogPostID}`,
			dataType : 'json',
			success: (res)=>{
				containerElement.remove();
				Materialize.toast('Removed post', 2000);
			},
			error: (res) =>{
				console.log(res);
				Materialize.toast('Something went wrong', 2000);
			}
		});

	});

});