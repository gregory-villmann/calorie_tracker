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
        logData: function (){
            return data;
        }
    }
})();


// ui controller

const UICtrl = (function(){
    console.log("ui ctrl");
    return{}
})();

//app controller

const App = (function(ItemCtrl, UICtrl){
    console.log(ItemCtrl.logData())
    return{
        init: function (){
            console.log("Init App")
        }
    }
})(ItemCtrl, UICtrl);

// Init. app
App.init();