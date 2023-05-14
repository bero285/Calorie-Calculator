// sorry back devs 

const StorageCtrl = (function () {
  // public methods
  return {
    storeItem: function (item) {
      let items;
      //check if any items in local storage
      if (localStorage.getItem("items") === null) {
        items = [];
        //push new items
        items.push(item);
        //set local storage
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem("items"));
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
      }
      // console.log(items)
    },
    getItemFromStorage: function () {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },
    updateItemStorage: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem("items"));
      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },
    deleteItemStorage: function (itemToDeleteID) {
      let items = JSON.parse(localStorage.getItem("items"));
      items.forEach((item, index) => {
        if (itemToDeleteID === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },
    removeAllItems: function () {
      localStorage.removeItem("items");
    },
  };
})();


//Iten Controller
const ItemCtrl = (function () {
  //item Constructor
  const curDate = new Date().toLocaleDateString()
  const Item = function (name, calories, grams) {

    this.id = id.next().value;
    this.calories = calories;
    this.name = name;
    this.date = curDate
  };

  function* genID() {
    let id = 1;
    while (true) {
      yield id++;
    }
  }
  const id = genID();

  // Data Structure / State
  const data = {
    items: StorageCtrl.getItemFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };

  //public methods
  return {
    getItems: function () {
      return data.items;
    },
    logData: function () {
      return data;
    },
    addItem: function (name, calories) {
      const newItem = new Item(name, parseInt(calories));
      data.items.push(newItem);
      return newItem;
    },
    getTotCalories: function () {
      let cal = 0;
      data.items.forEach((item) => {
        cal += item.calories;
      });
      data.totalCalories = cal;
      return data.totalCalories;
    },
    getItemByID: function (id) {
      let found = null;
      data.items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItemByID: function (id, name, calories) {
      let updatedItem = null;
      data.items.forEach((item) => {
        if (item.id === id) {
          item.name = name;
          item.calories = parseInt(calories);
          updatedItem = item;
        }
      });
      return updatedItem;
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    itemToBeDeleted: function (id) {
      //Get ids;
      const ids = data.items.map((item) => {
        return item.id;
      });
      const index = ids.indexOf(id);

      //Remove itme
      data.items.splice(index, 1);
    },
    clearAllItems: function () {
      data.items = [];
    },
  };
})();

//UI Controller
const UICrtl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };

  // public method
  return {
    populateItemList: function (items) {
      //problem is here, when updating a button
      let html = "";
      items.forEach((item) => {
        html += `
            <li class="collection-item" id="item-${item.id}">
              <a href="" class="secondary-content"
                ><i class="edit-item fa fa-pencil"></i
              ></a>
              <strong class="strong-st">${item.name}</strong>
              <em class="em-st">${item.calories} გრამი</em>
              <em class="em-st">${parseInt(item.calories) * 2} კალორია</em>
            </li>
        `;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    clearEditState: function () {
      UICrtl.clearInputs();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: function () {
      return UISelectors;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem(item) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a><strong class="strong-st">${item.name}</strong>  <em class="em-st">${item.calories} გრამი</em>  <em class="em-st">${parseInt(item.calories) * 2} კალორია</em>
       
        `;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInputs: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    statusList: function (status) {
      document.querySelector(UISelectors.itemList).style.display = status;
    },
    updateTotCalories: function (totalCal) {
      document.querySelector(UISelectors.totalCalories).innerHTML = totalCal * 2;
    },
    addItemToForm: function () {
      const currentItem = ItemCtrl.getCurrentItem();
      document.querySelector(UISelectors.itemNameInput).value =
        currentItem.name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        currentItem.calories;
      UICrtl.showEditState();
    },
    updateListItem: function (item) {
      const listItems = document.querySelectorAll("#item-list li");
      const listItemsConvert = Array.from(listItems);
      listItemsConvert.forEach((li) => {
        const liID = li.getAttribute("id");
        if (liID === `item-${parseInt(item.id)}`) {
          li.innerHTML = `
            <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a><strong class="strong-st">${item.name}</strong>  <em class="em-st">${item.calories} გრამი</em>  <em class="em-st">${parseInt(item.calories) * 2} კალორია</em>
            
            `;
        }
      });
    },
    removeLiItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    removeAllItems: function () {
      const items = document.getElementById("item-list");
      items.innerHTML = "";
    },
  };
})();

//App Controller
const App = (function (ItemCtrl, StorageCtrl, UICrtl) {
  //load event listener
  const loadEventListeners = function () {
    const UISelectors = UICrtl.getSelectors();

    //add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    //Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Update one item
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // Return to list adding
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", function (e) {
        UICrtl.clearEditState();
        e.preventDefault();
      });

    //Delete one item
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", deleteItem);

    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItem);

    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
  };

  //add item submit
  const itemAddSubmit = function (e) {
    //Get form input from UICtrl
    const input = UICrtl.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      //add item to the UI
      UICrtl.addListItem(newItem);

      //Get total calorie
      const totalCal = ItemCtrl.getTotCalories();

      //Update calorie.
      UICrtl.updateTotCalories(totalCal);

      // made list appeared
      UICrtl.statusList("block");

      //store in localStorage
      StorageCtrl.storeItem(newItem);

      //clear input fields
      UICrtl.clearInputs();
    }

    e.preventDefault();
  };

  const itemEditClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      //Get List item id
      const listID = e.target.parentNode.parentNode.id;

      //split the item-id tp get omlu te id
      const listIdArr = listID.split("-");
      // get the id number
      const id = parseInt(listIdArr[1]);

      //Get Item
      const itemToEdit = ItemCtrl.getItemByID(id);

      //set curret item
      ItemCtrl.setCurrentItem(itemToEdit);

      //add item to form
      UICrtl.addItemToForm();
    }
    e.preventDefault();
  };

  const itemUpdateSubmit = function (e) {
    const input = UICrtl.getItemInput();
    const itemId = ItemCtrl.getCurrentItem().id;

    // update the data
    const updatedItemSubmit = ItemCtrl.updateItemByID(
      itemId,
      input.name,
      input.calories
    );

    // udpate item list in UI
    UICrtl.updateListItem(updatedItemSubmit);

    //Get total calorie
    const totalCal = ItemCtrl.getTotCalories();

    //Update calorie.storage
    UICrtl.updateTotCalories(totalCal);

    //set ititial states
    UICrtl.clearEditState();

    //Udpate local storage
    StorageCtrl.updateItemStorage(updatedItemSubmit);

    //clear input fields
    UICrtl.clearInputs();

    e.preventDefault();
  };

  const deleteItem = function (e) {
    // retrieve the item id
    const itemToDeleteID = ItemCtrl.getCurrentItem().id;

    ItemCtrl.itemToBeDeleted(itemToDeleteID);

    UICrtl.removeLiItem(itemToDeleteID);

    //Get total calorie
    const totalCal = ItemCtrl.getTotCalories();

    //Update calorie.
    UICrtl.updateTotCalories(totalCal);

    //delete fron local storage
    StorageCtrl.deleteItemStorage(itemToDeleteID);

    //set ititial states
    UICrtl.clearEditState();

    e.preventDefault();
  };

  const clearAllItem = function (e) {
    //remove all item in items list
    ItemCtrl.clearAllItems();

    //Remove items in UI
    UICrtl.removeAllItems();

    StorageCtrl.removeAllItems();

    //Get total calorie
    const totalCal = ItemCtrl.getTotCalories();

    //Update calorie.
    UICrtl.updateTotCalories(totalCal);

    //hide the list
    UICrtl.statusList("none");

    e.preventDefault();
  };

  //public method
  return {
    init: function () {
      //set ititial states
      UICrtl.clearEditState();

      //Fetch items from data structur
      const items = ItemCtrl.getItems();

      const totalCal = ItemCtrl.getTotCalories();
      //   update UI consequentlz to totCal
      UICrtl.updateTotCalories(totalCal);

      //Check if ther is any items
      if (items.length === 0) {
        UICrtl.statusList("none");
      } else {
        //Populate list with items
        UICrtl.populateItemList(items);
      }

      //load Event Listeneers
      loadEventListeners();
    },
  };
})(ItemCtrl, StorageCtrl, UICrtl);
var b = 0
let calendar = document.createElement("div")
function showCalendar() {
  b += 1
  let a = JSON.parse(localStorage.getItem('items'))

  // console.log(a[0].date)
  let calcCont = document.getElementById("cal-create")
  calendar.classList.add("diary-cont-1")
  
  if(a !== null){
  for (let i = 0; i < a.length; i++) {
    var element = a[i].date;
  }}

  // console.log(typeof element)
  const currDate = new Date().toLocaleDateString()
  if(a !== null){
  let el = '<table class="styled-table"><thead><tr><th>თარიღი</th><th>პროდუქტი</th><th>კალორია</th></tr></thead><tbody>' + a.map(e => `<tr><td>${e.date}</td><td>${e.name}</td><td>${parseInt(e.calories) * 2}</td></tr>`) + '</tbody></table> <button class=" clear-btn btn red lighten-1"onclick = "deleteButton()">წაშალე</button>'
  if (element === currDate) {
    calendar.innerHTML = el;
  }
}
 

  // console.log(calendar)


  calcCont.appendChild(calendar)
  let res = String(document.getElementsByClassName('cal-date')); //.value undefine but why ???
  // console.log(res, typeof res)
  let sample = calendar.getElementsByClassName('cal-date');
  
}




window.onbeforeunload = function (e) {
  localStorage.clear();
};

function deleteButton() {
  calendar.innerHTML = ' '
}

App.init();
