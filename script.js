let cardInfo = document.getElementById('info');
let countyEl = document.querySelectorAll('#features g[data-county-name]');
console.log(countyEl);

let allCountyData = [];

let imageArea = document.getElementById('image-area');
let regionImage = document.getElementById('region-image');
let imageCaption = document.getElementById('image-caption');

function clearSelect() {
    for (let r of document.querySelectorAll(".county, .county-hit")) {
        r.classList.remove("selected");
    }
}

function resetMapState() {
    clearSelect();
    cardInfo.style.opacity = '0';
    cardInfo.classList.remove("selected");
    imageArea.classList.remove("visible");
    regionSelect.value = "";
}

function activate(countyData) {
    let name = countyData.getAttribute('data-county-name');
    let feature = countyData.getAttribute('data-feature');
    let img = countyData.getAttribute('data-img');
    let captionText = countyData.getAttribute('data-caption');

    let county = countyData.querySelector(".county");
    let hitCounty = countyData.querySelector(".county-hit");

    clearSelect();

    if (county) county.classList.add("selected");
    if (hitCounty) hitCounty.classList.add("selected");

    let spotsHTML = "";
    for (let i = 1; i <= 3; i++) {
        let spotname = countyData.getAttribute(`data-spot${i}-name`);
        let spotimg = countyData.getAttribute(`data-spot${i}-img`);
        if (spotname) {
            spotsHTML +=
                `<button class="spot-btn" data-img="${spotimg}">${spotname}</button>`;
        }
    }

    cardInfo.style.opacity = '1';
    cardInfo.classList.add("selected");
    cardInfo.innerHTML = `
        <h2>${name}</h2>
        <p>特點: ${feature}</p>
        ${spotsHTML}
    `;

    imageArea.classList.add("visible");
    regionImage.src = img;
    imageCaption.textContent = captionText;

    let spots = document.querySelectorAll(".spot-btn");
    for (let spot of spots) {

        function spotClicked() {
            let img = this.getAttribute('data-img');
            let captionText = this.textContent;
            regionImage.src = img;
            imageCaption.textContent = captionText;

            // ✅ 清除舊的 active
            for (var s of spots) {
                s.classList.remove("active");
            }

            // ✅ 設定目前按下的按鈕為 active
            this.classList.add("active");
        }

        spot.addEventListener("click", spotClicked);
    }

}


for (let countyData of countyEl) {
    let name = countyData.getAttribute('data-county-name');
    let feature = countyData.getAttribute('data-feature');
    allCountyData.push({ name, feature });

    let county = countyData.querySelector(".county");
    let hitCounty = countyData.querySelector(".county-hit");
    console.log(county);

    function clicked() {
        activate(countyData);
        regionSelect.value = name;
    }

    if (county) {
        county.addEventListener("click", clicked);
    }
    if (hitCounty) {
        hitCounty.addEventListener("click", clicked);
    }
}
console.log(allCountyData);

let regionSelect = document.getElementById('regionSelect');
function changeSelect(e) {
    let val = e.target.value;
    console.log(val);

    if (!val) {
        resetMapState();
        return;
    }

    let target = document.querySelector(`g[data-county-name="${val}"]`);
    console.log(target);
    if (target) {
        activate(target);
    }
}
regionSelect.addEventListener('change', changeSelect);

document.querySelector('svg').addEventListener('click', function (e) {
    if (!e.target.closest('g[data-county-name]')) {
        resetMapState();
    }
});