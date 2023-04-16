// Purpose - This file contains all the logic relevant to the extension such as getting the URL, calling the server
// side clientServer.php which then calls the core logic.

function transfer() {
	var tablink;
	chrome.tabs.query({
		active: true,
		currentWindow: true
	},
		function (tab) {
			tablink = tab[0].url;
			$("#p1").text("The URL being tested is - " + tablink);

			var xhr = new XMLHttpRequest();
			
			a = "http://127.0.0.1:5000/extension?url=" + tablink
			xhr.open("POST", a, false);
			xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
			
			try {
				xhr.send();
				if (xhr.status != 200) {
					alert(`Error ${xhr.status}: ${xhr.statusText}`);
				}
			} catch (err) {
				alert(err);
			}
			var myDiv = document.getElementById("res-circle");
			if (xhr.responseText == "PHISHING") {
				myDiv.style.backgroundColor = "red";
			} else {
				myDiv.style.color = "green";
			}

			$("#div1").text(xhr.responseText);
			return xhr.responseText;

		});
}


$(document).ready(function () {
	$("button").click(function () {
		var val = transfer();
	});
});



chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
	var tablink = tab[0].url;
	$("#p1").text("The URL being tested is - " + tablink);
});
