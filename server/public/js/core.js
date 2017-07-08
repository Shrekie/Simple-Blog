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
			dataType : 'application/json',
			success: (data)=>{
				console.log(data);
			}
		});
		
	})

});