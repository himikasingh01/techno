
     //Function to translate the content when the page language changes
 
     function googleTranslateElementInit() {
        // Initialize Google Translate widget
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'hi,en',  // Specify languages you want to support
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');

        // Translate content when the page language changes
        google.translate.TranslateService.getInstance().addEventListener('pageLanguageChanged', function (e) {
            var selectedLanguage = e.target.getLanguage();
            var elementsToTranslate = document.querySelectorAll('[data-lang]');

            elementsToTranslate.forEach(function (element) {
                var lang = element.getAttribute('data-lang');
                translateText(lang, selectedLanguage, function (translatedText) {
                    element.innerHTML = translatedText;
                });
            });
        });
    }

    // Function to translate text using Google Translate API
    function translateText(sourceLanguage, targetLanguage, callback) {
        var apiUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sourceLanguage + '&tl=' + targetLanguage + '&dt=t&q=';

        fetch(apiUrl + document.querySelector('[data-lang="' + sourceLanguage + '"]').innerText)
            .then(response => response.json())
            .then(data => {
                var translatedText = data[0][0][0];
                callback(translatedText);
            })
            .catch(error => console.error('Error:', error));
    }

