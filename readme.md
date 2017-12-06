# Un paint en canvas !

jimpaint est un mini-paint qui utilise à gogo la balise `<canvas>` !

## Soyez créatifs

J'ai codé trois outils,

- un outil **ligne** pour trcer de beaux traits droits
- un outil **pinceau** pour les artistes
- un outil **ellipse** tout en rondeur. *Astuce :* Maintenez la touche majuscule pour faire un cercle parfait.
- un outil ** rectangle** pour les plus rigoureux. *Astuce :* Maintenez la touche majuscule pour faire un carré parfait.

## Coder de nouveaux outils

La définiton d'un outil se fait en JS.  
Pour plus de clarté, chaque outil est défini dans un fichier js séparé (tools/monoutil.js)

Les scripts outils doivent être chargés après `jquery.js` et `jimpaint.js`.

<code>
    var monOutil = {
        options: {
            name: 'Mon Outil',
            icon: 'font-awesome-icon-name' // cf fontawesome.io
    
            // le nom et l'icone apparaitront dans la barre d'outils
    },
    mouseMoveHandler: function(event){
        // votre code...
        // event est un jQuery event - cf. doc
    },
    ClickHandler: function(){
        // votre code...
    }
    // etc. 
    }
</code>

Les fonctions `eventHandler` sont les suivantes (toutes sont optionnelles) :

- `monOutil.clickHandler`
- `monOutil.mouseMoveHandler`
- `monOutil.mouseUpHandler`
- `monOutil.mouseDownHandler`
- `monOutil.keyDownHandler`
- `monOutil.keyUpHandler`

plus la fonction `monOutil.initFunction` appellée à chaque swich vers l'outil.