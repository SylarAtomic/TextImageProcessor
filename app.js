function processImage{
var ImageAPIUrl = "https://uksouth.api.cognitive.microsoft.com/vision/v2.0/ocr"; // Microsoft API Call page
var ImageAPIKey = ""; // Please enter an API Key to use this feature
    
    // Default parameters. Used in almost all cases
    var parameters = {
        "language" : "unk", // The default value is "unk", then the service will auto detect the language of the text in the image.
        "detectOrientation" : "true",
    };
    
    // Get user image
    var imageURL = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = imageURL;
    
    // API Call - Time for some jQuery
    $.ajax({
        url: ImageAPIKey + "?" + $.param(parameters),
        
        // Header
        beforeSend: function(jqXHR){
          jqXHR.setRequestHeader("Content-Type", "application/json");       // Type of content we want returned
          jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", ImageAPIKey)  // API access key
        },
        
        type: "POST",
        
        // Body
        data: '{"url": ' + '"' + imageURL + '"}',
        
    })
    
    // Successful
    .done(function(data) {
        // Display image text
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
        
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

