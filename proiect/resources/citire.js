window.onload = function() { 
    const canvas = document.getElementById('coffee-cup-container');
    draw();

    const cup = document.getElementById("coffee-cup-container");
    cup.addEventListener("click", answer);

    const url = 'resources/cup.json';    
    var promiseFetch = fetch(url);
    let possanswers;

    promiseFetch.then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
    })
    .then(function(text) {    
        possanswers = JSON.parse(text); 
    })
    .catch(function(err){
        alert(err);
    });

    function draw() {
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
    
            ctx.beginPath();
            ctx.arc(100, 100, 60, 0, 2 * Math.PI); 
            ctx.fillStyle = "#d3d3d3"; 
            ctx.fill();
    
            ctx.beginPath();
            ctx.ellipse(100, 80, 50, 30, 0, 0, 2 * Math.PI); 
            ctx.fillStyle = "#654321"; 
            ctx.fill();
    
            ctx.beginPath();
            ctx.arc(140, 100, 30, -Math.PI / 3, Math.PI / 3); 0
            ctx.strokeStyle = "#d3d3d3"; 
            ctx.lineWidth = 6;
            ctx.stroke();
    
            ctx.beginPath();
            ctx.moveTo(80, 60); 
            ctx.bezierCurveTo(75, 50, 85, 40, 80, 30);
            ctx.strokeStyle = "#c69c6d"; 
            ctx.lineWidth = 2;
            ctx.stroke();
    
            ctx.beginPath();
            ctx.moveTo(100, 60); 
            ctx.bezierCurveTo(95, 50, 105, 40, 100, 30);
            ctx.stroke();
    
            ctx.beginPath();
            ctx.moveTo(120, 60); 
            ctx.bezierCurveTo(115, 50, 125, 40, 120, 30);
            ctx.stroke();

            ctx.font = "16px Arial";
            ctx.fillStyle = "#000"; 
            ctx.textAlign = "right";
            ctx.fillText("Click și vei afla ce vrea să îți spună ceașca de cafea!", 600, 80); 
          }
        
    }

    function answer() {
        let max = possanswers.length;
        let ans = Math.floor(Math.random() * max);

        let infodiv = document.getElementById("papyrus-text");
        infodiv.innerHTML = possanswers[ans].text;
        infodiv.style.fontFamily = "Georgia";    
        infodiv.style.fontSize = "2vw";   
        infodiv.style.backgroundImage = "url('resources/papirus.avif')";
        infodiv.style.backgroundSize = "cover"; 
        infodiv.style.backgroundPosition = "center"; 
        infodiv.style.padding = "20px";
        infodiv.style.border = "2px solid #b08556";
        infodiv.style.borderRadius = "10px";
        infodiv.style.boxShadow = "4px 4px 6px rgba(0, 0, 0, 0.1)";
    }
}
