function searchTests(){

const input=document.getElementById("searchBox").value.toUpperCase();

const cards=document.getElementsByClassName("price-card");

for(let i=0;i<cards.length;i++){

const text=cards[i].innerText;

cards[i].style.display=text.toUpperCase().includes(input)
? "block"
: "none";

}

}
