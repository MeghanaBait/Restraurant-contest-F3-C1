const menuContainer = document.getElementById("menu-container");

//fetching data
let items = {};

let foodItem;

fetchData();

async function fetchData(){
    try{
        const responseData = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");
        items = await responseData.json();
        getMenu();
    }catch (error){
        console.log("Error fetching data", error);
    }
}


async function getMenu(){
    for(const key in items){
        const item = items[key];
        menuContainer.innerHTML += `
        <div class="card">
                    <div class="card-img">
                        <img src="${item.imgSrc}" alt="itemImage">
                    </div>
                    <div class="card-details">
                        <div class="card-details-left">
                            <h2>${item.name}</h2>
                            <p>$${item.price}/-</p>
                        </div>
                        <div class="card-details-right">
                            <a href="#"><img src="./add.png" alt="add"></a>
                        </div>
                    </div>
                </div>
        `;
    }
}


function takeOrder(){
    return new Promise((resolve, reject)=>{
        setTimeout(() =>{
            const foodItems = [];
            for(const key in items){
                const item = items[key];
                foodItems.push(item.name);
            }
            const n = foodItems.length;
            foodItem = [foodItems[Math.floor(Math.random() * n)],
                foodItems[Math.floor(Math.random() * n)],
                foodItems[Math.floor(Math.random() * n)]
            ];

            const order = {
                food : foodItem
            };
            resolve(order);
        },2500);
    });
}

function orderPrep(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const orderStatus = {
                order_status:true,
                paid:false
            }
            resolve(orderStatus);
        },1500);
    })
}


function payOrder(){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const payStatus = {
                order_status : true,
                paid:true
            }
            resolve(payStatus);
        },1000);
    })
}

function thankYouFnc(){

    alert("Thank you for eating with us today! ");
}

const placeOrder = document.getElementById("orderPlace");

placeOrder.addEventListener("click", async () =>{
    try{
        const order = await takeOrder();
        console.log("Order Placed :- " + order.food);

        const prepare = await orderPrep();
        console.log("Order Preparation :- " + prepare.order_status);

        const payment = await payOrder();
        console.log("Payment Status :- " +payment.paid);

        if(payment.paid){
            thankYouFnc();
        }

    }catch(error){
        console.log("Error is :-" + error);
    }
})