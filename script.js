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

function init() {
    render();
}

function render() {
    const content = document.getElementById('content');
    let html = '<table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = (i * 3) + j;
            const symbol = fields[index] === null ? '' : (fields[index] === 'circle' ? generateCircle() : generateCross());
            html += `<td onclick="makeMove(${index}, this)">${symbol}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    content.innerHTML = html;
}

function makeMove(index, tdElement) {
    if (fields[index] === null) {
        fields[index] = fields.filter(x => x !== null).length % 2 === 0 ? 'circle' : 'cross';
        tdElement.innerHTML = fields[index] === 'circle' ? generateCircle() : generateCross();
        tdElement.onclick = null; // Entfernen der onclick-Funktion
    }
}

// Funktion zum Erstellen eines leeren Kreises
function generateCircle() {
    return `
        <div class="circle"></div>
    `;
}

// Beispiel-Implementierung für ein Kreuz (optional)
function generateCross() {
    return `
        <div class="cross"></div>
    `;
}

// CSS-Styles
const style = document.createElement('style');
style.innerHTML = `
    table {
        border-collapse: collapse;
    }
    td {
        width: 70px; /* Breite der Zelle */
        height: 70px; /* Höhe der Zelle */
        position: relative; /* Für die Zentrierung */
        cursor: pointer; /* Cursor beim Hover */
    }
    .circle {
        width: 70px;
        height: 70px;
        background-color: transparent; /* Hintergrund transparent für leeren Kreis */
        border: 5px solid #00B0EF; /* Randfarbe */
        border-radius: 50%; /* Runde Form */
        animation: pulse 2400ms; /* Pulsierende Animation */
        position: absolute; /* Für die Zentrierung */
        top: 50%; /* Vertikal zentrieren */
        left: 50%; /* Horizontal zentrieren */
        transform: translate(-50%, -50%); /* Verschiebung zur exakten Mitte */
    }

    .cross {
        position: absolute; /* Positionierung für die Zentrierung */
        top: 50%; /* Vertikal zentrieren */
        left: 50%; /* Horizontal zentrieren */
        width: 70px; /* Gesamtbreite des X */
        height: 70px; /* Gesamthöhe des X */
        animation: pulseCross 2400ms forwards; /* Pulsierende Animation, einmal durchlaufen */
        transform: translate(-50%, -50%) rotate(45deg); /* Verschiebung zur exakten Mitte und Drehung um 45 Grad */
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
`;
document.head.appendChild(style);