let cardInfo = document.getElementById('info');
let countyEl = document.querySelectorAll('#features g[data-county-name]');
console.log(countyEl);

let allCountyData = [];

let imageArea = document.getElementById('image-area');
let regionImage = document.getElementById('region-image');
let imageCaption = document.getElementById('image-caption');

for (let countyData of countyEl) {
    let name = countyData.getAttribute('data-county-name');
    let pop = countyData.getAttribute('data-population');
    let feature = countyData.getAttribute('data-feature');
    allCountyData.push({ name, pop, feature });

    let county = countyData.querySelector(".county");
    let hitCounty = countyData.querySelector(".county-hit");
    console.log(county);

    function clearSelect() {
        for (let r of document.querySelectorAll(".county, .county-hit")) {
            r.classList.remove("selected");
        }
    }

    function selected() {
        let img = countyData.getAttribute('data-img');
        let captionText = countyData.getAttribute('data-caption');

        clearSelect();

        county.classList.add("selected");
        if (hitCounty) {
            hitCounty.classList.add("selected");
        }

        cardInfo.style.opacity = '1';
        cardInfo.classList.add("selected");
        cardInfo.innerHTML = `
            <h2>${name}</h2>
            <p>人口: ${pop}</p>
            <p>特點: ${feature}</p>
        `;

        imageArea.classList.add("visible");
        regionImage.src = img;
        imageCaption.textContent = captionText;

    }

    if (county) {
        county.addEventListener("click", selected);
    }
    if (hitCounty) {
        hitCounty.addEventListener("click", selected);
    }
}
console.log(allCountyData);


let regionSelect = document.getElementById('regionSelect');
regionSelect.addEventListener('change', function (e) {
    let val = e.target.value;


    if (!val) {
        clearSelect()
        cardInfo.style.opacity = '0';
        cardInfo.classList.remove("selected");
        imageArea.classList.remove("visible");
        return;
    }

    let target = document.querySelector(`g[data-county-name="${val}"]`);
    console.log(target);
    if (target) {
        let county = target.querySelector('.county');
        county.dispatchEvent(new Event('click'));
    }
});
