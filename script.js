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
]

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
            const symbol = fields[index] === null ? '' : (fields[index] === 'circle' ? createAnimatedCircle() : createAnimatedCross());
            html += `<td onclick="makeMove(${index})">${symbol}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    content.innerHTML = html;
}

function makeMove(index) {
    if (fields[index] === null) {
        fields[index] = fields.filter(x => x !== null).length % 2 === 0 ? 'circle' : 'cross';
        render();
    }
}

// Circle Animation

function createAnimatedCircle() {
    const svgNS = "http://www.w3.org/2000/svg"; 
    const width = 70;
    const height = 70;
    const radius = 30; 
    const circumference = 2 * Math.PI * radius; 

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    
    const outerCircle = document.createElementNS(svgNS, "circle");
    outerCircle.setAttribute("cx", width / 2);
    outerCircle.setAttribute("cy", height / 2);
    outerCircle.setAttribute("r", radius);
    outerCircle.setAttribute("fill", "none");  
    outerCircle.setAttribute("stroke", "#00B0EF");
    outerCircle.setAttribute("stroke-width", "5"); 

    const fillCircle = document.createElementNS(svgNS, "circle");
    fillCircle.setAttribute("cx", width / 2);
    fillCircle.setAttribute("cy", height / 2);
    fillCircle.setAttribute("r", radius);
    fillCircle.setAttribute("fill", "#00B0EF");
    fillCircle.setAttribute("stroke", "none");
    
    fillCircle.setAttribute("style", "visibility: hidden; animation: fillAnimation 1250ms forwards;");

    const style = document.createElement("style");
    style.textContent = `
        @keyframes fillAnimation {
            0% {
                r: ${radius}; /* Starten bei voller Radius */
                visibility: visible; /* Sichtbar */
            }
            100% {
                r: 0; /* Ende bei Radius 0 (Kreis wird gefüllt) */
            }
        }
    `;

    svg.appendChild(outerCircle);
    svg.appendChild(fillCircle);
    document.head.appendChild(style); 

    return svg.outerHTML;
}

const animatedFilledCircleSVG = createAnimatedCircle();
document.getElementById('content').innerHTML = animatedFilledCircleSVG;

// Cross Animation

function createAnimatedCross() {
    const svgNS = "http://www.w3.org/2000/svg"; 
    const width = 70;
    const height = 70;

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    const rect1 = document.createElementNS(svgNS, "rect");
    rect1.setAttribute("x", 30); 
    rect1.setAttribute("y", 0);
    rect1.setAttribute("width", 10); 
    rect1.setAttribute("height", height); 
    rect1.setAttribute("fill", "rgb(253, 207, 66)"); 
    rect1.setAttribute("transform", "rotate(45 35 35)"); 
    rect1.setAttribute("style", "animation: fillAnimation 1250ms forwards; animation-delay: 0s;"); 

    const rect2 = document.createElementNS(svgNS, "rect");
    rect2.setAttribute("x", 0);  
    rect2.setAttribute("y", 30); 
    rect2.setAttribute("width", width); 
    rect2.setAttribute("height", 10); 
    rect2.setAttribute("fill", "rgb(253, 207, 66)"); 
    rect2.setAttribute("transform", "rotate(-130 35 35)"); 
    rect2.setAttribute("style", "animation: fillAnimation 1250ms forwards; animation-delay: 0s;"); 

    const style = document.createElement("style");
    style.textContent = `
        @keyframes fillAnimation {
            0% {
                opacity: 0; /* Unsichtbar zu Beginn der Animation */
            }
            100% {
                opacity: 1; /* Voll sichtbar am Ende der Animation */
            }
        }
    `;

    svg.appendChild(rect1);
    svg.appendChild(rect2);
    document.head.appendChild(style); 

    return svg.outerHTML;
}

const animatedCrossSVG = createAnimatedCross();
document.getElementById('content').innerHTML = animatedCrossSVG;