function showInfo(text, id) {
    document.getElementById('info').innerText = text;

    // 移除所有縣市的選取狀態
    document.querySelectorAll('.county').forEach(el => {
        el.classList.remove('selected');
    });

    // 對被點選的縣市加上選取樣式
    document.getElementById(id).classList.add('selected');
}
