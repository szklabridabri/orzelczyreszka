    let player = {
        los: 0,
        obstawiono: -1,
        dolary: 100,
        szczescie: 1,
        upgCost: 1000
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
        
        let szansa = Math.random();
        if (szansa < player.szczescie / 10) {  // Zwiększono wpływ szczęścia na wynik
            player.los = player.obstawiono; 
        } else {
            player.los = Math.floor(Math.random() * 2);
        }

        if (player.los === player.obstawiono) {
            let wygranaKwota = obstawionaKwota * 2.2;
            player.dolary += wygranaKwota;
            alert('Gratulacje! Wygrałeś ' + wygranaKwota.toFixed(2) + ' $!');
        } else {
            alert('Niestety tym razem nie wygrałeś. Spróbuj ponownie!');
        }

        document.getElementById('cashP').innerText = player.dolary.toFixed(2);
        zapisz();
    }

    function kupUlepszenie() {
        if (player.dolary >= player.upgCost) {
            player.dolary -= player.upgCost;
            player.upgCost *= 2;
            player.szczescie += 1;
            document.getElementById('cashP').innerText = player.dolary.toFixed(2);
            document.getElementById('luckP').innerText = player.szczescie;
            document.getElementById('upgButton').innerText = `Kup ulepszenie szczęścia (${player.upgCost}$)`;
            alert('Kupiono ulepszenie! Szczęście zwiększone!');
        } else {
            alert('Nie masz wystarczająco pieniędzy na ulepszenie!');
        }
    }

    function resetGame() {
        player.dolary = 100;
        player.szczescie = 1;
        player.upgCost = 1000;
        document.getElementById('cashP').innerText = player.dolary.toFixed(2);
        document.getElementById('luckP').innerText = player.szczescie;
        document.getElementById('upgButton').innerText = `Kup ulepszenie szczęścia (${player.upgCost}$)`;
        zapisz();
    }

    function zapisz() {
        localStorage.setItem('gracz', JSON.stringify(player));
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.push(player.dolary);
        leaderboard.sort((a, b) => b - a);
        leaderboard = leaderboard.slice(0, 10);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }

    function wczytaj() {
        let savedData = localStorage.getItem('gracz');
        if (savedData) {
            player = JSON.parse(savedData);
            document.getElementById('cashP').innerText = player.dolary.toFixed(2);
            document.getElementById('luckP').innerText = player.szczescie;
            document.getElementById('upgButton').innerText = `Kup ulepszenie szczęścia (${player.upgCost}$)`;
        } else {
            alert('Brak zapisanej gry!');
        }
    }

    wczytaj();
