window.onload = init;

function init() {

    // de maps
    const worldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    const OpenStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })


    //instellingen maps
    const mymap = L.map('mapid', {
        zoom: 16,
        layers: [OpenStreetMap],
        animate: true,
        duration: 0.5,
        wheelDebounceTime: 1,
    });

    mymap.setView([52.261223462827274, 4.782378673553468], 16);

    const matchonline = L.layerGroup().addTo(mymap);
    const rodeliftmarkers = L.layerGroup().addTo(mymap);

    const basemaps = {
        'OpenStreetMap': OpenStreetMap,
        'worldImagery': worldImagery,
    };

    const overlayMaps = {
        'Match Online': matchonline,
        'Rode Lift' : rodeliftmarkers
    };



    // marker kleuren
    function createIcon(iconUrl, shadowUrl, iconSize = [25, 41], iconAnchor = [12, 41], popupAnchor = [1, -34], shadowSize = [41, 41]) {
        return new L.Icon({
            iconUrl: iconUrl,
            shadowUrl: shadowUrl,
            iconSize: iconSize,
            iconAnchor: iconAnchor,
            popupAnchor: popupAnchor,
            shadowSize: shadowSize
        });
    }

    const greenIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', [30, 49], [15, 45], [1, -34], [41, 41]);
    const yellowIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', [30, 49], [15, 45], [1, -34], [41, 41]);
    const violetIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', [30, 49], [15, 45], [1, -34], [41, 41]);
    const redIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', [30, 49], [15, 45], [1, -34], [41, 41]);
    const blueIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', [30, 49], [15, 45], [1, -34], [41, 41]);
    const goldIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', [30, 49], [15, 45], [1, -34], [41, 41]);
    const blackIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', [30, 49], [15, 45], [1, -34], [41, 41]);
    const orangeIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', [30, 49], [15, 45], [1, -34], [41, 41]);
    const greyIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', [30, 49], [15, 45], [1, -34], [41, 41]);
    const whiteIcon = createIcon('./images/whitemarker.png');
    const restoIcon = createIcon('./images/restoicon.png');
    const colorIcons = {};

    // liften
    const geleLiftIcon = createIcon('./images/gelelift.png', null, [32, 37]);
    const rodeLiftIcon = createIcon('./images/rodelift.png', null, [32, 37]);
    const blauweLiftIcon = createIcon('./images/blauwelift.png', null, [32, 37]);
    const grijzeLiftIcon = createIcon('./images/grijzelift.png', null, [32, 37]);
    const witteLiftIcon = createIcon('./images/wittelift.png', null, [32, 37]);
    const groeneLiftIcon = createIcon('./images/groenelift.png', null, [32, 37]);
    const bruineLiftIcon = createIcon('./images/bruinelift.png', null, [32, 37]);
    const restoLiftIcon = createIcon('./images/restolift.png', null, [40, 45]);
    const violetParkIcon = createIcon('./images/violetpark.png', null, [20, 25]);
    const blauwParkIcon = createIcon('./images/blauwpark.png', null, [20, 25]);


    mymap.on('click', function (e) {
        console.log(e.latlng)
    })

    const locateControl = L.control.locate().addTo(mymap);

    mymap.on('locationfound', function (e) {
        L.popup()
            .setLatLng(e.latlng)
            .setContent('You are here')
            .openOn(mymap);
    });

    function createCustomMarker(lat, lng, title, icon, tooltipContent, popupTitle, ...popupTextArrayAndImg) {
        const marker = L.marker([lat, lng], {
            title: title,
            opacity: 1,
            riseOnHover: true,
            icon: icon
        })
        // .addTo(mymap);

        const tooltip = L.tooltip({
            direction: 'bottom',
            permanent: true,
            opacity: 1,
            offset: [0, 10]
        }).setContent(tooltipContent);

        marker.bindTooltip(tooltip).openTooltip();


        const [popupText1, popupText2, popupText3, popupImgSrc] = popupTextArrayAndImg;

        const popupContent = `<h3>${popupTitle}</h3>
                             <p>${popupText1}</p>
                             <p>${popupText2}</p>
                             <p>${popupText3}</p>
                             <img src="${popupImgSrc}" alt="${title}" width="150">`;

        const popup = marker.bindPopup(popupContent);

        return { marker, tooltip, popup };
    }






    // MARKER ONDERHOUD
    // Meer informatie: https://leafletjs.com/
    // Aanpassingen maken aan de markers:
    // Zet eerst de code live door op "Go live" te klikken rechts onderin. Dan kan je zien of je code werkt.
    // 1. Hieronder is een voorbeeld code voor de marker. Deze kun je dupliceren. 
    // 2. Bepaal de coördinaten door de kaart op de browser te inspecteren en op de kaart te klikken. Er verschijnen dan coordinaten in de console. Je kan ook de coördinaten van Google maps overnemen.
    // 3. Vervang de coördinaten in de voorbeeldcode.
    // 4. Geef de marker een naam zoals "voorbeeld". (achter const)
    // 5. Geef de marker een titel die je wilt zien op de kaart. Dit moet 3x worden ingevuld. De laatste keer is de titel in de popup.
    // 6. vervang de afbeelding. Sla het logo op in de map images. Vervang vervolgens adomex.svg voor de naam van jouw afbeelding. 

    // check of de code werkt door op "Go live" te klikken rechts onderin het scherm. 
    // sla de code op en upload het mapje main.js opnieuw op Github. Let op: kan een paar minuten duren voordat de wijzigingen zijn doorgevoerd. 

    // voorbeeldmarker
    const voorbeeld = createCustomMarker( // geef de marker een korte naam achter const (geenspaties)
        65.65827451982663,
        -186.32812500000003,
        'Voorbeeldmarker', //titel
        redIcon, // kleur van de icoon: redIcon, greenIcon, yellowIcon, violetIcon, blueIcon, goldIcon, blackIcon, orangeIcon, greyIcon, whiteIcon, restoIcon
        'Voorbeeldmarker', // titel
        'Voorbeeldmarker B.V.', //evt langere titel - dit verschijnt in de popup
        ' tekst', // tekst zoals bereikbaar via de grijze lift
        'Softwarepakket: Match Online', // softwarepakket
        'adres', // eventueel een adres
        './images/adomex.svg' // vervang adomex.svg voor de juiste afbeelding
    )
    voorbeeld.marker.addTo(matchonline); // hier "voorbeeld" vervangen met de eerste titel en "matchonline" met bij welk filter hij hoort

    // ASS
    const ass = createCustomMarker(
        52.20999320808365,
        4.874566197395326,
        'Advisor Software Solutions',
        goldIcon,
        'Advisor Software Solutions',
        'Advisor Software Solutions',
        '',
        '',
        '',
        './images/ass.svg'
    )

    // Salaba
    const salaba = createCustomMarker(
        52.263626816106814,
        4.782840013504029,
        'Salaba',
        greyIcon,
        'Salaba',
        'Salaba',
        'Begane grond - Bereikbaar via de grijze lift',
        'Softwarepakket: Match Online',
        '',
        './images/salaba.webp'
    )
    salaba.marker.addTo(matchonline);

    // Larosa
    const larosa = createCustomMarker(
        52.26325909836238,
        4.783140420913697,
        'Larosa',
        greyIcon,
        'Larosa',
        'Larosa',
        'Begane grond - Bereikbaar via de grijze lift',
        'Softwarepakket: Match Online',
        '',
        './images/witteimg.jpeg'
    )

    // Andreola Fiori SRL
    const andreola = createCustomMarker(
        52.262484254561144,
        4.77781891822815,
        'Andreola Fiori',
        redIcon,
        'Andreola Fiori',
        'Andreola Fiori',
        'Begane grond - Bereikbaar via de rode lift',
        'Softwarepakket: Match Online',
        '',
        './images/andreola.png'
    )
    andreola.marker.addTo(matchonline);
    andreola.marker.addTo(rodeliftmarkers);


    // G.W. van Delft B.V.
    const gwvandelft = createCustomMarker(
        52.25888564996747,
        4.78232502937317,
        'G.W. van Delft',
        violetIcon,
        'G.W. van Delft',
        'G.W. van Delft B.V.',
        'Begane grond - Bereikbaar via parkeerdek 5',
        'Softwarepakket: Match Online',
        '',
        './images/gwvandelft.jpeg'
    )
    gwvandelft.marker.addTo(matchonline);

    // Realflor
    const realflor = createCustomMarker(
        52.25947011473627,
        4.7814345359802255,
        'Realflor B.V.',
        violetIcon,
        'Realflor B.V.',
        'Realflor B.V.',
        'Begane grond - Bereikbaar via parkeerdek 5',
        'Softwarepakket: Match Online',
        '',
        './images/realflor.jpeg'
    )
    realflor.marker.addTo(matchonline);

    // Rogoflor
    const rogoflor = createCustomMarker(
        52.2597518268768,
        4.779603760689498,
        'Rogoflor B.V.',
        violetIcon,
        'Rogoflor B.V.',
        'Rogoflor B.V.',
        'Begane grond - Bereikbaar via parkeerdek 5',
        'Softwarepakket: Match Online',
        '',
        './images/rogoflor.png'
    )
    rogoflor.marker.addTo(matchonline);

    // Willem Liefting
    const willemliefting = createCustomMarker(
        52.2608294580590,
        4.779224395751954,
        'Willem Liefting',
        violetIcon,
        'Willem Liefting',
        'Willem Liefting',
        'Begane grond - Bereikbaar via parkeerdek 5',
        'Softwarepakket: Match Online',
        '',
        './images/willemliefting.png'
    )
    willemliefting.marker.addTo(matchonline);

    // Green Service
    const greenservice = createCustomMarker(
        52.26181446341588,
        4.777529239654542,
        'Green Service',
        violetIcon,
        'Green Service',
        'Green Service',
        'Begane grond - Bereikbaar via parkeerdek 5',
        'Softwarepakket: Match Online',
        '',
        './images/greenservice.svg'
    )
    greenservice.marker.addTo(matchonline);

    // Barnhoorn
    const barnhoorn = createCustomMarker(
        52.26456251268598,
        4.784390330314636,
        'Barnhoorn',
        orangeIcon,
        'Barnhoorn',
        'Barnhoorn',
        'Begane grond - Bereikbaar via de bruine lift',
        'Softwarepakket: Match Online',
        '',
        './images/barnhoorn.png'
    )
    barnhoorn.marker.addTo(matchonline);

    // PPE export, Nosaflora, van der Lem
    const ppenoalem = createCustomMarker(
        52.260586486706934,
        4.785597324371339,
        'PPE, Nosaflora, v.d. Lem',
        yellowIcon,
        'PPE, Nosaflora, v.d. Lem',
        'PPE export, Nosaflora, van der Lem',
        'Begane grond - Bereikbaar via de gele of witte lift',
        'Softwarepakket: Match Online',
        '',
        './images/3logos.png'
    )
    ppenoalem.marker.addTo(matchonline);

    // BloomX
    const bloomx = createCustomMarker(
        52.260212176883755,
        4.786916971206666,
        'BloomX',
        whiteIcon,
        'BloomX',
        'BloomX',
        'Tweede verdieping - Bereikbaar via de witte lift of via de Resto lift',
        'Softwarepakket: Match Online',
        '',
        './images/bloomx.png'
    )
    bloomx.marker.addTo(matchonline);

    // Grower Connect
    const growerconnect = createCustomMarker(
        52.26132196347236,
        4.786959886550904,
        'Grower Connect',
        restoIcon,
        'Grower Connect',
        'Grower Connect',
        'Tweede verdieping - Bereikbaar via de Resto lift',
        'Softwarepakket: Match Online',
        '',
        './images/growerconnect.png'
    )
    growerconnect.marker.addTo(matchonline);

    // Hans Visser
    const hansvisser = createCustomMarker(
        52.260931242959515,
        4.787866473197938,
        'Hans Visser',
        restoIcon,
        'Hans Visser',
        'Hans Visser',
        'Met de trap (of buiten beneden parkeren)',
        'Kantoren zijn een verdieping naar beneden en de rest is op de begane grond.',
        'Softwarepakket: Match Online',
        './images/hansvisser.png'
    )
    hansvisser.marker.addTo(matchonline);

    // Quattroplant
    const quattro = createCustomMarker(
        52.2649170872833,
        4.784438610076905,
        'Quattroplant',
        blackIcon,
        'Quattroplant',
        'Quattroplant',
        'Begane grond - Bereikbaar via beneden buiten',
        'Softwarepakket: Match Online',
        '',
        './images/quattroplant.jpeg'
    )
    quattro.marker.addTo(matchonline);

    // IBH export - oost
    const ibh = createCustomMarker(
        52.258925052328856,
        4.793128967285157,
        'IBH Export',
        blackIcon,
        'IBH Export',
        'IBH Export',
        'Softwarepakket: Match Online',
        'Oost',
        '',
        './images/ibh.png'
    )
    ibh.marker.addTo(matchonline);

    // Verbeek en Bol - oost
    const verbeekenbol = createCustomMarker(
        52.25874774142695,
        4.793837070465089,
        'Verbeek en Bol Export',
        blackIcon,
        'Verbeek en Bol Export',
        'Verbeek en Bol Export',
        'Softwarepakket: Match Online',
        'Oost',
        '',
        './images/verbeekenbol.svg'
    )
    verbeekenbol.marker.addTo(matchonline);

    // IBS
    const ibs = createCustomMarker(
        52.25650174197632,
        4.795006513595582,
        'IBS',
        blackIcon,
        'IBS',
        'Inter Bloemen Service Holland (IBS)',
        'Softwarepakket: Match Online',
        'Oost',
        '',
        './images/ibs.png'
    )
    ibs.marker.addTo(matchonline);

    // IPT
    const ipt = createCustomMarker(
        52.26210996075649,
        4.785876274108888,
        'IPT',
        blackIcon,
        'International Plant Trade',
        'International Plant Trade (IPT)',
        'Bereikbaar via....?',
        'Softwarepakket: Match Online',
        '',
        './images/ipt.svg'
    )
    ipt.marker.addTo(matchonline);

    // FLS
    const fls = createCustomMarker(
        52.26249410435545,
        4.778001308441162,
        'FLS Services',
        redIcon,
        'FLS Services',
        'Flora Lifestyle (FLS)',
        'Begane grond - Bereikbaar via de rode lift',
        'Softwarepakket: Match Online',
        '',
        './images/fls.png'
    )
    fls.marker.addTo(matchonline);

    // Plant Trend
    const planttrend = createCustomMarker(
        52.27147948849714,
        4.802838563919068,
        'Plant Trend',
        blackIcon,
        'Plant Trend',
        'Plant Trend',
        'Softwarepakket: Match Online',
        'Legmeerdijk 213, 1432 KA Aalsmeer',
        '',
        './images/planttrend.png'
    )
    planttrend.marker.addTo(matchonline);

    // RM Plants
    const rmplants = createCustomMarker(
        52.266240150796534,
        4.820573329925537,
        'RM Plants',
        blackIcon,
        'RM Plants',
        'RM Plants',
        'Softwarepakket: Match Online',
        'Meerlandenweg 22, 1187 ZR Amstelveen',
        '',
        './images/rmplants.jpeg'
    )
    rmplants.marker.addTo(matchonline);

    // De Noordpoel
    const denoordpoel = createCustomMarker(
        52.25389768503384,
        4.794786572456361,
        'De Noordpoel',
        blackIcon,
        'De Noordpoel',
        'De Noordpoel',
        'Softwarepakket: Match Online',
        'Poelweg 22, 1424 PB De Kwakel',
        '',
        './images/denoordpoel.png'
    )
    denoordpoel.marker.addTo(matchonline);

    // Bromelia specialist
    const bromelia = createCustomMarker(
        52.23096684857526,
        4.7661030292510995,
        'Bromelia Specialist',
        blackIcon,
        'Bromelia Specialist',
        'Bromelia Specialist B.V.',
        'Softwarepakket: Match Online',
        'Achterweg 11, 1424 PN De Kwakel',
        '',
        './images/bromelia.svg'
    )
    bromelia.marker.addTo(matchonline);

    // JS- Creations
    const jscreations = createCustomMarker(
        52.23549417209511,
        4.771682024002076,
        'JS-Creations',
        blackIcon,
        'JS-Creations',
        'JS-Creations',
        'Softwarepakket: Match Online',
        'Achterweg 20, 1424 PR De Kwakel',
        '(Op het terrein bij HPD potplanten)',
        './images/jscreations.jpeg'
    )
    jscreations.marker.addTo(matchonline);

    // Fertiplant
    const fertiplant = createCustomMarker(
        52.25687608311679,
        4.771435260772705,
        'Fertiplant',
        blackIcon,
        'Fertiplant',
        'Fertiplant B.V.',
        'Softwarepakket: Match Online',
        'Hornmeer, Burgemeester Kasteleinweg 5, 1431 BX Aalsmeer',
        '',
        './images/fertiplant.png'
    )
    fertiplant.marker.addTo(matchonline);

    // Garden plant 
    const gardenplant = createCustomMarker(
        51.41054323728342,
        6.136239767074585,
        'Garden Plant',
        blackIcon,
        'Garden Plant',
        'Garden Plant B.V.',
        'Softwarepakket: Match Online',
        'Venrayseweg 138B, 5928 RH Venlo',
        '',
        './images/gardenplant.svg'
    )
    gardenplant.marker.addTo(matchonline);

    // Ebus planten cash & carry
    const ebus = createCustomMarker(
        51.3997879946266,
        6.131057739257813,
        'Ebus planten',
        blackIcon,
        'Ebus planten',
        'Ebus planten cash & carry',
        'Softwarepakket: Match Online',
        'Floralaan 82, 5928 RB Venlo',
        '',
        './images/ebus.svg'
    )
    ebus.marker.addTo(matchonline);


    // Hagedorn Blumen & Pflanzen GmbH
    const hagedorn = createCustomMarker(
        51.39886427775372,
        6.136760115623475,
        'Hagedorn Blumen & Pflanzen',
        blackIcon,
        'Hagedorn Blumen & Pflanzen',
        'Hagedorn Blumen & Pflanzen GmbH',
        'Softwarepakket: Match Online',
        'Venrayseweg 214 Venlo',
        '',
        './images/hagedorn.png'
    )
    hagedorn.marker.addTo(matchonline);

    // Kinomi verkoop
    const kinomi = createCustomMarker(
        52.269691737764525,
        4.722080688866945,
        'Kinomi',
        blackIcon,
        'Kinomi',
        'Kinomi B.V.',
        'Softwarepakket: Match Online',
        'Aalsmeerderweg 694, 1435 ER Rijsenhout',
        '',
        './images/kinomi.jpeg'
    )
    kinomi.marker.addTo(matchonline);

    // Fruithof
    const fruithof = createCustomMarker(
        51.48131105026935,
        3.944547087565756,
        'Fruithof',
        blackIcon,
        'Fruithof',
        'Fruithof',
        'Softwarepakket: Match Online',
        'Dijkwelseweg 38a',
        '',
        './images/fruithof.svg'
    )
    fruithof.marker.addTo(matchonline);

    // Adomex1
    const adomex1 = createCustomMarker(
        52.25787431071164,
        4.783628582954407,
        '<h2>Adomex</h2>',
        blackIcon,
        '<h2>Adomex</h2>',
        '<h3>Adomex - locatie 1</h3>',
        '<p>Softwarepakket: Match Online</p><p></p>',
        '',
        '',
        './images/adomex.svg'
    )
    adomex1.marker.addTo(matchonline);

    // Adomex2
    const adomex2 = createCustomMarker(
        52.25772818848179,
        4.805252452913285,
        'Adomex',
        blackIcon,
        'Adomex',
        'Adomex - locatie 2',
        'Softwarepakket: Match Online',
        'Randweg 119-A, 1422 ND Uithoorn',
        '',
        './images/adomex.svg'
    )
    adomex2.marker.addTo(matchonline);

    // Lundager
    const lundager = createCustomMarker(
        52.26544050452337,
        4.796797915178934,
        'Lundager',
        blackIcon,
        'Lundager',
        'Lundager',
        'Softwarepakket: Match Online',
        'Japanlaan 26 D, 1432 DK Aalsmeer (in het pand bij Alex Andersen)',
        '',
        './images/lundager.jpeg'
    )
    lundager.marker.addTo(matchonline);

    // Hans Lamers
    const hanslamers = createCustomMarker(
        51.909134672028394,
        5.920194816270298,
        'Hans Lamers',
        blackIcon,
        'Hans Lamers',
        'Hans Lamers B.V.',
        'Softwarepakket: Match Online',
        'Nijverheidstraat 39a, 6681 LN Bemmel',
        '',
        './images/hanslamers.png'
    )
    hanslamers.marker.addTo(matchonline);

    // M. Margot CV
    const margot = createCustomMarker(
        52.067647340634174,
        4.705379296827725,
        'M. Mathot CV',
        blackIcon,
        'M. Mathot CV',
        'M. Mathot CV',
        'Softwarepakket: Match Online',
        'Zijdeweg 6A, 2811 PC Reeuwijk',
        '',
        './images/margot.png'
    )
    margot.marker.addTo(matchonline);

    // Jogé Services
    const joge = createCustomMarker(
        52.25746747567881,
        4.773567373223622,
        'JoGé Services v.o.f.',
        blackIcon,
        'JoGé Services v.o.f.',
        'JoGé Services v.o.f.',
        'Softwarepakket: Match Online',
        'Visserstraat 48, 1431 GJ Aalsmeer',
        '',
        './images/joge.gif'
    )
    joge.marker.addTo(matchonline);

    // Verboom1
    const verboom1 = createCustomMarker(
        52.00195653443982,
        4.620938932457811,
        'Kwekerij Verboom',
        blackIcon,
        'Kwekerij Verboom',
        'Kwekerij Verboom B.V. - locatie 1',
        'Softwarepakket: Match Online',
        'Zuidelijke Dwarsweg 13, 2761 JN Zevenhuizen',
        '',
        './images/verboom.jpeg'
    )
    verboom1.marker.addTo(matchonline);

    // Verboom2
    const verboom2 = createCustomMarker(
        51.99291434408866,
        4.606717223837565,
        'Kwekerij Verboom',
        blackIcon,
        'Kwekerij Verboom',
        'Kwekerij Verboom B.V. - locatie 2',
        'Softwarepakket: Match Online',
        'Zuidelijke Dwarsweg 9, 2761 JN Zevenhuizen',
        '',
        './images/verboom.jpeg'
    )
    verboom2.marker.addTo(matchonline);

    // Melimex
    const melimex = createCustomMarker(
        52.25727337065916,
        4.791551080044215,
        'Melimex',
        blackIcon,
        'Melimex',
        'Melimex B.V.',
        'Softwarepakket: Match Online',
        'Prunus 11, 1424 LD De Kwakel',
        '',
        './images/melimex.jpeg'
    )
    melimex.marker.addTo(matchonline);

    // Waterdrinker
    const waterdrinker = createCustomMarker(
        52.261360871998136,
        4.793339597982696,
        'Waterdrinker',
        blackIcon,
        'Waterdrinker',
        'Waterdrinker Aalsmeer B.V.',
        'Softwarepakket: Match Online',
        'Sierteeltstraat 25, 1431 GM Aalsmeer',
        '',
        './images/waterdrinker.svg'
    )
    waterdrinker.marker.addTo(matchonline);

    // Euroveiling Brussel
    const euroveiling = createCustomMarker(
        50.88668918180799,
        4.380972196941027,
        'Euroveiling',
        blackIcon,
        'Euroveiling',
        'Euroveiling Brussel',
        'Softwarepakket: Match Online',
        'Vilvoordsesteenweg 46, 1120 Brussel, België',
        '',
        './images/euroveiling.svg'
    )
    euroveiling.marker.addTo(matchonline);

    // Aphrodite Orchidee
    const Aphrodite = createCustomMarker(
        52.2799810753022,
        4.741703837648854,
        'Aphrodite Orchidee',
        blackIcon,
        'Aphrodite Orchidee',
        'Aphrodite Orchidee',
        'Softwarepakket: Match Online',
        'Kruisweg 283, 1437 CE Rozenburg',
        '',
        './images/aphrodite.png'
    )
    Aphrodite.marker.addTo(matchonline);

    // Maarel Orchids
    const maarel = createCustomMarker(
        51.945602147375546,
        4.225075521126043,
        'Maarel Orchids',
        blackIcon,
        'Maarel Orchids',
        'Maarel Orchids',
        'Softwarepakket: Match Online',
        'Lange Kruisweg 75-77, 2676 BP Maasdijk',
        '',
        './images/maarel.png'
    )
    maarel.marker.addTo(matchonline);

    // Plantion
    const plantion = createCustomMarker(
        52.0369485314476,
        5.611331683113205,
        'Plantion',
        blackIcon,
        'Plantion',
        'Bloemenveiling Plantion',
        'Softwarepakket: Match Online',
        'Wellensiekstraat 4, 6718 XZ Ede',
        '',
        './images/plantion.svg'
    )
    plantion.marker.addTo(matchonline);

    // Moerings
    const moerings = createCustomMarker(
        51.53452920150576,
        4.521190418316899,
        'Moerings',
        blackIcon,
        'Moerings',
        'Waterplantenkwekerij R. Moerings B.V.',
        'Softwarepakket: Match Online',
        'Hellemonsdreef 1, 4706 RD Roosendaal',
        '',
        './images/moerings.png'
    )
    moerings.marker.addTo(matchonline);

    // Rosedor
    const rosedor = createCustomMarker(
        52.25301856751811,
        4.792128908087183,
        'Rosedor',
        blackIcon,
        'Rosedor',
        'Rosedor',
        'Softwarepakket: Match Online',
        'Betula 71, 1424 LH De Kwakel',
        'Bij Coloríginz in het gebouw. Hun kantoor is op de eerste verdieping. ',
        './images/rosedor.png'
    )
    rosedor.marker.addTo(matchonline);

    // Logico B.V.
    const logico = createCustomMarker(
        51.97762334658656,
        4.282611328938591,
        'Logico',
        blackIcon,
        'Logico',
        'Logico B.V.',
        'Softwarepakket: Match Online',
        'Zijtwende 19, 2678 NL De Lier',
        '',
        './images/logico.png'
    )
    logico.marker.addTo(matchonline);

    // Solar Flowers
    const solarflowers = createCustomMarker(
        52.00011919647254,
        4.227536875565843,
        'Solar Flowers',
        blackIcon,
        'Solar Flowers',
        'Solar Flowers B.V.',
        'Softwarepakket: Match Online',
        'Middel Broekweg 29, 2675 KB Honselersdijk',
        'Tussen straat 5 en 6',
        './images/solarflowers.png'
    )
    solarflowers.marker.addTo(matchonline);

    // Termeulen Plants
    const termeulenplants = createCustomMarker(
        52.00040350624936,
        4.227244907358962,
        'Termeulen Plants',
        blackIcon,
        'Termeulen Plants',
        'Termeulen Plants',
        'Softwarepakket: Match Online',
        'Middel Broekweg 29, 2675 KE Honselersdijk',
        'Tussen straat 5 en 6',
        './images/termeulen.svg'
    )
    termeulenplants.marker.addTo(matchonline);

    // Terraflor
    const terraflor = createCustomMarker(
        52.00092494847304,
        4.226649718873437,
        'Terraflor',
        blackIcon,
        'Terraflor',
        'Terraflor B.V.',
        'Softwarepakket: Match Online',
        'Middel Broekweg 29-H1-05, 2675 KB Honselersdijk',
        '',
        './images/terraflor.png'
    )
    terraflor.marker.addTo(matchonline);

    // Blumengrosshandel Weisheit 
    const weisheit = createCustomMarker(
        50.79739618241782,
        10.31198799489533,
        'Weisheit',
        blackIcon,
        'Weisheit',
        'Weisheit Blumengroßhandel',
        'Softwarepakket: Match Online',
        'Im Vorwerk 15, 36456 Barchfeld, Duitsland',
        '',
        './images/weisheit.png'
    )
    weisheit.marker.addTo(matchonline);

    // EPS 
    const eps = createCustomMarker(
        51.57939131929991,
        6.269225910846989,
        'EPS',
        blackIcon,
        'EPS',
        'Kevelaer - EPS GmbH',
        'Softwarepakket: Match Online',
        'Industriestraße 2a, 47623 Kevelaer, Duitsland',
        '',
        './images/eps.svg'
    )
    eps.marker.addTo(matchonline);

    // Evergreen Blumen  
    const evergreen = createCustomMarker(
        53.50284984782916,
        7.488586212672353,
        'Evergreen',
        blackIcon,
        'Evergreen',
        'Evergreen Blumen GmbH',
        'Softwarepakket: Match Online',
        'Dieselstraße 4, 26607 Aurich, Duitsland',
        '',
        './images/evergreen.png'
    )
    evergreen.marker.addTo(matchonline);

    // Gimall plants
    const gimall = createCustomMarker(
        51.99634806620774,
        4.235347461885069,
        'Gimall',
        blackIcon,
        'Gimall',
        'Gimall-Plants NL B.V.',
        'Softwarepakket: Match Online',
        'Venus 333, 2675 LP Honselersdijk',
        '',
        './images/gimall.png'
    )
    gimall.marker.addTo(matchonline);

    // Landzicht Plant B.V.
    const landzicht = createCustomMarker(
        52.19102227743351,
        4.455306272159617,
        'Landzicht Plant',
        blackIcon,
        'Landzicht Plant',
        'Landzicht Plant B.V.',
        'Softwarepakket: Match Online',
        'Laan van Verhof, 2231 BZ Rijnsburg',
        '',
        './images/landzicht.jpeg'
    )
    landzicht.marker.addTo(matchonline);

    // Streng Growers
    const strenggrowers = createCustomMarker(
        52.09256354382996,
        4.670898938111485,
        'Streng Growers',
        blackIcon,
        'Streng Growers',
        'Streng Growers B.V.',
        'Softwarepakket: Match Online',
        'Halve Raak 34, 2771 AD Boskoop',
        '',
        './images/strenggrowers.png'
    )
    strenggrowers.marker.addTo(matchonline);

    // Vikoplant
    const vikoplant = createCustomMarker(
        51.99505291381354,
        4.235300242863655,
        'Viko Plant',
        blackIcon,
        'Viko Plant',
        'Viko Plant B.V.',
        'Softwarepakket: Match Online',
        'Jupiter 190, 2675 LV Honselersdijk',
        '',
        './images/vikoplant.png'
    )
    vikoplant.marker.addTo(matchonline);


    // liften
    // Nieuwe lift toevoegen:
    // 1. dupliceer de voorbeeldcode van de lift
    // 2. Bepaal de coördinaten door op de browser te inspecteren en op de kaart te klikken. Er verschijnen dan coordinaten in de console.
    // 3. vervang de coordinaten van de code
    // 4. Vervang de titel
    // 5. vervang de code van de popup
    // 6. vervang de kleur van de lift

    // Voorbeeld lift
    const voorbeeldLift = L.marker([66.99884379185184, -180.87890625000003], { // verander "voorbeeld" en de coordinaten
        title: 'Voorbeeld lift', //verander de titel
        opacity: 1,
        riseOnHover: true,
        icon: geleLiftIcon  // verander de kleur van de lift. Kleuren: geleLiftIcon, rodeLiftIcon, 
    }).addTo(mymap);

    const voorbeeldLiftpopup = voorbeeldLift.bindPopup('popup tekst'); // verander "voorbeeld 2x"
    // einde code voorbeeldlift

    // Gele lift
    const geleLift = L.marker([52.26051425172391, 4.785135984420777], {
        title: 'Gele lift',
        opacity: 1,
        riseOnHover: true,
        icon: geleLiftIcon,
        zIndexOffset: 1000
    }).addTo(mymap);
    const geleLiftpopup = geleLift.bindPopup('Ingang gele lift');

    // grijze lift
    const grijzeLift = L.marker([52.26302270677355, 4.783998727798462], {
        title: 'Grijze lift',
        opacity: 1,
        riseOnHover: true,
        icon: grijzeLiftIcon,
        zIndexOffset: 1000
    }).addTo(mymap);
    const grijzeLiftpopup = grijzeLift.bindPopup('Ingang grijze lift');

    // rode lift
    const rodeLift = L.marker([52.263186867732806, 4.780855178833009], {
        title: 'Rode lift',
        opacity: 1,
        riseOnHover: true,
        icon: rodeLiftIcon,
        zIndexOffset: 1000
    }).addTo(mymap);
    const rodeLiftpopup = rodeLift.bindPopup('Ingang rode lift');

    // witte lift
    const witteLift = L.marker([52.2595850366779, 4.786707758903504], {
        title: 'Witte lift',
        opacity: 1,
        riseOnHover: true,
        icon: witteLiftIcon,
        zIndexOffset: 1000
    }).addTo(mymap);
    const witteLiftpopup = witteLift.bindPopup('Ingang witte lift');

    // groene lift
    const groeneLift = L.marker([52.26142703058594, 4.783719778060914], {
        title: 'Groene lift',
        opacity: 1,
        riseOnHover: true,
        icon: groeneLiftIcon,
        zIndexOffset: 1000
    }).addTo(mymap);
    const groeneLiftpopup = groeneLift.bindPopup('Ingang groene lift');

    // blauwe lift
    const blauweLift = L.marker([52.26235292376141, 4.7822821140289316], {
        title: 'Blauwe lift',
        opacity: 1,
        riseOnHover: true,
        icon: blauweLiftIcon,
        zIndexOffset: 1000
    }).addTo(mymap);
    const blauweLiftpopup = blauweLift.bindPopup('Ingang blauwe lift');

    // bruine lift
    const bruineLift = L.marker([52.264214501527704, 4.784535169601441], {
        title: 'Bruine lift',
        opacity: 1,
        riseOnHover: true,
        icon: bruineLiftIcon,
        zIndexOffset: 1000
    }).addTo(mymap);
    const bruineLiftpopup = bruineLift.bindPopup('Ingang bruine lift');

    // resto lift
    const restoLift = L.marker([52.26049126784101, 4.788172245025636], {
        title: 'Resto lift',
        opacity: 1,
        riseOnHover: true,
        icon: restoLiftIcon,
        zIndexOffset: 1000
    }).addTo(mymap);
    const restoLiftpopup = restoLift.bindPopup('Ingang resto lift');

    // violet park
    const violetpark = L.marker([52.257197882624375, 4.782453775405885], {
        title: 'Parkeerdek 5',
        opacity: 1,
        riseOnHover: true,
        icon: violetParkIcon,
        zIndexOffset: 1000
    }).addTo(mymap);
    violetpark.bindTooltip('<h2> Parkeerdek 5 </h2>', { direction: 'bottom', permanent: true, opacity: 1, offset: [-5, -12] });

    // blauw park
    const blauwpark = L.marker([52.25988054887457, 4.789352416992188], {
        title: 'Parkeerdek 1',
        opacity: 1,
        riseOnHover: true,
        icon: blauwParkIcon,
        zIndexOffset: 1000
    }).addTo(mymap);
    blauwpark.bindTooltip('<h2> Parkeerdek 1 </h2>', { direction: 'bottom', permanent: true, opacity: 1, offset: [-5, -12] });


    //search bar
    var searchBar = L.control.pinSearch({
        position: 'topright',
        placeholder: 'Search...',
        buttonText: 'Search',
        onSearch: function (query) {
            console.log('Search query:', query);
        },
        searchBarWidth: '200px',
        searchBarHeight: '30px',
        maxSearchResults: 3,
    }).addTo(mymap);


    const layerControl = L.control.layers(basemaps, overlayMaps, { position: 'bottomleft' }).addTo(mymap);



    // searchBar.getContainer().style.right = '230px';

    // reset vieuw
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

        attribution: "&copy; <a href='https://openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
    }).addTo(mymap);

    L.control.resetView({
        position: "topleft",
        title: "Reset view",
        latlng: L.latLng([52.261223462827274, 4.782378673553468]),
        zoom: 16,
    }).addTo(mymap);

}