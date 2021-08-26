var dataLayer = window.dataLayer;
var host = "https://cmfr-test.azure-api.net/s-a-p-test";
var partner_key = "9589ba2c8fef6759f96a7c2726c7d8a0";
var partner_secret = "3c1931161ae51ef1a168a82fe7f0eba3";
var subscription_key = "2fb179f5556c471f8ea8ea9c77dd2e50";
var partner_id = 9;

var bannerId = 'banner-promo-catalina';
var classNameElementSearchElement = 'js-search-content';
var xPath = {
    "homepage": "//*[@id=\"maincontent\"]/div[3]/div",
    "categories": "//div[contains(@class, 'product-grid js-search-content')]",
    "search": "//div[contains(@class, 'product-grid js-search-content')]",
};

console.log('dataLayer', dataLayer);

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function addBanner(xPath, imgSrc, linkUrl) {
    var link = document.createElement("a");
    link.href = linkUrl;
    link.target = '_BLANK';
    link.id = bannerId;
    var img = document.createElement("img");
    img.src = imgSrc
    img.style = 'width:100%;'
    img.className = "banner-game";
    link.appendChild(img);
    var content = getElementByXpath(xPath);
    content.parentNode.insertBefore(link, content);
}

function isEligibleProductsInPage(arrayIds) {
    var list = document.querySelectorAll('[data-pid]');
    var showBanner = false;
    arrayIds.forEach(id => {
        if([...list].map(function(e){return e.dataset.pid } ).includes(id)) {
            showBanner = showBanner || true;
        }
    });
    return showBanner;
}


function loadScript(url, options, callback) {
    if (!callback) callback = function () { };
    if (options.jsonp) {
        var callbackName = 'luckycart_callback' + parseInt(Math.random() * 10000).toString();
        window[callbackName] = function (data) { callback(data); };
        url = url + (~url.indexOf('?') ? '&' : '?') + 'callback=' + callbackName;
    }
    var _callback = function () {
        if (options.jsonp) return;
        callback();
    };
    var _url = url + (~url.indexOf('?') ? '&' : '?') + 'nocache=' + (new Date()).getTime();
    var s = document.createElement('script');
    s.type = 'text/javascript'; s.async = true; s.src = _url;
    if (s.addEventListener) s.addEventListener('load', _callback, false);
    else s.onreadystatechange = function () { if (s.readyState === 'loaded' || s.readyState === 'complete') { _callback(); } };
    document.getElementsByTagName("head")[0].appendChild(s);
}
async function httpGet(url, apiActionPath) {
    let headers = await getHeaders(apiActionPath)
    const response = await fetch(url, {
        method: 'GET',
        headers: headers,
    })
    return (response.json())
}
function generatePartnerToken(methodRest, apiActionPath, timeStamp) {
    let dataLength = 0;
    let encrypted = CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA1(
            '/api/v1' + apiActionPath + methodRest + dataLength + partner_secret + timeStamp,
            partner_key
        )
    );
    return encrypted
}
async function getHeaders(apiActionPath) {
    let timeStamp = new Date()['toGMTString']();
    let partnerToken = await generatePartnerToken("GET", apiActionPath, timeStamp)
    let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Partner-Access-Token': partnerToken,
        'X-Cwallet-Partner-Id': partner_id,
        'X-Cwallet-Timestamp': timeStamp,
        'Ocp-Apim-Subscription-Key' : subscription_key,
    };
    return header;
}
function crypToken(callback) {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js', {}, function () {
        return callback();
    })
}
function findInDataLayer(pageType) {
    var dl = dataLayer;
    if (!(dl && dl.length)) return null;
    for (var i = dl.length - 1; i >= 0; i--) {
        if (dl[i].pageType === pageType) return dl[i];
    }
    return null;
}
function findInEventLayer(event) {
    var dl = dataLayer;
    if (!(dl && dl.length)) return null;
    for (var i = dl.length - 1; i >= 0; i--) {
        if (dl[i].event === event) return dl[i];
    }
    return null;
}
async function hideFunction() {
    var list = document.getElementsByClassName('js-go-to-checkout')
    document.getElementsByClassName("cart-header__title red")[0].innerHTML = "<b>Il tuo ordine è stato confermato </b>";
    for (var i = 0; i < list.length; i++) {
        list[i].innerHTML = "Visualizza il mio ordine";
    }
    document.getElementsByClassName("cart__delivery-pickup")[0].remove();
    document.getElementsByClassName("cart__items")[0].remove();
    document.getElementsByClassName("cart__ctas")[0].remove();
    document.getElementsByClassName("cart__carousel")[0].remove();
    document.getElementsByClassName("cart__footer")[0].remove();
}

function isShown() {
    return !!document.getElementById(bannerId);
}

function showOrHideBanner(data, codePromoArray) {
    if(isShown()) return;

    if(window.location.href === 'https://www.carrefour.it/') {
        addBanner(xPath.homepage, data[0].picture_url, 'http://www.in-tact.fr');
    }

    if(window.location.href.startsWith('https://www.carrefour.it/spesa-online/')) {
        if(isEligibleProductsInPage(codePromoArray)) {
            console.log('show banner in category');
            addBanner(xPath.categories, data[0].picture_url, 'http://www.in-tact.fr');
        }
    }

    if(window.location.href.startsWith('https://www.carrefour.it/search')) {
        if(isEligibleProductsInPage(codePromoArray)) {
            console.log('show banner in search');
            addBanner(xPath.search, data[0].picture_url, 'http://www.in-tact.fr');
        }
    }
}

