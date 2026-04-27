let navDictionary = {};
navDictionary['Facilities']=`<ul class="nav-container">
                <li><a href="map.html">Building Map</a></li>
                <li><a href="reservations.html">Room Reservations</a></li>
                </ul>`;
navDictionary['Campus Services']=`<ul class="nav-container">
                <li><a href="dining.html">Dining Options</a></li>
                </ul>`;
navDictionary['Events']=`<ul class="nav-container">
                <li><a href="clubs.html">Clubs and Organizations</a></li>
                <li><a href="calendar.html">Calendar</a></li>
                </ul>`;
navDictionary['About Us']=`<ul class="nav-container">
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="rules.html">Rules and Policies</a></li>
                </ul>`;
navDictionary['Contact']=`<ul class="nav-container">
                <li><a href="references.html">References</a></li>
                </ul>`;
navDictionary['Homepage']=``;

function topnav_hover(element){
    const submenu = document.getElementById('submenu');
    if (element.innerText == 'Homepage'){
        return
    }
    submenu.innerHTML=navDictionary[element.innerText];

}

document.addEventListener('DOMContentLoaded',()=>{
    console.log('DOM loaded');
    const header = document.querySelector('header');
    header.addEventListener('mouseleave', function(){
        const submenu = document.getElementById('submenu');
        submenu.innerHTML=``;
    })

    let topnav = document.querySelectorAll('a');
    for (const element of topnav){
        element.addEventListener('mouseenter', function(){
            topnav_hover(element);
        })
        
    }
});