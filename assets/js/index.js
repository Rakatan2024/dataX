


$("#add_user").submit(function(){
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `https://boiling-island-12959.herokuapp.com/admin/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname === "/admin"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `https://boiling-island-12959.herokuapp.com/admin/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}