var API_ENDPOINT = "https://ifva6oaoki.execute-api.us-east-1.amazonaws.com/dev"

document.getElementById("convertButton").onclick = function()
{

	if ($("#inputFileName").val() == "")
	{
		alert('Output filename please?');
		return;
	}

	if ($("#postText").val() == "")
	{
		alert('Lol. How can I create a MP3 without input text?');
		return;
	}

	fileName = $("#inputFileName").val().replace(/[^a-zA-Z0-9]/g,'_');
	if (fileName.length > 20){
		fileName = fileName.substring(0,18);
	}

	if ( $(postText).val().length > 10000)
	{
		alert('Dang! That\'s a huge text. Gimme sometime. Brb.');
		return;
	}


	
	var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
		"text" : $('#postText').val(),
		"filename": fileName
	};

	document.getElementById("ProcessingUpdates").textContent="Uploading.."

	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) 
	      {
	      	document.getElementById("ProcessingUpdates").textContent="Converting.."
	      	download(response);
	      },
	      error: function () {
	          alert("Some error in uploading data. Please contact me.");
	      }
	  });

	

}

document.getElementById("postText").onkeyup = function()
{
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}


function download(currentPostID) 
{

var canBreakLoop = true;	

while(canBreakLoop)
	{

		 var start = new Date().getTime();
		 var end = start;
		   while(end < start + 500) 
		   {
		     end = new Date().getTime();
		   }

		$.ajax({
			url: API_ENDPOINT + '?postId='+currentPostID,
			type: 'GET',
			async: false,
			success: function (response) 
			{

		        jQuery.each(response, function(i,data) 
		        {

						if (typeof data['url'] === "undefined") 
						{
							return;
	    				}



						canBreakLoop = false;
						
						var link=document.createElement("a");
						link.href=data['url'];
						document.getElementById("clickLinkDiv").appendChild(link);
						link.click();
						link.remove();
						document.getElementById("ProcessingUpdates").textContent=""




		        });
			},
			error: function () 
			{
						alert("Error in converting file. Please try again or try later.");
			}
		});



	}	


}

