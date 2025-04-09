# :rocket: Frontend Hakims Livs

Applikation som hanterar ett externt api och simulerar en online matvarubutik.

### :book: Frontend-dokumentation

För detaljerad information om frontend-implementationen, se [FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md)

## :star: Classes

Här finner vi alla klasser som används genom projektet:

- **product.js**, innehåller modelen som används för en produkt.
- **productFormBuilder.js**, detta är en produkthanteringsklass som låter dig skapa ett nytt produktkort.
- **productHandler.js**, detta är en produkthanteringsklass som låter dig ändra och ta bort ett redan skapat produktkort.
- **cart.js**, innehåller modelen som används för en varukorg.
- **user.js**, innehåller modelen som används för en user, samt en ärvande klass Admin.

### :seedling: Cart.js

I Varukorgen hittar vi en konstruktor med en array _items_, det är här som alla produkter som användaren valt bör lagras. Klassen kommer med metoderna:

- **getItems( )**, som returnerar _arrayen 'items'_.
- **addItem( )**, som lägger till en produkt i arrayen _arrayen 'items'_.
- **gettotal( )**, returnerar det **totala priset** för alla produkter i varukorgen.
- **updateCart( )**, uppdaterar Varukorgen i DOM:en.

Här finner vi alla klasser som används genom projektet:

- **product.js**, innehåller modelen som används för en produkt.

#### Tömma varukorgen

För att ge användaren möjlighet att snabbt tömma hela varukorgen finns en "Töm varukorg"-funktion **clearCart()**

**Funktionalitet**

- En knapp med texten "Töm varukorg" visas i modalen för kundvagnsvyn när det finns produkter i varukorgen att visa.
- När användaren klickar på knappen töms hela varukorgen på en gång.
- Varukorgen rensas både från UI och från localStorage.
- Ett bekräftelsemeddelande visas efter tömning.

**I den aktuella implementationen:**

- Knappen skapas i [Builder-klassen](/src/builders/builder.js). **buildCartInfo-metod** och får klassen "clear-cart-btn"
- En event listener kopplas till knappen i `openCart`-funktionen i ([index](/src/scripts/index.js))
- När knappen klickas anropas `clearCartUI`-funktionen som:
  - Tömmer kundvagnsobjektet med `clearCart`-metoden
  - Rensar localStorage med `LocalStorage.clearStorage(CART_KEY)` [LocaleStorage](/src/utils/localstorage.js).
  - Uppdaterar UI med ett bekräftelsemeddelande
  - Uppdaterar kundvagnsräknaren i header

## :star: Builders

