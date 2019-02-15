function processImage(){
var ImageAPIUrl = "https://uksouth.api.cognitive.microsoft.com/vision/v2.0/ocr"; // Microsoft API Call page
var ImageAPIKey = "1c20f181438e4b11a722d8eb2febf1b4"; // Please enter an API Key to use this feature - My key will be regenerated when fill goes public.
    
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
    var imageURL = document.getElementById("inputImage").value;             // Get use image URL from HTML doc
    document.querySelector("#sourceImage").src = imageURL;
    
    // API Call - Time for some jQuery
    $.ajax({
            url: ImageAPIUrl + "?" + $.param(parameters),                   // ajax request start
        
        // Header
        beforeSend: function(jqXHR){
          jqXHR.setRequestHeader("Content-Type", "application/json");       // Type of content we want returned
          jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", ImageAPIKey)  // API access key
        },
        
        type: "POST",                                                       // Request type
        
        // Body
        data: '{"url": ' + '"' + imageURL + '"}',
        
        success: function(data) {                                           
            //console.log('Standard', data);                                 // Used for debugging
            //console.log(JSON.stringify(data, null, 2));                    // Used for debugging     
            var obj = JSON.parse(JSON.stringify(data, null, 2));
            
            var numLines = obj.regions[0].lines.length;
            
            for(var j = 0; j < numLines; j++)                               // Loop to extract only words that are returned
                {
                    var numWords = obj.regions[0].lines[j].words.length;    
                        for(var i = 0; i < numWords; i++){
                            info += obj.regions[0].lines[j].words[i].text + ' ';
                            }
                            info += '\n';
                }
        }
        
    })
    
    // Successful
    .done(function(data) {
        
        $("#responseTextArea").val(info);                                   // Sending words found to responce box
        
        
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

