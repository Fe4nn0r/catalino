var dataLayer = window.dataLayer;
var host = "https://cmfr-test.azure-api.net/s-a-p-test";
var partner_key = "9589ba2c8fef6759f96a7c2726c7d8a0";
var partner_secret = "3c1931161ae51ef1a168a82fe7f0eba3";
var subscription_key = "2fb179f5556c471f8ea8ea9c77dd2e50";
var partner_id = 9;

var bannerId = 'banner-promo-catalina';
var classNameElementSearchElement = 'js-search-content';
var config = [
    {
        name: 'homepage',
        url: 'http://www.in-tact.fr',
        style: 'width:100%;',
        xpath: "//*[@id=\"maincontent\"]/div[3]/div",
        condition:  (pageViewData) => {
            return pageViewData.page_path === '/';
        }
    },
    {
        name: 'categories',
        url: 'http://www.in-tact.fr',
        style: 'width:100%;',
        xpath: "//div[contains(@class, 'product-grid js-search-content')]",
        condition:  (pageViewData, codePromoArray) => {
           return  pageViewData.page_type === "product_listing" && isEligibleProductsInPage(codePromoArray)
        }
    },
    {
        name: 'search',
        url: 'http://www.in-tact.fr',
        style: 'width:100%;',
        xpath: "//div[contains(@class, 'product-grid js-search-content')]",
        condition:  (pageViewData, codePromoArray) => {
            return pageViewData.page_type === "search" && isEligibleProductsInPage(codePromoArray);
        }
    },
    {
        name: 'cart',
        url: 'http://www.in-tact.fr',
        style: 'width:100%;margin-top:10px;',
        xpath: "//div[contains(@class, 'line-item-card-wrapper')]",
        condition:  (pageViewData, codePromoArray) => {
            return pageViewData.page_type === "checkout" && !!pageViewData.cart_listItem.split(',').filter(value => codePromoArray.includes(value)).length
        }
    },
];

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function addBanner(xPath, imgSrc, linkUrl, style) {
    var link = document.createElement("a");
    link.href = linkUrl;
    link.target = '_BLANK';
    link.id = bannerId;
    var img = document.createElement("img");
    img.src = imgSrc;
    img.style = style;
    img.className = "banner-game";
    link.appendChild(img);
    var content = getElementByXpath(xPath);
    content.parentNode.insertBefore(link, content);
}

function isEligibleProductsInPage(arrayIds) {
    if(!arrayIds) return false;
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

function isBannerShown() {
    return !!document.getElementById(bannerId);
}

function showOrHideBanner(data, pageViewData, codePromoArray ) {
    config.forEach(currentConfig => {
        if(isBannerShown()) return;
        if(currentConfig.condition(pageViewData, codePromoArray)) {
            addBanner(currentConfig.xpath, data[0].carousel_pictures[1], currentConfig.url, currentConfig.style);
            console.log('show banner : ', currentConfig.name, currentConfig.style);
        }
    });

}


function returnPageViewData () {
    return dataLayer.filter(e => e.event === 'pageview')[0];
}

async function initCatalina() {
    var pageViewData = returnPageViewData();
    const data = await httpGet(host + "/ecommerce/offers?retailer_id=1", "/ecommerce/offers?retailer_id=1");
    var codePromoArray = data[0].products.map(e => e.code);
    console.log('data API : ', data);
    console.log("products eligibles", codePromoArray);
    console.log("pageView", pageViewData);
    console.log('dataLayer', dataLayer);

    var target = document.getElementsByClassName(classNameElementSearchElement)[0];
    if(target) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var observer = new MutationObserver(() => {
            showOrHideBanner(data, pageViewData, codePromoArray);
        });
        var config = { attributes: true, childList: true, characterData: true };
        observer.observe(target, config);
    }

    showOrHideBanner(data, pageViewData, codePromoArray);

}

crypToken(function () {
        initCatalina();
});