Här finner vi alla [Builder-klasser](https://refactoring.guru/design-patterns/builder). En Builder är ett design-pattern, en mall eller ett mönster som vi kan följa när vi vill rendera data i DOM:en.

### :seedling: Product Form Builder

**Funktionalitet**
Denna klass används för att bygga formulär för produkter.

<u>Den är ansvarig för:</u>

- Skapa textfält, nummerfält och knappar
- Återanvändbar i både skapa och uppdatera scenarios
- Hantera inskickning av formulärdata till API
<hr>

#### Så här används koden

**Lägg till produkt:**

Användaren klickar på knappen _"Skapa en produkt_" (#manageProductsBtn)
Ett formulär visas i en modal där användaren behöver fylla i:

- Namn på produkten
- Pris
- Beskrivning
- Lagerantal
- Bild-URL

När formuläret skickas så samlas data in från formuläret och en ny produktinstans skapas. Produkten läggs sedan till genom ett API-anrop och sidan laddas om för att visa den nya produkten

<hr>

**populateWithProductData():**
När formuläret skapas för att redigera en produkt, används metoden för att fylla i formulärets fält med den befintliga produktdatan. Denna metod tar emot produktobjektet som hämtats från API och placerar värden i motsvarande formulärfält. Dessutom sparar metoden produktens ID i formulärets dataset, vilket är avgörande för att systemet ska veta att det handlar om en uppdatering och inte en ny produkt när formuläret skickas in.

<hr>

<u>ProductFormBuilder använder två API-anrop ([api](/src/utils/api.js)):</u>

- **addProduct**, för att lägga till en ny produkt i databasen.
- **updateProduct**, för att uppdatera en befintlig produkt baserat på dess ID (se product handler)

**I den aktuella implementeringen:**

- Koden importerar _addProduct_ och _deleteProduct_ från "utils/api.js" för att kommunicera med backend.
- Den använder _Product-klassen_ från "classes/product.js" för att skapa nya produktobjekt.
- När användaren klickar på knappen med ID _"manageProductsBtn"_, skapas ett formulär i modalen.

### Product Handlers

Denna fil innehåller funktioner för att hantera edit- och delete-funktionalitet.

**handleEditButtonClick:** Lyssnar efter klick på edit-knappar, hämtar produktdata och visar redigeringsformuläret
**handleDeleteButtonClick:** Hanterar borttagning av produkter med bekräftelsedialog
**initProductHandlers:** Initierar event listeners för produkt-interaktioner

<hr>

**För att ta bort en produkt:**
När användaren klickar på _"Delete"-knappen"_ på en produkt så sker följande:

- handleDeleteButtonClick i productHandlers.js anropas
- En bekräftelsedialog visas
- Om användaren bekräftar, tas produkten bort via API med deleteProduct
- Sidan laddas om för att visa ändringarna

**För att ta redigera en produkt:**
När användaren klickar på _"Edit"-knappen"_ på en produkt sker följande:

- handleEditButtonClick i productHandlers.js anropas
- Produktens befintliga data hämtas från API med getProductById
- ProductFormBuilder används för att skapa ett formulär som fylls med produktdata
- Användaren kan ändra produktuppgifter
- När formuläret skickas anropas ProductFormBuilder's handleSubmit-metod som uppdaterar produkten
- Sidan laddas om för att visa ändringarna

<hr>

<u>Product Handler använder följande två API-anrop ([api](/src/utils/api.js)):</u>

- **getProductById**, används när användaren klickar på edit-knappen för att hämta den specifika produktens data från databasen
- **deleteProduct**, används när användaren bekräftar borttagning av en produkt

_productHandler hanterar inte direkt produktskapande eller uppdatering. Den förbereder endast formuläret för redigering genom att hämta data och skapar en bekräftelsedialog för borttagning. När användaren skickar in ett formulär som initierats av handleEditButtonClick, är det fortfarande **ProductFormBuilder-klassen** som hanterar själva uppdateringen._

**Formulärhantering**

Både för att skapa och redigera en produkt byggs formuläret med samma fält:

```js
// Exempel på hur formuläret byggs
const productForm = new ProductFormBuilder("#modalContent");

productForm
  .addTextField("name", "Name:")
  .addNumberField("price", "Price:")
  .addTextField("description", "Description:")
  .addNumberField("stock", "Stock:")
  .addTextField("imageUrl", "Image:")
  .addButton("createProductBtn", "Lägg till produkt")
  .render();
```

- För borttagning av produkter finns det klickbara element med klassen _"delete-product-btn"_ inuti element med klassen "product-card"
- Både vid tillägg och borttagning används en modal med ID "modal" och innehåll placeras i ett element med ID "modalContent"

### :seedling: Builder-klassen

I builder klassen har vi en konstruktor med en **resultat Array** som property. När vi bygger saker i klassen vill vi returnera element i **Resultat-arrayen**. Man kan säga att man fyller på resultat-arrayen och när man är nöjd returnerar man resultatet med hjälp av **build()-Metoden**

````js
export class Builder {
  constructor() {
    this.resultArr = [];
  }

  build() {
    return this.resultArr;
  }
}


**Exempel**:
I exemplet nedan har vi 3 produkter, product1, product2, product3. Vi vill bygga kort för dessa 3 produkter i DOM:en. Då använder vi oss av buildProductCard-buildermetoden i Klassen Builder. För vardera gång vi påkallar metoden så kommer **Resultat-Arrayen** fyllas på med 1 nytt produktkort. Efter 3 metod-anrop har vi alltså en array med 3 värden i sig.

```js
//Skapa ett builder-objekt
let builder = new Builder();
//Bygg de saker vi vill ha - 3 st. produktkort
builder.buildProductCard(product1);
builder.buildProductCard(product2);
builder.buildProductCard(product3);
//Returnera resultatet - Array(3)
let result = builder.Build();
//Skriv ut i DOM:en
result.foreach((element) => {
  document.body.append(element);
});
````

#### Metod-Anrop

- **build** - Returnerar resultatet
- **buildProductCard** - Bygger ett enkelt produkt-kort
- **buildProductCardInfo** - Bygger ett detaljerat produkt-kort med infomration om produkten.
- **buildAddToCartBtn** - Bygger en _Add To Cart Knapp_ som kan återanvändas för ett enhetligt mönster i applikationen.

---

## :star: Scripts

De javascript som **direkt** hanterar DOM:en på en sida. Det kan röra sig om exempelvis att **rendera objekt** eller **hantera eventlisteners**.

- **index.js**, Hanterar event på startsidan.
- **login.js**, Hanterar event kring inloggning.

### :seedling: Login.js

Innehåller ett formulär som användaren kan fylla i för att logga in på sidan. När användaren trycker _submit_ i formuläret triggas funktionen **Handle Login**. Den tar in de värden som användaren matat in, och skickar vidare dessa till **[login-metoden i klassen auth.js](./src/utils/auth.js)**. Om inloggningen är giltig så förs användaren till nästa sida, annars markeras fälten som inkorrekta.

---

## :star: Utils

Här hanteras logiska lösningar, vi finner bl.a upkoppling och hantering av [api](/src/utils/api.js) samt [testdata](/src/utils/testModels/products.json).

### :seedling: Test Models - DELETE LATER

I denna mapp genereras vår testdata och detta ska tas bort i den färdigställlda produkten.

#### Generera testdata

När vi befinner oss i utvecklingsmiljö (Live Server) kommer applikationen använda sig av **URL:en http://localhost:5001/**. Till följd av detta kommer applikationen därför **inte** **heller** att ansluta till det faktiska api:et utan behöver använda sig av en lokal testdatabas, som kan startas upp med hjälp av **[json-server](https://www.npmjs.com/package/json-server)**.

##### [Json-server](https://www.npmjs.com/package/json-server)

För att använda sig av json-server krävs att man först och främst har det installerat i VS-Code. Kör Kommandot i **Git Bash**:

```
npm install json-server
```

Det kan **eventuellt** krävas att man även har json-server extension installerat i VS-Code.

För att starta upp sin lokala databas måste man, **i terminalen**, först och främst befinna sig i mappen där testdatat ligger, i detta fall mappen **testModels**. Använd kommandot _cd_ följt av _mappnamnet_:

```
cd src
cd utils
cd testModels
```

När du befinner dig i mappen testModels, kör kommandot i **Git Bash**:

```
json-server products.json --port 5001
```

> Kommandot
> **products.json** - Namnet på json-filen där testdatat ligger
> **--port 5001** - Porten som localhost använder sig av

Nu har du startat upp en lokal databas som kan simulera testdatat i products.json.

### :seedling: Auth

Auth-Klassen hanterar autentiseringen i projektet. Inehåller metoderna:

- **register(user)**, Registrera en användare.
- **loginI(username, password)**, Logga in en registrerad användare.
- **saveToken(token)**, Sparar undan _JSON Web Token_ i sessionstorage (nuvarande).
- **getToken()**, Hämtar sparad token, för nuvarande ifrån sessionStorage.

#### Register-Metoden

Metoden Register tar in en **användare** som parameter. En användare **måste bestå av**:

- firstname (string)
- lastname (string)
- email (string)
- password (string)
- isadmin (bool)

**Förslagsvis** är att använda sig av _[klassen user.js](./src/classes/user.js)_.

Metoden gör ett anrop till API:et som sparar undan användarens uppgifter i databas.

#### Login-Metoden

Login-metoden tar in **två parametrar**:

- username (string) - Detta är användarens **email-address**.
- password (string) - Det lösenord som sparats undan när användaren registrerade sig.

Metoden skickar iväg ett anrop med ett objekt som består av parametrarna och får sedan tillbaka en **JSON Web Token**, som i anropet sparas undan i _Session Storage_ via metoden **saveToken(token)**.

> Denna token är **nödvändig** för de flesta androp i projektet och kan därför behöva hämtas vid vardera anrop som utförs.

##### Anrop med Token - GET & POST

För att göra ett anrop med JWT så krävs att den token som givits skickas med i **anropets header** som i exemplet nedan. Här pekar headern mot _authorization_ som tar emot en **_Bearer_ tillsammans** med **Token**.

```js
// GET-Method
  const response = await axios.get(url, {headers: {authorization: `Bearer ${token}`}})

//POST-Method
  let product = {
    name = "Apple",
    price = 2.99,
    description = "description"
  }
  const response = await axios.post(url, product, {headers: {authorization: `Bearer ${token}`}});

```

### :seedling: localstorage.js

I denna fil lagras alla funktioner förknippade med Local-storage.

#### Sträng-konstanter

För att spara och hämta mellan localstorage krävs att man i anropet skickar med en **sträng som nyckeln** till de lagrade värdena o localstorage. För att undvika stavfel vid flertalet anrop **finns sträng-konstanter**, dvs. en variabel med en sträng som kan återanvändas och uppdateras i alla anrop.

##### Konstanter:

- **CART_KEY**, innehåller nyckeln för kundvagnen i localstorage

#### getStorageAsJSON

Returnerar den angivna localstorage-nyckelns värden som objekt **konverterade ifrån JSON**.

```js
    static getStorageAsJSON(storageName) {
        return JSON.parse(localStorage.getItem(storageName));
    }
  //Example
let cart = getStorageAsJSON(CART_KEY);
console.log(cart.items); //Output: En array av objekt från Localstorage sparningen "products"
```

#### Save To Storage

Denna metod är tänkt att användas för att spara till Localstorage.

> **Parametrar**:
> **storageName** - Namnet för nyckeln i Localstorage som man vill komma åt, exempelvis "products" eller "user".
> **obj** - Det objekt man vill spara som värde i localstorage.

```js
const saveToStorage = (storageName, obj) => {
  if (localStorage.getItem(storageName)) {
    let storage = JSON.parse(localStorage.getItem(storageName));
    storage.push(obj);
    localStorage.setItem(storageName, JSON.stringify(storage));
  } else {
    let arr = [];
    arr.push(obj);
    localStorage.setItem(storageName, JSON.stringify(arr));
  }
};
```

I metodens första rad sker en if-sats som kontrollerar ifall nyckeln existerar. Om den existerar vill vi lägga till det nya värdet i listan av värden. Detta är viktigt eftersom vi lagrar alla värden i en Array och inte vill **råka ersätta hela arrayen med det nya värdet vi försöker lägga till**.

För att lägga till objektet krävs att vi först hämtar hela listan, **pushar** värdet in i arrayen och därefter skriver vi över den gamla arrayen som finns lagrad med den nya vi precis skapat.

Om nyckeln istället **inte existerar** vill vi skapa en ny array och lägga till det nya värdet i arrayen. Därefter spara arrayen i localstorage.

```js
if (localStorage.getItem(storageName)) {
  // Nyckeln finns angiven sen tidigare
} else {
  // Nyckeln finns inte angiven sen tidigare, skapa en ny Array att spara som värde
}
```

> **JSON.stringify & JSON.parse**
> För att **minska storleken** på datan som lagras i localstorage är det **viktigt** att vi inte sparar vardera objekt som de är, utan istället **konverterar de till JSON-strängar** (JSON.stringify).
>
> När vi sedan hämtar datan behöver vi då även konvertera tillbaka datan från JSON till objekten vi hämtat (JSON.parse).

---

#### Registrera användare (register.js, register.html, auth.js)

**Ny registreringssida & formulär:**
Lagt till HTML-sida med ett registreringsformulär med fält för förnamn, efternamn, e‑post, lösenord och en isAdmin-checkbox för att se om den registrerade användaren är user eller admin.

**Registreringslogik (register.js):**
Skapat en script-fil som lyssnar på formulärets submit-händelse.
Importerar User och Admin-klasser from user.js.
Beroende på värdet från isAdmin-checkbox så skapas antingen user eller admin.
Skickar datan till auth.register(user).
Vid registrering omdirigeras användaren till login-sida.

**Navigering från login-sidan (login.js):**
Uppdaterat registrera-knappen så att den leder till register.html.
