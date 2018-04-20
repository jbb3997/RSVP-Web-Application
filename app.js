
const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const mainDiv = document.querySelector('.main');
const ul = document.querySelector('#invitedList');

const div = document.createElement('div');
div.innerHTML = `
  <label>Hide those who haven't responded</label>
  <input type='checkbox'>
`;
mainDiv.insertBefore(div, ul);

const filterCheckbox = document.querySelector('.main div input');

filterCheckbox.addEventListener('change', (e) => {
  const checked = e.target.checked;
  const li = document.querySelectorAll('#invitedList li');
  for (let i = 0; i < ul.childNodes.length; i++) {
    if (checked) {
      if (li[i].className === '') {
        li[i].style.display = 'none';
      }
    }
    else {
      li[i].style.display = 'block';
    }
  }
})

function createLi (text) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${text}</span>
    <label>
      Confirmed
      <input type='checkbox'>
    </label>
    <button>edit</button>
    <button>remove</button>
  `;
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLi(text);
  ul.appendChild(li);
});

ul.addEventListener('change', (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItems = checkbox.parentNode.parentNode;

  if (checked) {
    listItems.className ='responded';
  }
  else {
    listItems.className = '';
  }

});

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = e.target.parentNode;
    const ul = li.parentNode;

    if (button.textContent === 'remove') {
      ul.removeChild(li);
    }
    else if (button.textContent === 'edit') {
      const span = li.firstElementChild;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = 'save';
    }
    else if (button.textContent === 'save') {
      const input = li.firstElementChild;
      const span = document.createElement('span');
      span.textContent = input.value;
      li.insertBefore(span, input)
      li.removeChild(input);
      button.textContent = 'edit';
    }
  }
});