async function initCatalina() {
    var pageview = findInDataLayer('homepage') || findInDataLayer('product_listing') || findInDataLayer('search');
    const data = await httpGet(host + "/ecommerce/offers?retailer_id=1", "/ecommerce/offers?retailer_id=1");
    var codePromoArray = data[0].products.map(e => e.code);
    console.log('data API : ', data);
    console.log("products eligibles", codePromoArray);

    var target = document.getElementsByClassName(classNameElementSearchElement)[0];
    if(target) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var observer = new MutationObserver(() => {
            showOrHideBanner(data, codePromoArray);
        });
        var config = { attributes: true, childList: true, characterData: true };
        observer.observe(target, config);
    }

    showOrHideBanner(data, codePromoArray);

}
async function initBennet() {
    // var pageview = findInDataLayer('homepage');
    var pageview = findInDataLayer('NewHomepage') || findInDataLayer('homepage') || findInDataLayer('CART') || findInDataLayer('PRODUCTSEARCH');
    console.log("pageview :", pageview)
    var pagesTypes = {
        "NewHomepage": "home",
        "homepage": "home",
        "CART": "checkout",
        "PRODUCTSEARCH": "productImpression",
    };
    var currentPageType = pagesTypes[pageview.pageType];
    var pagelayer = findInEventLayer(currentPageType);
    console.log("pagelayer :", pagelayer)
    if (currentPageType === 'home') {
        const banner = document.querySelector('div.home-page__products-carousel') || document.querySelector('div.bennet-banner-carousel');
        if (banner) {
            const data = await httpGet(host + "/ecommerce/offers", "/ecommerce/offers")
            var link = document.createElement('a');
            banner.after(link)
            link.href = data[0].detail_url;
            link.style.display = 'block';
            link.style.width = '100%';
            link.style.cursor = 'pointer';
            link.style.margin = '18px 0';
            link.target = '_blank';
            var img = document.createElement("img");
            img.style.width = '100%';
            img.src = data[0].picture_url;
            link.append(img);
        }
    }
    else if (currentPageType === 'checkout') {
        const banner = document.querySelector('div.cart__ctas');
        if (banner) {
            let products = pagelayer.ecommerce.checkout.products
            let apiActionPath = '/ecommerce/offers'
            if (products.length > 0) {
                apiActionPath = apiActionPath + '?';
                products.map((product) => {
                    apiActionPath = apiActionPath.concat("products[][code]=" + product.id + "&products[][quantity]=" + product.quantity + "&")
                    console.log("apiActionPath :", apiActionPath)
                })
            }
            const data = await httpGet(host + apiActionPath, apiActionPath)
            console.log("dataa :", data)
            if (data.length > 0) {
                const refChild = document.querySelector('div.cart__ctas .js-modal');
                var text = document.createElement('div');
                var t = document.createTextNode("Ben Fatto! Dopo l'acquisto potrai partecipare al gioco, buona fortuna");
                text.appendChild(t);
                text.style.color = '#e21613';
                text.style.fontWeight = '700';
                text.style.fontSize = '1.125rem';
                text.style.padding = '0 25px';
                banner.style.marginLeft = 'inherit';
                banner.style.alignItems = 'center';
                banner.insertBefore(text, refChild)


                var list = document.getElementsByClassName('js-go-to-checkout')
                for (var i = 0; i < list.length; i++) {
                    list[i].setAttribute('onclick', 'hideFunction()')
                }

                const modal = document.querySelector('section#loginModal')
                while (modal.firstChild) {
                    modal.removeChild(modal.lastChild);
                }
                var div = document.createElement('div');
                div.style.display = 'block';
                div.style.width = '100%';
                modal.append(div);
                var link = document.createElement('a');
                link.style.margin = '0 auto';
                div.append(link);
                var img = document.createElement("img");
                img.src = data[0].carousel_pictures[0];
                img.style.cursor = 'pointer';
                img.style.width = '100%';
                img.onclick = function () { window.open('http://promogaming.sqa.mesmarquespreferees.fr/?winner=1', '_blank') }
                link.append(img);
            }
        }
    } else if (currentPageType === 'productImpression') {
        const banner = document.querySelector('div.hits');
        if (banner) {
            let products = pagelayer.ecommerce.impressions
            let apiActionPath = '/ecommerce/offers'
            if (products.length > 0) {
                apiActionPath = apiActionPath + '?';
                products.map((product) => {
                    apiActionPath = apiActionPath.concat("products[][code]=" + product.id + "&products[][quantity]=1&")
                })
            }
            const data = await httpGet(host + apiActionPath, apiActionPath)
            var link = document.createElement('a');
            link.href = data[0].detail_url;
            link.target = '_blank';
            banner.before(link)
            var img = document.createElement("img");
            img.style.width = '100%';
            img.src = data[0].picture_url;
            link.append(img);
        }
    }
}
crypToken(function () {
        initCatalina();
});

