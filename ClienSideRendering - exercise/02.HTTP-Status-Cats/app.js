import { html, render } from './node_modules/lit-html/lit-html.js'
import { cats as catData} from './catSeeder.js'

//template:
//contains cat info
//has toggle button


const catCard = cat => html `<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
    <button class="showBtn">Show status code</button>
    <div class="status" style="display: none" id="${cat.id}">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
    </div>
</div>
</li>
`;
//start:
// parse imported data
//pass to template
root.addEventListener('click', (ev) => {
    if (ev.target.tagName == 'BUTTON') {
        const element = ev.target.parentNode.querySelector('.status');
        if (element.style.display == 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
        
    }
});

const root = document.getElementById('allCats');
const cat = catCard(catData[0]);
render(html `<ul>${catData.map(catCard)}</ul>`, root);