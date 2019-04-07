// On clicking extn button, show the url, encrypted password. 
// Give master password & decrypt password. Set new password.

window.addEventListener('load', function load(event) {
    // Get active tab details - for URL fetching
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        url = new URL(url);
        url = url.hostname;

        document.getElementById('showDomain').textContent += url;
        
        // Fetch saved, encrypted password
        chrome.storage.sync.get(url, function(encPass) {
            // If not saved, show that
            if (encPass[url] === undefined){
                document.getElementById('showEncPass').textContent = 'Password not set on this website';
            }
            // If saved, show decryption button and encrypted password
            else {
                var block = document.getElementById('showEncPass');
                block.textContent = 'Password is set! Show Encrypted Password';
                block.classList.remove('w3-red');
                block.classList.add('w3-green');
                document.getElementById('hide').textContent = encPass[url];
                document.getElementById('decrypt').style.visibility = 'visible';

                document.getElementById('decrypt').addEventListener('click', function(){ 
                    // On clicking decrypt button, call this function with encrypted password
                    recoverPass(encPass[url]);
                });
            }
        });

        document.getElementById('setPass').addEventListener('click', function(){ 
            // On clicking set password button, call this function
            setPass(url);
        });
    // document.getElementById('viewDomain').onclick = function() {
            
    });

});

// Function to set password for some URL
// Do sanity check and then set password on ledger
function setPass(url){
    masterPass = document.getElementById('master').value;
    websitePass = document.getElementById('pass').value;
    // alert(masterPass + websitePass);
    if (masterPass == '' || websitePass == ''){
        alert('One of the password is empty!');
        return;
    }


    var ciphertext = sjcl.encrypt(masterPass, websitePass)

    // Save encrypted password aka ciphertext
    chrome.storage.sync.set({[url]: ciphertext}, function() {
        // TODO: better way to show than alerts
        alert('Set password for ' + url + ' = ' + ciphertext);
    });
}

// Function to decrypt password. Do sanity check and then call SJCL
function recoverPass(ct){
    masterPass = document.getElementById('master').value;
    if (masterPass == ''){
        alert('Password is empty!');
        return;
    }
    try{
        var plaintext = sjcl.decrypt(masterPass, ct);
        // TODO: Find better way to show the password than alert
        alert(plaintext);
    } catch(err){
        alert('Wrong Key!')
    }
  
}