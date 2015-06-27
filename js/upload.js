window.reset = function (e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
}

window.onload = function() {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById("files");

        filesInput.addEventListener("change", function(event) {

            var files = event.target.files; //FileList object
            var output = document.getElementById("result");

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only json
                //if (!file.type.match('json')) continue;
                var Reader = new FileReader();
                Reader.addEventListener("load", function(event) {
                    var textFile = event.target;
                    setDB(textFile.result)
                    reset($('#files'))
                    // var div = document.createElement("div");
                    // div.innerText = textFile.result;
                    // output.insertBefore(div, null);
                });
                //Read the text file
                Reader.readAsText(file);
            }
        });
    }
    else {
        console.log("Your browser does not support File API");
    }
}
