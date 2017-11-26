$(document).ready(function() {
    check();
});

function check() {
    if (document.getElementById('encoderRadio').checked) {
        $(".encoder").show();
        $(".decoder").hide();
    } else {
        $(".encoder").hide();
        $(".decoder").show();
    }
}

var alphabetBig = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ';
var alphabetSmall = alphabetBig.toLowerCase();
var lettersCount = alphabetBig.length;

function clearMessage() {
    document.getElementById("message").value = '';
    document.getElementById("encodedMessage").value = '';
    document.getElementById("cipheredMessage").value = '';
    document.getElementById("decodedMessage").value = '';
}

function encodeMessage() {
    var message = document.getElementById("message").value;
    var shift = parseInt(document.getElementById("shift").value);

    document.getElementById("encodedMessage").value = encoding(message, shift);
}

function encoding(message, shift) {
    var stringArray = message.split('');
    var finalString = '';

    stringArray.forEach(function(letter) {
        var alphabet = alphabetBig;
        if (letter === letter.toLowerCase()) {
            alphabet = alphabetSmall;
        }

        if (letter.match(/[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż]/)) {
            var letterInitialPosition = alphabet.indexOf(letter);
            var letterPosition = letterInitialPosition + shift;

            if (letterPosition > lettersCount - 1) {
                var letterFinalPosition = letterPosition - lettersCount;
                finalString += alphabet.charAt(letterFinalPosition);
            } else {
                finalString += alphabet.charAt(letterPosition);
            }
        } else {
            finalString += letter;
        }
    });

    return finalString;
}

function decodeMessage() {
    var cipheredMessage = document.getElementById("cipheredMessage").value;

    document.getElementById("decodedMessage").value = decoding(cipheredMessage);
}

function decoding(cipheredMessage) {
    var maxShift = lettersCount - 1;
    var stringArray = cipheredMessage.split('');
    var finalString = '';

    for (var shift = 1; shift <= maxShift; shift++) {
        stringArray.forEach(function(letter) {
            var alphabet = alphabetBig;
            if (letter === letter.toLowerCase()) {
                alphabet = alphabetSmall;
            }

            if (letter.match(/[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż]/)) {
                var letterInitialPosition = alphabet.indexOf(letter);
                var letterPosition = letterInitialPosition - shift;

                if (letterPosition < 0) {
                    var letterFinalPosition = lettersCount + letterPosition;
                    finalString += alphabet.charAt(letterFinalPosition);
                } else {
                    finalString += alphabet.charAt(letterPosition);
                }
            } else {
                finalString += letter;
            }
        });
        finalString = shift < maxShift ? finalString + '\n' : finalString;
    }

    return finalString;
}
