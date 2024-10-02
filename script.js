let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let audionEnd = new Audio('audio/stupid.mp3');

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];

let currentPlayer = 'circle'; // der aktuelle Spieler

function restartGame() {
    fields.fill(null); // Feld zurücksetzen
    currentPlayer = 'circle'; // Zurücksetzen des aktuellen Spielers
    render(); // Neurendern der Tabelle
}



function render() {
    const contentDiv = document.getElementById('content');
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}

function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null; // Deaktivieren des Click-Handlings für diese Zelle
        if (checkWin()) {
            disableClicks(); // Deaktivieren aller Zellen nach dem Gewinn
            audionEnd.play();
        } else {
            // Wechseln des Spielers
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        }
    }
}

function checkWin() {
    for (const pattern of WINNING_COMBINATIONS) {
        const [a, b, c] = pattern;
        if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
            return true; // Gewinn festgestellt
        }
    }
    return false; // Kein Gewinn
}

function disableClicks() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.onclick = null; // Deaktivieren des Click-Handlings für jede Zelle
    });
}

function generateCircleSVG() {
    const color = '#00B0EF';
    const width = 70;
    const height = 70;
    return `<svg class="circle" width="${width}" height="${height}"><circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none"/></svg>`;
}

function generateCrossSVG() {
    const color = '#FFC000';
    const width = 70;
    const height = 70;
    return `
        <svg class="cross" width="${width}" height="${height}">
            <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="5"/>
            <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="${color}" stroke-width="5"/>
        </svg>
    `;
}
// CSS-Styles
const style = document.createElement('style');
style.innerHTML = `
    table {
        border-collapse: collapse;
        position: relative; /* Tabelle für die Positionierung */
    }
    td {
        width: 70px; /* Breite der Zelle */
        height: 70px; /* Höhe der Zelle */
        position: relative; /* Für die Zentrierung */
        cursor: pointer; /* Cursor beim Hover */
    }
    .circle {
        width: 70px; /* Endbreite des Kreises */
        height: 70px; /* Endhöhe des Kreises */
        background-color: transparent; /* Hintergrund transparent für leeren Kreis */
        border: 5px solid #00B0EF; /* Randfarbe */
        border-radius: 50%; /* Runde Form */
        animation: pulseCircle 2400ms forwards; /* Pulsierende Animation, einmal durchlaufen */
        position: absolute; /* Für die Zentrierung */
        top: 50%; /* Vertikal zentrieren */
        left: 50%; /* Horizontal zentrieren */
        transform: translate(-50%, -50%); /* Verschiebung zur exakten Mitte */
    }

    @keyframes pulseCircle {
        0% {
            width: 5px;  /* Startgröße */
            height: 5px; /* Startgröße */
            border-color: #00B0EF; /* Startfarbe */
        }
        100% {
            width: 70px; /* Endgröße */
            height: 70px; /* Endgröße */
            border-color: #00B0EF; /* Endfarbe */
        }
    }

    .cross {
    position: absolute;
    top: 58%;
    left: 30%;
    width: 70px;
    height: 70px;
    animation: pulseCross 2400ms forwards;
    transform: translate(-50%, -50%) rotate(45deg);
    rotate: 45deg;
    }

    .cross:before, .cross:after {
        content: "";
        position: absolute; /* Positionierung für die Zentrierung */
        background-color: #FFC000; /* Farbton für das X */
        width: 5px; /* Dicke der Kreuzlinien */
        height: 70px; /* Höhe der vertikalen Linie */
        top: 0; /* Zentriert im Bezug auf den oberen Teil */
        left: 50%; /* Horizontal zentrieren */
        transform: translateX(-50%); /* Horizontale Zentrierung */
    }

    .cross:after {
        transform: translate(-50%, 0) rotate(90deg); /* Zweite Linie für das X */
    }

    @keyframes pulseCross {
        0% {
            transform: translate(-50%, -50%) scale(1) rotate(45deg); /* Startzustand */
        }
        100% {
            transform: translate(-50%, -50%) scale(1.1) rotate(45deg); /* Schlusszustand */
        }
    }

    @media (max-width: 510px) {
        .cross{
            top: 64%;
            left: 21%;
        }
    }
`;
document.head.appendChild(style);
