
    // Display banner or not
    function displayBannerTag(){
    var element = document.getElementById('search_result');
    var products =['LU','LILI','LOLO'];
    var displayBanner =false;
    products.forEach(function (product){
    if(checkIfHtmlContainsText(element,product)){
    displayBanner = true;
}
});
    if(displayBanner){
    document.getElementById("catalina_banner").innerHTML = "<div> DISPLAY BANNER </div>";
}else{
    document.getElementById("catalina_banner").innerHTML = null;
}
}
    // Check if the HTML contains the wanted products
    function checkIfHtmlContainsText(element ,text) {
    return (element.textContent || element.innerText)
    .indexOf(text) > -1;
}

    // select the target node
    var target = document.getElementById('search_result');

    // create an observer instance, safari via webkit
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    // create the observer
    var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        displayBannerTag();
    });
});

    // configuration of the observer:
    // only really need attributes
    var config = { attributes: true, childList: true, characterData: true };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);


    // Des bouttons pour tester le changement de DOM.
    $("#add-button").on('click', function() {
    $(target).text("LU");
});
    $("#remove-button").on('click', function() {
    $(target).text("Nestle");
});
