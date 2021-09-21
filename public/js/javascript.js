get_cars()

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

 function printCars(cars){
    var table =document.getElementById("car_table");
    var j=1;
    for (var i in cars){
       const userId=table[i].userId;
       const id=table[i].id;
       const title=cars[i].title;
       const body=cars[i].body;

       var id_cell = document.createElement("td")
       var plate_cell = document.createElement("td")
       var date_cell = document.createElement("td")
       var entry_cell = document.createElement("td")
       var exit_cell = document.createElement("td")
       var fee_cell = document.createElement("td")
       var parked_cell = document.createElement("td")
       var row = document.createElement("tr");
       id_cell.append(id)
       plate_cell.append(plate)
       date_cell.append(date)
       entry_cell.append(entry)
       exit_cell.append(exit)
       fee_cell.append(fee)
       parked_cell.append(parked)
       row.appendChild(id_cell)
       row.appendChild(plate_cell)
       row.appendChild(date_cell)
       row.appendChild(entry_cell)
       row.appendChild(exit_cell)
       row.appendChild(fee_cell)
       row.appendChild(parked_cell)
       table.append(row)
       j = j+1;
    }
   }
