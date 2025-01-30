let player = {
    los: 0,
    obstawiono: -1,
    dolary: 100
};

function orzelKlik() {
    player.obstawiono = 0;
}

function reszkaKlik() {
    player.obstawiono = 1;
}
    
function klik() {
    let inputPieniedzy = document.getElementById('moneyInput');
    let obstawionaKwota = parseFloat(inputPieniedzy.value);

    if (isNaN(obstawionaKwota) || obstawionaKwota <= 0) {
        alert('Podaj poprawną kwotę zakładu!');
        return;
    }
    if (player.dolary < obstawionaKwota) {
        alert('Nie masz wystarczającej ilości pieniędzy!');
        return;
    }
    if (player.obstawiono === -1) {
        alert('Najpierw wybierz Orła lub Reszkę!');
        return;
    }

    player.dolary -= obstawionaKwota;
    player.los = Math.floor(Math.random() * 2);

    if (player.los === player.obstawiono) {
        let wygranaKwota = obstawionaKwota * 2.2;
        player.dolary += wygranaKwota;
        alert('Gratulacje! Wygrałeś ' + wygranaKwota.toFixed(2) + ' $!');
    } else {
        alert('Niestety tym razem nie wygrałeś. Spróbuj ponownie!');
    }

    document.getElementById('cashP').innerText = player.dolary;
}

function zapisz() {
    localStorage.setItem('gracz', JSON.stringify(player));
    alert('Gra zapisana!');
}

function wczytaj() {
    let savedData = localStorage.getItem('gracz');
    if (savedData) {
        player = JSON.parse(savedData);
        document.getElementById('cashP').innerText = player.dolary;
            alert('Gra wczytana!');
    } else {
        alert('Brak zapisanej gry!');
    }
}