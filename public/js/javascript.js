
 function get_cars(){
     var request=new XMLHttpRequest();
     var requestURL='/tableValues';
     request.open('GET',requestURL)
     request.responseType='json'
     request.send();
     request.onload=function(){
         var cars=request.response
         printCars(cars)
     }
 }

 function printCars(table1){
    var table =document.getElementById("car_table");
    var j=1;
    for (var i in table1){
       const userId=table1[i].userID;
       const id=table1[i].id;
       const title=table1[i].title;
       const body=table1[i].body;

       var userId_cell = document.createElement("td")
       var id_cell = document.createElement("td")
       var title_cell = document.createElement("td")
       var body_cell = document.createElement("td")

       var row = document.createElement("tr");
       userId_cell.append(userId)
       id_cell.append(id)
       title_cell.append(title)
       body_cell.append(body)
    
       row.appendChild(userId_cell)
       row.appendChild(id_cell)
       row.appendChild(title_cell)
       row.appendChild(body_cell)
       table.append(row)
    }
   }
