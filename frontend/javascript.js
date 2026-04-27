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
navDictionary['Developer Contact']=`<ul class="nav-container">
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

  if (url.pathname.endsWith("/reservations.html")) {
    doForm()
  }
});

const url = new URL(window.location.href);
console.log("url: %o", url);
const doForm = () => {
  const validation_errors = JSON.parse(decodeURIComponent(url.hash.slice(1)));

  const errorsDiv = document.createElement("div");
  errorsDiv.classList.add("errors");
  const errorsList = document.createElement("ul");
  errorsDiv.insertAdjacentElement("beforeend", errorsList);

  for (const key in validation_errors) {
    const {original_value, error_messages} = validation_errors[key];
    const formInput = document.getElementById(key);
    if (formInput) {
      switch (formInput.type) {
        case "checkbox":
          formInput.checked = original_value === "true";
          break;
        case "datetime-local":
          if (original_value === "") {
            continue;
          }
          const date = new Date(original_value);
          const minutesOffsetFromUTC = date.getTimezoneOffset();
          const secondsInMinute = 60;
          const millisecondsInSecond = 1000;
          formInput.valueAsNumber = date.getTime() - (minutesOffsetFromUTC * secondsInMinute * millisecondsInSecond);
          break;
        default:
          formInput.value = original_value;
          break;
      }
    } else {
      console.error("missing id (%o) that matches validation object's: %o", key, validation_errors[key]);
    }

    for (const message of error_messages) {
      const li = document.createElement("li");
      li.textContent = message;
      errorsList.insertAdjacentElement("beforeend", li);
    }
  }

  if (errorsList.childElementCount > 0) {
    document.querySelector("form").insertAdjacentElement("beforebegin", errorsDiv);
  }
};
