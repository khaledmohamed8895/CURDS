let title = document.getElementById ('title');
let price = document.getElementById ('price');
let taxes = document.getElementById ('taxes');
let ads = document.getElementById ('ads');
let discount = document.getElementById ('discount');
let total = document.getElementById ('total');
let count = document.getElementById ('count');
let category = document.getElementById ('category');
let submit = document.getElementById ('submit');
let mood = 'create';
let tmp;
// console.log (title, price, taxes, ads, discount, category, submit);

//get total

function getTotal () {
  if (price.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result + '$';
    total.style.background = 'green';
  } else {
    total.innerHTML = '$';
    total.style.background = '#a00d02';
  }
}

//create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse (localStorage.product);
} else {
  dataPro = [];
}

function formSubmit () {
  let newPro = {
    title: title.value.toLowerCase (),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  //Create more than one item (count)
  if (
    title.value != '' &&
    price.value != '' &&
    count.value <= 100 &&
    category.value != ''
  ) {
    if (mood === 'create') {
      if (newPro.count > 1) {
        for (let index = 0; index < newPro.count; index++) {
          dataPro.push (newPro);
        }
      } else {
        dataPro.push (newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = 'create';
      submit.innerHTML = 'Create';
      count.style.display = 'block';
    }
    clearData ();
  }

  // save in localstorge
  localStorage.setItem ('product', JSON.stringify (dataPro));
  show_data ();
}

submit.onclick = formSubmit;
window.onkeyup = function (e) {
  if (e.key == 'Enter') {
    formSubmit ();
  }
};

//clear inputs

function clearData () {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '$';
  count.value = '';
  category.value = '';
  total.style.background = '#a00d02';
}

//read product

function show_data () {
  getTotal ();
  let table = '';
  for (let i = 0; i < dataPro.length; i++) {
    table += ` <tr>
        <td>${i + 1}</td>
        <td> ${dataPro[i].title}</td>
        <td> ${dataPro[i].price}</td>
        <td> ${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads} </td>
        <td> ${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td> ${dataPro[i].category}</td>
        <td><button onclick="update_data(${i})"  id="update"> update</button> </td>
        <td><button onclick="delate_data (${i})" id="delate">delate</button> </td>
      </tr>`;
  }

  document.getElementById ('tbody').innerHTML = table;
  let btn_delate = document.getElementById ('delate_all');
  if (dataPro.length > 0) {
    btn_delate.innerHTML = `
    <button onclick="delate_all()"> Delate All (${dataPro.length})</button>
  `;
  } else {
    btn_delate.innerHTML = '';
  }
}

show_data ();

//delete item
function delate_data (i) {
  let sure = prompt ('هل انت متاكد');

  dataPro.splice (i, 1);
  localStorage.product = JSON.stringify (dataPro);
  show_data ();
}

// delate_all items or data
function delate_all () {
  let password = prompt ('من فضلك ادخل الرقم السري');

  if (password == '12345') {
    localStorage.clear ();
    dataPro.splice (0);
    show_data ();
  } else {
    alert ('حاول مره اخري');
  }
}

//update data
function update_data (i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  count.style.display = 'none';
  getTotal ();
  category.value = dataPro[i].category;
  submit.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  scroll ({
    top: 0,
    behavior: 'smooth',
  });
}

// search

let search_mood = 'title';

function search_by_mood (id) {
  let search = document.getElementById ('search');
  if (id == 'searchTitle') {
    search_mood = 'title';
  } else {
    search_mood = 'category';
  }
  search.placeholder = 'search by ' + search_mood;
  search.focus ();
  search.value = '';
  show_data ();
}

// main function search
function search_data (value) {
  let table = '';
  for (let i = 0; i < dataPro.length; i++) {
    if (search_mood == 'title') {
      if (dataPro[i].title.includes (value.toLowerCase ())) {
        table += ` <tr>
          <td>${i + 1}</td>
          <td> ${dataPro[i].title}</td>
          <td> ${dataPro[i].price}</td>
          <td> ${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads} </td>
          <td> ${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td> ${dataPro[i].category}</td>
          <td><button onclick="update_data(${i})"  id="update"> update</button> </td>
          <td><button onclick="delate_data (${i})" id="delate">delate</button> </td>
      </tr>`;
      }
    } else {
      if (dataPro[i].category.includes (value)) {
        table += ` <tr>
          <td>${i + 1}</td>
          <td> ${dataPro[i].title}</td>
          <td> ${dataPro[i].price}</td>
          <td> ${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads} </td>
          <td> ${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td> ${dataPro[i].category}</td>
          <td><button onclick="update_data(${i})"  id="update"> update</button> </td>
          <td><button onclick="delate_data (${i})" id="delate">delate</button> </td>
      </tr>`;
      }
    }
  }
  document.getElementById ('tbody').innerHTML = table;
}
//clean data
