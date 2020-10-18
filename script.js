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
    console.log(collectionsDetails,page)
    let col = document.getElementById("collectionsContent")
    console.log(col)
    if(col!==null){
        col.remove()
    }
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
                'href': '#',
                'style': "text-decoration: none;"
            }, "a")
            coldiv.style.backgroundImage = "url(" + data.image_url + ")";
            rowdiv.append(coldiv)

            //title and count
            s = createElmAndSetAttr({
                "class": "text-light"
            }, "span")
            s.innerText = data.title
            coldiv.append(s)
            s = createElmAndSetAttr({
                "class": "text-light p-2"
            }, "span")
            s.innerHTML = data.res_count + " places <i class='fas fa-caret-right'></i>"
            coldiv.append(s)

        }
    }else if(page="collections_page"){
        document.getElementById("Handpicked").setAttribute("class","text-danger p-3")
        document.getElementById("Saved").setAttribute("class","text-dark p-3")
        div = document.getElementById("handpickedCollections")
        rowdiv = createElmAndSetAttr({
            'class': 'row mt-5',
            'id' : 'collectionsContent'
        }, "div")
        div.append(rowdiv)
        // console.log(collectionsDetails.collections.length)
        for (i = 0; i < collectionsDetails.collections.length; i++) {
            data = collectionsDetails.collections[i].collection
            console.log(data)

            coldiv = createElmAndSetAttr({
                'class': 'custom-collection',
                'href': '#',
                'style': "text-decoration: none;"
            }, "a")
            coldiv.style.backgroundImage = "url(" + data.image_url + ")";
            rowdiv.append(coldiv)

            //title and count
            s = createElmAndSetAttr({
                "class": "text-light"
            }, "span")
            s.innerText = data.title
            coldiv.append(s)
            s = createElmAndSetAttr({
                "class": "text-light p-2"
            }, "span")
            s.innerHTML = data.res_count + " places <i class='fas fa-caret-right'></i>"
            coldiv.append(s)

    }
}
}

