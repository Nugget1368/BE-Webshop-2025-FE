# :book: Frontend-dokumentation - Hakims Livs

Denna dokumentation är avsedd att hjälpa backend-utvecklare och testare att förstå frontendkoden för Hakims Livs webbutik. Här finner ni en omfattande översikt av kodstrukturen, nödvändig installation, använda teknologier, och viktiga funktioner som används genomgående i projektet.

## Kodstruktur och arkitektur

Projektet följer en modulär struktur som är organiserad för att separera olika ansvarsområden:

#### /src/classes/

I denna mapp finns alla datamodeller och klasser som representerar domänobjekt:

- `product.js` - En klass som representerar en produkt med egenskaper som namn, pris, beskrivning, osv.
- `user.js` - Innehåller både User-klassen och Admin-klassen (som ärver från User). Dessa klasser hanterar användardata.
- `cart.js` - En klass som hanterar kundvagnen, inklusive metoder för att lägga till produkter, beräkna totalsumma, och uppdatera UI.

#### /src/builders/

Implementerar builder-designmönstret för att skapa UI-komponenter:

- `builder.js` - Basklassen med grundläggande byggfunktionalitet.
- `ProductFormBuilder.js` - Specialiserad byggare för att skapa produktformulär.
- `productHandlers.js` - Innehåller funktioner för att hantera produktinteraktioner (redigera, ta bort).

#### /src/scripts/

Dessa script hanterar DOM-manipulation och händelsehantering för varje sida:

- `index.js` - Huvudscriptet för startsidan, hanterar produktvisning och kundvagnsinteraktioner.
- `login.js` - Hanterar användarautentisering och inloggning.
- `register.js` - Hanterar användarregistrering.

#### /src/utils/

Innehåller hjälpfunktioner och tjänster:

- `api.js` - Funktioner för att kommunicera med backend-API:et.
- `auth.js` - Hanterar autentisering, tokenhantering och behörighetskontroller.
- `localstorage.js` - Hjälpfunktioner för att interagera med webbläsarens localStorage.
- `/testModels/` - Innehåller testdata för utveckling.
<hr>

## Setup och installation

1. Klona projektet från GitHub-repositoriet
2. Öppna projektet i en kodredigerare (t.ex. VS Code)
3. För lokal utveckling med testdata:
   - Installera json-server: `npm install json-server`
   - Navigera till testModels-mappen: `cd src/utils/testModels`
   - Starta json-server: `json-server products.json --port 5001`
4. Öppna index.html i en webbläsare (eller använd Live Server-extension i VS Code)

Inga ytterligare kompileringssteg behövs för att köra projektet.

<hr>

## Kodbibliotek & teknologier

Projektet använder följande teknologier:

