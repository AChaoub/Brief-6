$(document).ready(function () {
    $('#submit').click(function (e) {
        e.preventDefault();

        var username = $('#lastName').val();
        var firstname = $('#firstName').val();
        var cin = $('#cin').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var confPassword = $('#confPassword').val();

        // Initialiser les variables avec les expressions reguliers
        var name_regex = /^[a-zA-Z]+$/;
        var email_regex = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/;
        var cin_regex = /^[a-zA-Z]{1,2}[0-9]{5,6}$/;

        // Pour confirmer que les champs ne sont pas vide
        if (username.length == 0 || firstname.length == 0 || cin.length == 0 || email.length == 0 || password.length == 0 || confPassword.length == 0) {
            $('#head').text("* Tous les champs sont obligatoires *");
        }
        else if (!username.match(name_regex)) {
            $('#p1').text("* Il doit contient juste des alphabets *");
        }
        // Validation prénom 
        else if (!firstname.match(name_regex)) {
            $('#p2').text("* Il doit contient juste des alphabets  *");
        }
        // Validation Email
        else if (!email.match(email_regex)) {
            $('#p4').text("* Entrer un email valide *");
        }
        // Validation cin 
        else if (!cin.match(cin_regex)) {
            $('#p3').text("* CIN doit contient des alphabets et des nombres*");
        }
        else {
            $('#head, #p1, #p2, #p3, #p4').text('');
            var formData = $('form').serialize();
            $.post("/register", formData, function (data) {
                $('form').text(data);
            });
        }


    });
});

