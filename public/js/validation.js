document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("complaintForm");

    form.addEventListener("submit", function(e){

        const name =
            form.fullName.value.trim();

        const email =
            form.email.value.trim();

        const make =
            form.make.value.trim();

        const description =
            form.description.value.trim();

        if(name.length < 3){
            alert("Name must be at least 3 characters.");
            e.preventDefault();
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){
            alert("Valid email required.");
            e.preventDefault();
            return;
        }

        if(make.length < 2){
            alert("Vehicle make required.");
            e.preventDefault();
            return;
        }

        if(description.length < 20){
            alert("Description must be at least 20 characters.");
            e.preventDefault();
        }

    });

});