- **Axios** - Alla HTTP-anrop till backend-API:er [Dokumentation (JsDelivr)](https://axios-http.com/docs/intro)
- **JSON-server** - För lokalt utvecklings API. [Dokumentation](https://www.npmjs.com/package/json-server)
- **HTML5 & SCSS/CSS** - För struktur och styling
- **Vanilla JavaScript** - För all funktionalitet
- **LocalStorage API** - För att spara kundvagnsdata mellan sessioner
- **Sessionstorage** - För att spara JWT efter inloggning
- **JWT (JSON Web Tokens)** - För auktorisering och autentisering. Token sparas i sessionStorage efter inloggning som sedan skickas med varje API-anrop som kräver autentisering.
<hr>

## Hjälp-funktioner

#### API-funktioner (src/utils/api.js)

`fetchProducts()`

- Syfte: Hämtar alla tillgängliga produkter
- Returnerar: Ett Promise med en array av produktobjekt
- Parametrar: Inga

`addProduct(product)`

- Syfte: Skapar en ny produkt
- Returnerar: Ett Promise med det skapade produktobjektet
- Parametrar: `product:` Ett objekt med produktdata (namn, pris, beskrivning, etc.)
- Kräver: Admin-behörighet

`updateProduct(id, product)`

- Syfte: Uppdaterar en befintlig produkt
- Returnerar: Ett Promise med den uppdaterade produkten
- Parametrar: `id:` Produkt-ID som ska uppdateras `product:` Nya produktdata
- Kräver: Admin-behörighet

`deleteProduct(id)`

- Syfte: Tar bort en produkt
- Returnerar: Ett Promise med statusdata
- Parametrar: `id:` Produkt-ID som ska tas bort
- Kräver: Admin-behörighet

`getProductById(id)`

- Syfte: Hämtar detaljerad information om en specifik produkt
- Returnerar: Ett Promise med produktobjektet
- Parametrar: `id:` Produkt-ID att hämta
<hr>

### Auth-funktioner (src/utils/auth.js)

Dessa funktioner hanterar autentisering och behörigheter:

- `register(user)` - Registrerar en ny användare
- `login(username, password)` - Loggar in en användare
- `saveToken(token)` - Sparar JWT-token
- `getToken()` - Hämtar JWT-token
- `clearSession()` - Loggar ut användaren
- `isAdmin()` - Kontrollerar om inloggad användare är admin
<hr>

### LocalStorage-funktioner (src/utils/localstorage.js)

Funktioner för att interagera med localStorage:

- `getStorageAsJSON(key)` - Hämtar data från localStorage
- `saveToStorage(key, obj)` - Sparar data till localStorage
- `clearStorage(key)` - Rensar specifik data från localStorage
<hr>

### Builder-klasser

Projektet använder Builder-klasser för att skapa UI-komponenter:

**Grundläggande Builder (builder.js)**
Basklassen för alla byggare, lägger till element i en resultatarray

**ProductFormBuilder (ProductFormBuilder.js)**
Skapar och hanterar formulär för produkter

**Produkthanterare (productHandlers.js)**
Kopplar interaktioner till produktkort

<hr>

## Användarflöden

**Produktvisning och köp (vanlig users)**

- En användaren besöker webbplatsen
- Produkter laddas automatiskt med loadProducts() i index.js

_Användaren kan:_

- Visa produktdetaljer genom att klicka på produkter
- Lägga till produkter i varukorgen med "Lägg i varukorg"-knappen
- Visa varukorg genom att klicka på kundvagnsikonen
- Tömma varukorgen med "Töm varukorg"-knappen

**Admin-funktionalitet**

- Admin loggar in via login.html
- Efter inloggning visas admin-knappen: "Hantera produkter"-knappen i header menyn
- Redigerings- och borttagningsknappar visas nu på produktkorten

_Admin kan:_

- Skapa nya produkter via "Hantera produkter"-knappen
- Redigera produkter genom att klicka på "Redigera"-knappen
- Ta bort produkter genom att klicka på "Ta bort"-knappen
<hr>

## Förbättringspunkter

Detta är områden i frontend-koden som skulle kunna förbättras om mer tid hade funnits:

- **Responsiv design** - Nuvarande layout fungerar bra på desktop men har begränsad anpassning för mobila enheter. Ett mer flexibelt grid-system och förbättrade media queries skulle göra webbplatsen mer användarvänlig på mindre skärmar. Produktkorten behöver särskilt justeras för att fungera bättre på mobiler.
  </br>

- **Grundläggande CMS** - Vi hade gärna ägnat mer tid åt design och styling för att skapa en bättre och mer genomtänkt överlämning. Vår ambition var att lägga en stabil grund som skulle kunna fungera för exempelvis ett enklare CMS i framtiden. Tyvärr fick vi lägga dessa planer åt sidan då vår PO uttryckligen inte ville att vi skulle lägga någon tid på designaspekten i detta skede av projektet utan prioritera funktionalitet framför design.
  </br>

- **Validering** - Formulären har grundläggande validering, men vi rekommenderar att lägga till mer robust validering innan data skickas till servern. Särskilt vid registrering och produktskapande skulle tydligare felmeddelanden om specifika formatkrav (lösenordsstyrka, bildformat, etc.) förbättra användarupplevelsen.
  </br>

- **Felhantering** - Nuvarande felhantering visar grundläggande meddelanden, men en mer enhetlig strategi för att visa och hantera API-fel skulle ge användarna bättre återkoppling. En dedikerad komponent för felmeddelanden som visar specifika fel och möjliga lösningar skulle vara fördelaktigt. När API inte svarar eller returnerar fel behövs tydligare återhämtningsstrategier.
  </br>

- **Användargränssnitt för admin/user** - Idag döljs och visas admin-funktioner baserat på användarroll, men en mer genomtänkt separation mellan användar- och adminvyer skulle förbättra användarupplevelsen OM beställare önskar?. En dedikerad admin-dashboard med tydligare navigation mellan olika administrativa funktioner skulle tex göra systemet mer intuitivt för administratörer.
  </br>
- **Kategorisering, filtrering och sök** - För närvarande visas alla produkter i en enkel lista utan möjlighet att kategorisera, filtrera eller söka. Att implementera produktkategorier och sökfunktionalitet skulle väsentligt förbättra användbarheten, särskilt när produktkatalogen växer.
  </br>
- **Varukorg:** -
  När en användare lägger till flera exemplar av samma produkt i sin varukorg bör dessa visas sammanlagt på en och samma rad, istället för att listas individuellt. Till exempel, om en användare lägger till 10 äpplen, ska det stå "Äpplen – 10 st" istället för att visa 10 separata rader med ett äpple per rad. Att gruppera identiska produkter förbättrar översikten i varukorgen.
