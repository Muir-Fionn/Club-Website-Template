/**
 * @fileoverview Functions for Club page template.
 */

/* Functions to execute on page load */
 document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    upcomingFill();
  }
};

/*--- DOM Events functions ---*/


/*-- Page Manipulation functions --*/
function upcomingFill() {
  var header = makeElement('h1', 'title', 'Upcoming Events');
  upcoming.appendChild(header);

  events.forEach(function(el) {
    var container = makeElement('div', 'event', null);
    var title = makeElement('h2', 'subtitle', el.title);
    var date = makeElement('span', 'date', el.date);
    var time = makeElement('span', 'time', el.time);
    var description = makeElement('p', 'eventDescription', el.description);

    appendChildren(container, title, date, time, description);

    upcoming.appendChild(container);
  });
}

function galleryFill() {
    var header = makeElement('h1', 'title', 'Gallery');
    var nav = makeElement('ul', 'galleryNav', null);
    var display = makeElement('div', 'photos', null);

    for(var name in gallery){
      var listItem =  makeElement('li', null, name);
      nav.appendChild(listItem);

      var photoDiv = fillPhotos(gallery[name], name);
      display.appendChild(photoDiv);
    }

    appendChildren(photos, header, nav, display);
}

function aboutFill() {
  var header = makeElement('h1', 'title', 'About Us');
  about.appendChild(header)

  aboutText.forEach(function(el){
    var p = makeElement('p', null, el);
    about.appendChild(p);
  });
}

function memberFill() {
  var header = makeElement('h1', 'title', 'Member Information');
  var rules = fillRules(memberInfo.rules);
  var contacts = fillFromObject(memberInfo.contacts, 'contacts');
  var resources = fillFromObject(memberInfo.resources, 'resources');

  appendChildren(members, header, rules, contacts, resources);
}

function makeElement(type, style, text) {
  var el = document.createElement(type);

  if(style) {
    el.classList.add(style);
  }

  if(text) {
    var text = document.createTextNode(text);
    el.appendChild(text);
  }

  return el;
}

function appendChildren(parent) {
  var children = Array.prototype.slice.call(arguments, 1);

  children.forEach(function(el) {
    parent.appendChild(el);
  })
}

function fillPhotos(arr, name) {
  var div = makeElement('div', name, null);

  arr.forEach(function(el) {
    var photo = makeElement('img', 'thumbnail', null)
    photo.src = el['url'];
    photo.alt = el['title'];

    div.appendChild(photo);
  });

  return div;
}

function fillRules(arr) {
  var div = makeElement('div', 'rules', null);
  var header = makeElement('h2', 'subtitle', 'rules');
  var list = makeElement('ul', 'rules', null)

  arr.forEach(function(el) {
    var rule = makeElement('li', 'rule', el);
    list.appendChild(rule);
  });

  appendChildren(div, header, list);

  return div;
}

function fillFromObject(arr, name) {
  var div = makeElement('div', name, null);
  var header = makeElement('h2', 'subtitle', name);
  var list = makeElement('ul', name, null);

  arr.forEach(function(obj) {
    for(var info in obj) {
      var item = makeElement('li', info, obj[info]);
      list.appendChild(item);
    }
  });

  appendChildren(div, header, list);

  return div;
}
