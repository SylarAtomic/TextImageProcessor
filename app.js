
var FaceAPI = "https://uksouth.api.cognitive.microsoft.com/vision/v2.0/ocr";
var FaceKey = ""; // Please enter an API Key to use this feature







curl "https://<region>.api.cognitive.microsoft.com/vision/v2.0/ocr" \
-H "Ocp-Apim-Subscription-Key: $key" \
-H "Content-Type: application/json"  \
-d "{'url' : 'https://raw.githubusercontent.com/MicrosoftDocs/mslearn-process-images-with-the-computer-vision-service/master/images/ebook.png'}" \
 | jq '.'


// https://static.makeuseof.com/wp-content/uploads/2018/04/Save-Water.jpg

