// Storage controller
const StorageCtrl = (function (){
    return{
        storeItem: function (item){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            }else{
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function (){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            }else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        }
    }
})


// item controller

const ItemCtrl = (function(){
    const Item = function(id, name, calories){
      this.id = id;
      this.name = name;
      this.calories = calories;
    }
    const data = {
        items: [],
        total: 0
    }

    return{
        getItems: function (){
            return data.items
        },
        addItem: function (name, calories){
            let ID;
            data.items.length > 0 ? ID = data.items[data.items.length -1].id + 1 : ID = 0;
            calories = parseInt(calories);

            newItem = new Item(ID, name, calories);
            data.items.push(newItem);
            return newItem
        },
        getTotalCalories: function (){
            let total = 0;
            data.items.forEach(function(item){
                total = total + item.calories;
            });
            data.total = total;
            return data.total;
        }
    }
})();


// ui controller

const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        itemNameInput: '#itemName',
        itemCaloriesInput: '#itemCalories',
        addBtn: '.add-btn',
        totalCalories: '.total-calories'
    }
    return{
        populateItemList: function (items){
            let html = "";
            items.forEach(function (item){
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}:</strong> <em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fas fa-edit"></i></a></li>`;
            })
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function (){
            return UISelectors;
        },
        getItemInput: function (){
          return{
              name: document.querySelector(UISelectors.itemNameInput).value,
              calories: document.querySelector(UISelectors.itemCaloriesInput).value
          }
        },
        addListItem: function (item){
            const li = document.createElement("li");
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fas fa-edit"></i></a>`;
            document.querySelector("#item-list").insertAdjacentElement('beforeend', li);
        },
        cleaInput: function (){
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = null;
        },
        showTotalCalories: function (totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        }

    }
})();

//app controller

const App = (function(ItemCtrl, UICtrl, StorageCtrl){
    const loadEventListeners = function (){
        const UISelectors = UICtrl.getSelectors();
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        document.addEventListener('DOMContentLoaded', getItemsFromStorage)
    }
    const itemAddSubmit = function (event){

        const input = UICtrl.getItemInput();
        if(input.name !== ""  && input.calories !== ""){
           const newItem = ItemCtrl.addItem(input.name, input.calories);
           UICtrl.addListItem(newItem);
           const totalCalories = ItemCtrl.getTotalCalories();
           UICtrl.showTotalCalories(totalCalories);
           StorageCtrl.storeItem(newItem);
           UICtrl.cleaInput();
        }
        event.preventDefault();
    }
    const getItemsFromStorage = function (){
        const items = StorageCtrl.getItemsFromStorage();
        items.forEach(function (item){
            ItemCtrl.addItem(item['name'], item['calories'])
        })
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.populateItemList(items);
    }
    return{
        init: function (){
            const items = ItemCtrl.getItems();
            UICtrl.populateItemList(items);
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl, StorageCtrl());

// Init. app
App.init();