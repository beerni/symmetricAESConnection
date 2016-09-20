/**
 * Created by bernatmir on 20/9/16.
 */

var uri = "http://localhost:8080/";
var clientSecret = '123';
var serverSecret = '321';
function sendCypher() {
// Encrypt
    var ciphertext = CryptoJS.AES.encrypt('helloworld', clientSecret).toString();
    $.ajax({
        type : 'POST',
        url : uri,
        data:{
            cyphertext: ciphertext
        }
    }).done(function(data){
        // Decrypt
        var bytes  = CryptoJS.AES.decrypt(data.cypertext, serverSecret);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        alert('Response from server: '+plaintext);
    }).fail(function(){
        alert('error');
    });



}