let generateLocalities = (localitiesDetails) => {
    console.log("generateLocalities", localitiesDetails)
    div = document.getElementById("locality")
    rowdiv = createElmAndSetAttr({
        'class': 'row mt-5'
    }, "div")
    div.append(rowdiv)

    let details = {}
    for (i = 0; i < localitiesDetails.restaurants.length; i++) {
        data = localitiesDetails.restaurants[i].restaurant.location.locality
        if (data in details) {
            details[data] += 1
        } else {
            details[data] = 1
        }
    }

    for (i = 0; i < Object.keys(details).length; i++) {
        let key = Object.keys(details)[i]
        let data = details[key]

        coldiv = createElmAndSetAttr({
            'class': 'text-left col-lg-3 border p-4 m-3 bg-white rounded custom-locality',
            'href': '#',
            'style': "text-decoration: none;"
        }, "a")
        rowdiv.append(coldiv)

        //title and count
        s = createElmAndSetAttr({
            "class": "text-dark"
        }, "span")
        s.innerText = key
        coldiv.append(s)
        s = createElmAndSetAttr({
            "class": "text-dark p-2"
        }, "span")
        s.innerHTML = "(" + data + " Places) <i class='fas fa-caret-right float-right'></i>"
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




let main = () => {
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




// * Event Listeners
document.getElementById("searchByLocation").addEventListener("click", ()=>{
    console.log("hello")
    let id = document.getElementById("LocationDetails")
    if(id!==null){
        id.remove()
    }else{
        maindiv = document.getElementById("locationsOptions")//createElmAndSetAttr({'class':'container'},"div")
        rowdiv = createElmAndSetAttr({
            'class': 'row mt-1',
            'style':'height:200px',
            'id' : 'LocationDetails'
        }, "div")
        maindiv.append(rowdiv)
        coldiv = createElmAndSetAttr({
            'class': 'col-lg-4 offset-2 bg-white',
            'id':'custom-dropdown'
        }, "div")
        rowdiv.append(coldiv)
    
        div1 = createElmAndSetAttr({
            'class':'text-danger font-weight-bold p-2 mt-2',
            'onClick':'getCurrentLocation()'
        }, "div")
        div1.innerHTML = "<i class='fas fa-globe-americas'></i> Detect current location"
        coldiv.append(div1)

        popularLocations = ['Velachery, Chennai','Porur, Chennai','T.Nagar, Chennai']

        div1 = createElmAndSetAttr({
            'class':'dropdown-header p-2 mt-2',
            'style':'color:grey'
        }, "div")
        div1.innerText = "Popular Locations"
        coldiv.append(div1)
        for(i=0;i<popularLocations.length;i++){
            div1 = createElmAndSetAttr({
                'class':'p-1 mt-2',
                'style':'color:grey',
                'id':popularLocations[i],
                 'onClick':'searchLocation(this.id)'
            }, "div")
            div1.innerText = popularLocations[i]
            coldiv.append(div1)

        }
    }



});


// Location ------------------------------------------------------------------------------------------------------------------
let getCurrentLocation = ()=>{
    var loc = document.getElementById("searchByLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
      } else { 
        loc.innerHTML = "Geolocation is not supported by this browser.";
      } 
}

async function getPosition(position) {
    console.log(position)
    let url = "https://developers.zomato.com/api/v2.1/locations?query=India&lat="+position.coords.latitude+"&lon="+position.coords.longitude
    let apiData = await fetch(url, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'user-key': APIKEY
        }
    })
    position = await apiData.json()
    document.getElementById("searchByLocation").value = position.location_suggestions[0].city_name
    document.getElementById("LocationDetails").remove()
}

let searchLocation = (id)=>{
    document.getElementById("searchByLocation").value = id
    document.getElementById("LocationDetails").remove()
}

//---------------------------------------------------------------------------------------------------------------------------------

let handpicked = ()=>{
    getCollections().then((data) => {
        collectionsDetails = data
        generateCollections(collectionsDetails,"collections_page")
    }).catch((err) => {
        console.log(err)
    })
}


let savedCollection = ()=>{
    let col = document.getElementById("collectionsContent")
    console.log(col)
    if(col!==null){
        col.remove()
    }
    div = document.getElementById("savedCollections")
    rowdiv = createElmAndSetAttr({
        'class': 'row mt-5',
        'id' : 'collectionsContent'
    }, "div")
    div.append(rowdiv)

    coldiv = createElmAndSetAttr({
        'class': 'col-lg-4 offset-4',
        'href': '#',
        'style': "text-decoration: none;"
    }, "a")
    rowdiv.append(coldiv)

    s = createElmAndSetAttr({
        "class": "img-fluid",
        "src": "\Images\\savedCollections.png"
    }, "img")
    s.innerText = "Save collections you love!"
    coldiv.append(s)

    s = createElmAndSetAttr({
        "class": "text-dark text-justify d-block",
        "style": "font-size:25px;"
    }, "span")
    s.innerText = "Save collections you love!"
    coldiv.append(s)

    s = createElmAndSetAttr({
        "class": "text-dark text-justify",
        "style": "font-size:25px;"
    }, "span")
    s.innerText = "They'll appear here."
    coldiv.append(s)
    rowdiv.append(coldiv)

    document.getElementById("Handpicked").setAttribute("class","text-dark p-3")
    document.getElementById("Saved").setAttribute("class","text-danger p-3")
}



let createZomatoFooter = ()=>{
    div = document.getElementById("ZomatoFooter")
    div.innerHTML += '<div class="row"><div id="zomato-black" class="ml-5 mt-5">ZOMATO</div></div>'
    rowdiv = createElmAndSetAttr({
        'class': 'row mt-2',
        'id' : 'footerContent'
    }, "div")
    div.append(rowdiv)
    let Details = {'COMPANY':['Who we are','Blog','Careers','Report Fraud','Contact'],
                    'FOR FOODIES':['Code of Conduct','Community','Blogger Help','Developers','Mobile Apps'],
                    'For Restaurant':['Add restaurant','Claim your Listing','Business App','Restaurant Widgets','Product for businesses'],
                'For You':['Privacy','Terms','Security','SiteMap']}
    for(i=0;i<Object.keys(Details).length;i++){
        let key = Object.keys(Details)[i]
        coldiv = createElmAndSetAttr({
            'class': 'col-lg-3',
            'style': "text-decoration: none;"
        }, "div")
        rowdiv.append(coldiv)
    
        ul = createElmAndSetAttr({
            class: "font-weight-bold m-2",
            style:"list-style-type:none;"
        }, "ul")
        ul.innerText = key.toUpperCase()
        coldiv.append(ul)
        
        for(j=0;j<Details[key].length;j++){
            li = createElmAndSetAttr({
            }, "li")
            a = createElmAndSetAttr({
                "href":"#",
                "class" : "text-dark font-weight-light p-3",
                "style": "text-decoration: none;"
            }, "a")
            a.innerText = Details[key][j]
            li.append(a)
            ul.append(li)
        }
    }    
    hr = createElmAndSetAttr({
    }, "hr")
    div.append(hr)

    p = createElmAndSetAttr({
    }, "p")
    p.innerHTML = "<small>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2020 © Zomato™ Pvt Ltd. All rights reserved.</small>"
    div.append(p)
    




}