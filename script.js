const APIKEY = "d562feeaf7ad62452461ee883ea94f51"

// * API 
async function getCollections() {
    let url = "https://developers.zomato.com/api/v2.1/collections?city_id=7"
    let apiData = await fetch(url, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'user-key': APIKEY
        }
    })
    let collections = await apiData.json()
    return collections
}

async function getLocalities() {
    let url = "https://developers.zomato.com/api/v2.1/search?entity_id=7&entity_type=city"
    let apiData = await fetch(url, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'user-key': APIKEY
        }
    })
    let collections = await apiData.json()
    console.log(collections)
    return collections
}



// * Functions 

let createElmAndSetAttr = function (AllAttributes, Elmtype) {
    var Elm = document.createElement(Elmtype)
    for (attr in AllAttributes) {
        Elm.setAttribute(attr, AllAttributes[attr])
    }
    return Elm
}
let generateCards = function (cardDetails) {
    // console.log(cardDetails)
    maindiv = document.getElementById("Options") //createElmAndSetAttr({'class':'container'},"div")
    rowdiv = createElmAndSetAttr({
        'class': 'row mt-5'
    }, "div")
    maindiv.append(rowdiv)
    // document.body.append(maindiv)
    for (i = 0; i < cardDetails.length; i++) {
        data = cardDetails[i]
        coldiv = createElmAndSetAttr({
            'class': 'col-lg-3 col-md-3 col-sm-3 col-xs-3 mt-5 card-custom',
            'style': 'border: none;cursor:pointer'
        }, "div")
        rowdiv.append(coldiv)
        a = createElmAndSetAttr({
            'href': '#',
            'style': "text-decoration: none;"
        }, "a")
        coldiv.append(a)

        div1 = createElmAndSetAttr({
            'height': '24rem',
            width: '100%'
        }, "div")
        a.append(div1)
        cardImg = createElmAndSetAttr({
            'class': 'img-fluid mx-auto d-block p-1 ',
            'style': 'border-radius:30px;height:250px;width:250px',
            'src': data.img
        }, "img")
        div1.append(cardImg)

        div2 = createElmAndSetAttr({
            'height': '24rem',
            width: '100%'
        }, "div")
        a.append(div2)

        p = createElmAndSetAttr({
            class: "text-center text-dark font-weight-bold"
        }, "p")
        p.innerText = data.title
        div2.append(p)
    }
}

let generateCollections = (collectionsDetails, page = "mainPage") => {
    if (page === "mainPage") {
        div = document.getElementById("Collections")
        rowdiv = createElmAndSetAttr({
            'class': 'row mt-5'
        }, "div")
        div.append(rowdiv)
        for (i = 0; i < 4; i++) {
            data = collectionsDetails.collections[i].collection
            console.log(data)

            coldiv = createElmAndSetAttr({
                'class': 'custom-collection',
                'href' : '#',
                'style': "text-decoration: none;"
            }, "a")
            coldiv.style.backgroundImage = "url(" + data.image_url + ")";
            rowdiv.append(coldiv)

            //title and count
            s = createElmAndSetAttr({"class":"text-light"}, "span")
            s.innerText = data.title
            coldiv.append(s)
            s = createElmAndSetAttr({"class":"text-light p-2"}, "span")
            s.innerHTML = data.res_count + " places <i class='fas fa-caret-right'></i>"
            coldiv.append(s)

        }
    }
}

let generateLocalities = (localitiesDetails)=>{
    console.log("generateLocalities",localitiesDetails)
    div = document.getElementById("locality")
    rowdiv = createElmAndSetAttr({
        'class': 'row mt-5'
    }, "div")
    div.append(rowdiv)

    let details = {}
    for (i = 0; i < localitiesDetails.restaurants.length; i++) {
        data = localitiesDetails.restaurants[i].restaurant.location.locality
        if(data in details){
            details[data] += 1
        }else{
            details[data] = 1
        }
    }

    for (i = 0; i < Object.keys(details).length; i++) {
        let key = Object.keys(details)[i]
        let data = details[key]

        coldiv = createElmAndSetAttr({
            'class': 'text-left col-lg-3 border p-4 m-3 bg-white rounded custom-locality',
            'href' : '#',
            'style': "text-decoration: none;"
        }, "a")
        rowdiv.append(coldiv)

        //title and count
        s = createElmAndSetAttr({"class":"text-dark"}, "span")
        s.innerText = key
        coldiv.append(s)
        s = createElmAndSetAttr({"class":"text-dark p-2"}, "span")
        s.innerHTML = "("+data+" Places) <i class='fas fa-caret-right float-right'></i>" 
        coldiv.append(s)

}
}

let cardDetails = [{
        'img': 'https://b.zmtcdn.com/webFrontend/64dffaa58ffa55a377cdf42b6a690e721585809275.png?fit=around|402:360&crop=402:360;*,*',
        'title': 'Order food Online'
    },
    {
        'img': 'https://b.zmtcdn.com/webFrontend/95f005332f5b9e71b9406828b63335331585809309.png?fit=around|402:360&crop=402:360;*,*',
        'title': 'Go out for a meal'
    },
    {
        'img': 'https://b.zmtcdn.com/webFrontend/8ff4212b71b948ed5b6d2ce0d2bc99981594031410.png?fit=around|402:360&crop=402:360;*,*',
        'title': 'Nightlife & Clubs'
    },
    {
        'img': 'https://b.zmtcdn.com/webFrontend/b256d0dd8a29f9e0623ecaaea910534d1585809352.png?fit=around|402:360&crop=402:360;*,*',
        'title': 'Zomato Pro'
    }
]




let main = ()=>{
    // create cards
    generateCards(cardDetails)

    // Collections section
    getCollections().then((data) => {
        collectionsDetails = data
        generateCollections(collectionsDetails)
    }).catch((err) => {
        console.log(err)
    })

    //Popular Localities
    getLocalities().then((data) => {
        localitiesDetails = data
        generateLocalities(localitiesDetails)
    }).catch((err) => {
        console.log(err)
    })
}

main()