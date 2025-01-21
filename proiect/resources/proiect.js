document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('quizBackgroundColor', "rgb(96, 63, 38");
    const questions = document.querySelectorAll('.question');
    const nextButton = document.getElementById('next-button');
    const resultDiv = document.getElementById('result');
    let currentQuestion = 0;
    const answers = {};
    const defaultColor = '#603F26'; 
    
    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.style.display = i === index ? 'block' : 'none';
        });
        nextButton.style.display = index < questions.length ? 'block' : 'none';
        resultDiv.style.display = index === questions.length ? 'block' : 'none';
    }
  
    document.querySelectorAll('.answers li').forEach(li => {
        li.addEventListener('click', function () {
            const questionId = this.closest('.question').id;
            const value = this.getAttribute('data-value');
  
            const siblings = this.parentNode.querySelectorAll('li');
            siblings.forEach(sibling => sibling.classList.remove('selected'));
            this.classList.add('selected');
  
            answers[questionId] = value;
        });
    });
  
    nextButton.addEventListener('click', () => {
      if (currentQuestion + 1 === questions.length) {
          calculateResult();
      }
  
      if (!answers[`question-${currentQuestion+1}`]) {
          alert('Te rog selectează un răspuns!');
          return;
      }
  
      currentQuestion++;
      showQuestion(currentQuestion);
    });
  
    function calculateResult() {
        const counts = { A: 0, B: 0, C: 0, D: 0 };
        Object.values(answers).forEach(answer => counts[answer]++);
        
        let dominant = 'A';
        for (const key in counts) {
            if (counts[key] > counts[dominant]) {
                dominant = key;
            }
        }
  
        const colors = {
            A: '#532200', // Maro închis
            B: '#984C20', // Maro normal
            C: '#ac7847', // Maro deschis
            D: '#DDB187'  // Crem
        };
  
        const chosenColor = colors[dominant];
  
        document.documentElement.style.setProperty('--quiz-background-color', chosenColor);
        localStorage.setItem('quizBackgroundColor', chosenColor);
        
        resultDiv.innerHTML = getResultText(dominant);
    }
    function getResultText(dominant) {
        switch (dominant) {
            case 'A':
                return `<p>Ai răspuns preponderent cu varianta <strong>${dominant}</strong>, adică alegerea ta in materie de cafea este: </p><br>
                        <p class="coffee-title"><strong>ESPRESSO</strong></p><br>
                        <p>Espresso, cea mai pură formă de cafea, îi atrage adesea pe cei îndrăzneți și aserți. Iubitorii acestei băuturi concentrate nu se feresc de obicei de arome sau experiențe puternice. Ei apreciază autenticitatea și pot avea o abordare simplă a vieții și vizitează adesea cafeneaua locală.</p>
                        <p><ul>
                        <li>Pasionații de espresso preferă adesea eficiența și directitatea.</li>
                        <li>Se pot bucura de aspectul ritualic de a sorbit încet dintr-o ceașcă mică.</li>
                        <li>Acești indivizi caută adesea o explozie puternică de energie din cafeaua lor.</li>
                        </ul></p>`;
            case 'B':
                return `<p>Ai răspuns preponderent cu varianta <strong>${dominant}</strong>, adică alegerea ta in materie de cafea este: </p><br>
                        <p class="coffee-title"><strong>CAPPUCCINO</strong></p><br>
                        <p>Dacă bei Cappuccino, atunci ești un tip de persoană aventuroasă, deschisă la minte, sofisticată, sinceră, motivată, super-creativă. Studiile au arătat că iubitorii de cappuccino sunt perfecționiști care sunt uneori extrem de obsesivi și sensibili la lucruri. Se poate descoperi că se complac în lucruri mai fine pentru o bucurie pură și devin dominatori sau ascultă pe toți, dar în cele din urmă fac ceea ce le place.</p>
                        <p><ul>
                        <li>Iubitorilor de cappuccino nu le place monotonia și le place să exploreze lucruri noi, fie că este vorba de a încerca locuri noi sau de a învăța noi abilități.</li>
                        <li>Nu le este frică de necunoscut și sunt deschiși să se aventureze pe cont propriu pentru a descoperi experiențe noi.</li>
                        <li>Au un mare simț al umorului și pot lumina situațiile sociale cu inteligența și remarcile lor oportune.</li>
                        </ul></p>`;
            case 'C':
                return `<p>Ai răspuns preponderent cu varianta <strong>${dominant}</strong>, adică alegerea ta in materie de cafea este: </p><br>
                        <p class="coffee-title"><strong>LATTE</strong></p><br>
                        <p>Consumatorii de latte se bucură de amestecul cremos de lapte și cafea. Această alegere ar putea sugera o personalitate care apreciază echilibrul și armonia. Personalizarea unui latte cu arome sau alegerea unor alternative non-lactate poate indica, de asemenea, o natură creativă și deschisă la minte.</p>
                        <p><ul>
                        <li>Mulți băutori de latte sunt cunoscuți pentru dragostea lor pentru estetică, adesea surprinsă în aprecierea lor pentru latte art.</li>
                        <li>Au tendința de a se bucura de o experiență de cafea mai blândă.</li>
                        <li>Experimentarea cu noi arome este o trăsătură comună printre iubitorii de latte.</li>
                        </ul></p>`;
            case 'D':
                return `<p>Ai răspuns preponderent cu varianta <strong>${dominant}</strong>, adică alegerea ta in materie de cafea este:</p><br>
                        <p class="coffee-title"><strong>FRAPPE</strong></p><br>
                        <p>Persoanele care beau frappe sunt adesea descrise ca fiind energice, dinamice și orientate către plăcerile vieții. Iată câteva trăsături ale acestora:</p>
                        <p><ul>
                        <li>Sociabile și deschise – Îi place să petreacă timp cu prietenii și să se bucure de momentele de relaxare în compania celor dragi. Frappe-ul este adesea o băutură consumată în cafenele sau în locuri sociale.</li>
                        <li>Aprecieri pentru răsfățul simplu – Frappe-ul, fiind o băutură răcoritoare și ușor de savurat, indică faptul că acești oameni se bucură de micile plăceri ale vieții și preferă momentele de relaxare.</li>
                        <li>Adoră noul și diversitatea – Deși frappe-ul este o băutură destul de simplă, mulți dintre cei care o preferă sunt deschiși la a încerca noi combinații de arome sau variante ale acestei băuturi, indicând o natură curioasă și dorința de a explora.</li>
                        </ul></p>`;
        }
    }
  
    showQuestion(currentQuestion);
  
    const storedColor = localStorage.getItem('quizBackgroundColor');
    if (storedColor) {
        document.documentElement.style.setProperty('--quiz-background-color', storedColor);
    }
  });
  
  