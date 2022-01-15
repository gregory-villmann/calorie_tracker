// Storage controller



// item controller

const ItemCtrl = (function(){
    const item = (id, name, calories) => {
      this.id = id;
      this.name = name;
      this.calories = calories;
    }
    const data = {
        items: [
            {id:0, name:"Steak", calories: 1200},
            {id:1, name:"Burger", calories: 550},
            {id:2, name:"Ice cream", calories: 200}
        ],
        total: 0
    }

    return{
        getItems: function (){
            return data.items
        },
        logData: function (){
            return data;
        }
    }
})();


// ui controller

const UICtrl = (function(){
    return{
        populateItemList: function (items){
            let html = "";
            items.forEach(function (item){
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}:</strong> <em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fas fa-edit"></i></a></li>`;
            })
            document.querySelector("#item-list").innerHTML = html;
        }

    }
})();

//app controller

const App = (function(ItemCtrl, UICtrl){

    return{
        init: function (){
            console.log("Init App")
            const items = ItemCtrl.getItems();
            UICtrl.populateItemList(items);

        }
    }
})(ItemCtrl, UICtrl);

// Init. app
App.init();