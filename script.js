// function showInfo(text, id) {
//     document.getElementById('info').innerText = text;

//     // 移除所有縣市的選取狀態
//     document.querySelectorAll('.county').forEach(el => {
//         el.classList.remove('selected');
//     });

//     // 對被點選的縣市加上選取樣式
//     document.getElementById(id).classList.add('selected');
// }

let cardInfo = document.getElementById('info');
let countyEl = document.querySelectorAll('#features g[data-county-name]');
console.log(countyEl);

let allCountyData = [];

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

    function select() {
        clearSelect();

        county.classList.add("selected");
        if (hitCounty) {
            hitCounty.classList.add("selected");
        }

        cardInfo.style.opacity = '1'; // Ensure visibility
        cardInfo.classList.add("selected");
        cardInfo.innerHTML = `
            <h2>${name}</h2>
            <p>人口: ${pop}</p>
            <p>特點: ${feature}</p>
        `;
    }

    if (county) {
        county.addEventListener("click", select);
    }
    if (hitCounty) {
        hitCounty.addEventListener("click", select);
    }
}
console.log(allCountyData);

