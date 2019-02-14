function processImage(){
var ImageAPIUrl = "https://uksouth.api.cognitive.microsoft.com/vision/v2.0/ocr"; // Microsoft API Call page
var ImageAPIKey = "1c20f181438e4b11a722d8eb2febf1b4"; // Please enter an API Key to use this feature
    
    // Default parameters. Used in almost all cases
    var parameters = {
        "language" : "unk", // The default value is "unk", then the service will auto detect the language of the text in the image.
        "detectOrientation" : "true",
    };
    
    var nums = {
        "1": "2",
        "3": "Yes", 
        "4": "No",
    };
    
    var info= "";
    
    // Get user image
    var imageURL = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = imageURL;
    
    // API Call - Time for some jQuery
    $.ajax({
            url: ImageAPIUrl + "?" + $.param(parameters),
        
        // Header
        beforeSend: function(jqXHR){
          jqXHR.setRequestHeader("Content-Type", "application/json");       // Type of content we want returned
          jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", ImageAPIKey)  // API access key
        },
        
        type: "POST",
        
        // Body
        data: '{"url": ' + '"' + imageURL + '"}',
        
        success: function(data) {
            console.log('Standard', data);
            console.log(JSON.stringify(data, null, 2));
            var obj = JSON.parse(JSON.stringify(data, null, 2));

            
            /*$.each(data, function(i, info){
                info += (obj.regions[0].lines[0].words[i].text);
            })*/
            //console.log(obj);
            
            //console.log(obj.regions.lines.words.text);
            
            //var numWords = obj.regions[0].lines[j].words.length;
            
            var numLines = obj.regions[0].lines.length;
            
            for(var j = 0; j < numLines; j++)
                {
                    var numWords = obj.regions[0].lines[j].words.length;
                        for(var i = 0; i < numWords; i++){
                            info += obj.regions[0].lines[j].words[i].text + ' ';
                                /*if(i = obj.regions[0].lines[j].words[i].lastIndex){
                                   info += 'last of';
                                   }*/
                            }
                            info += '\n';
                }
           // console.log(info);

        }
        
    })
    
    // Successful
    .done(function(data) {
        // Display image text
       // $("#responseTextArea").val(JSON.stringify(data, null, 2));
        /*$("#responseTextArea").val(JSON.stringify(data, function(key, value){
            if (key == "text") {
                return value;
            }
        }, 2));*/
        
        //var jsonObj = JSON.parse(data);
        
        // $("#responseTextArea").val(jsonObj.text); Changes this back to what it should be!
        $("#responseTextArea").val(info);
        
        
    })
    // Error
    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" :
                (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
    });
};






// curl "https://<region>.api.cognitive.microsoft.com/vision/v2.0/ocr" \
// -H "Ocp-Apim-Subscription-Key: $key" \
// -H "Content-Type: application/json"  \
// -d "{'url' : 'https://raw.githubusercontent.com/MicrosoftDocs/mslearn-process-images-with-the-computer-vision-service/master/images/ebook.png'}" \
// | jq '.'


// https://static.makeuseof.com/wp-content/uploads/2018/04/Save-Water.jpg

// https://raw.githubusercontent.com/MicrosoftDocs/mslearn-process-images-with-the-computer-vision-service/master/images/ebook.png

