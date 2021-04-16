# GroupFinder
# For å kjøre lokalt:

Du trenger VUE CLI og Node for å kjøre applikasjonen lokalt. 
Node må installeres først da VUE er avhengig av den.
https://nodejs.org/en/download/


npm install -g @vue/cli i terminalen. 


XAMP: Kjør script.sql for oppretting av database.

Det trengs 2 ulike terminaler for å kjøre applikasjonen.
1 for frontend og 1 for backend. 

npm install kommandoen vil laste inn alle nødvendige avhengigheter basert på listen i package.json fila. 
Det er 1 package.json fil for frontend og 1 for backend. 

change directory til du er inne i ...APP2000ACTUALLYFINAL/app
skriv npm install i konsollet

I server/util/database.js ligger dbnavn, username, passord og host
default er "protest" for dbnavn
default username er root og passordet er tomt. 

change directory til du er inne i ...APP2000ACTUALLYFINAL/server
skriv npm install i konsollet



For å starte backend.

change directory til du er inne i ...APP2000ACTUALLYFINAL/server,
og skriv npm start i konsollet.

For å starte frontend 

change directory til du er inne i ...APP2000ACTUALLYFINAL/app,
og skriv npm run serve i konsollet.

Vue defaulter til localhost:8080, dette står i terminalen for frontend.

Du kan nå logge inn med 2 ulike brukere ELLER lage din egen bruker. Husk minimum 6 tegn på pw. 
email: test@test.com pw: testtest
email: test1@test.com pw: testtest
