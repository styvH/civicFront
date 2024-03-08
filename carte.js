document.addEventListener('DOMContentLoaded', function() {
    // Cette fonction est appelée lorsque le bouton de menu est cliqué
    function toggleMenu() {
        document.getElementById('contenu-menu').classList.toggle('afficher');
    }

    // Ajouter un écouteur d'événement de clic au bouton de menu
    document.querySelector('.bouton-menu').addEventListener('click', function(event) {
        toggleMenu();
        event.stopPropagation(); // Empêche l'événement de se propager à window
    });

    // Cette fonction est appelée lorsque l'utilisateur clique n'importe où sur la page
    window.addEventListener('click', function(event) {
        var menus = document.getElementsByClassName('contenu-menu');
        for (var i = 0; i < menus.length; i++) {
            var menuOuvert = menus[i];
            if (menuOuvert.classList.contains('afficher')) {
                menuOuvert.classList.remove('afficher');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modifierUtilisateurBtn = document.getElementById('modifier-utilisateur');
    modifierUtilisateurBtn.addEventListener('click', (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Modifier vos informations',
            html: `
                <input id="email" class="swal2-input" placeholder="Email">
                <input id="pseudo" class="swal2-input" placeholder="Pseudo">
                <input id="nom" class="swal2-input" placeholder="Nom">
                <input id="prenom" class="swal2-input" placeholder="Prenom">
                <input id="tel" class="swal2-input" placeholder="Téléphone">
            `,
            confirmButtonText: 'Valider',
            customClass: {
                confirmButton: 'btn-swal', // Use your custom class here
                popup: 'swal2-popup'
            },
            buttonsStyling: false,
            preConfirm: () => {
                return {
                    email: document.getElementById('email').value,
                    pseudo: document.getElementById('pseudo').value,
                    nom: document.getElementById('nom').value,
                    prenom: document.getElementById('prenom').value,
                    tel: document.getElementById('tel').value
                };
            },
            onOpen: () => {
                document.getElementById('email').focus();
            }
        }).then((result) => {
            if (result.isConfirmed) {
                
                
        // Préparez les données à envoyer
        const citoyenData = {
            id: 1, // A remplacer l'ID citoyen connecté
            mail: result.value.email,
            pseudo: result.value.pseudo,
            nom: result.value.nom,
            prenom: result.value.prenom,
            tel: result.value.tel
            
        };
    
        // Effectuez la requête fetch pour mettre à jour les informations du citoyen
        fetch('http://localhost:5555/editCitoyen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(citoyenData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            Swal.fire({
                icon: 'success',
                title: 'Modifications enregistrées',
                text: data.message, // Affiche le message de réponse de l'API
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Échec de l\'enregistrement',
                text: 'Une erreur est survenue lors de la tentative de modification des informations.',
            });
        });

                console.log(result.value);
            }
        });
    });
    
});

document.addEventListener('DOMContentLoaded', () => {
    const modifierPassBtn = document.getElementById('modifier-pass');
    modifierPassBtn.addEventListener('click', (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Modifier votre mot de passe',
            html: `
                <input id="expass" type="password" class="swal2-input" placeholder="Mot de passe actuel">
                <input id="newpass" type="password" class="swal2-input" placeholder="Nouveau mot de passe">
                <input id="newpassconf" type="password" class="swal2-input" placeholder="Confirmation du nouveau mot de passe">
            `,
            confirmButtonText: 'Valider',
            customClass: {
                confirmButton: 'btn-swal', // Use your custom class here
                popup: 'swal2-popup'
            },
            buttonsStyling: false,
            preConfirm: () => {
                const expass = document.getElementById('expass').value;
                const newpass = document.getElementById('newpass').value;
                const newpassconf = document.getElementById('newpassconf').value;

                if (newpass !== newpassconf) {
                    Swal.showValidationMessage("Les mots de passe ne correspondent pas");
                    return false;
                }

                return { expass, newpass };
            },
            onOpen: () => {
                document.getElementById('expass').focus();
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                // Préparez les données à envoyer
                const citoyenData = {
                    id: 1, // A remplacer par l'ID citoyen connecté
                    expass: result.value.expass,
                    newpass: result.value.newpass,
                };

                // Effectuez la requête fetch pour mettre à jour le mot de passe du citoyen
                fetch('http://localhost:5555/editPass', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(citoyenData),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Mot de passe modifié',
                        text: data.message, // Affiche le message de réponse de l'API
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Échec de la modification',
                        text: 'Une erreur est survenue lors de la tentative de modification du mot de passe.',
                    });
                });
            }
        });
    });
});

