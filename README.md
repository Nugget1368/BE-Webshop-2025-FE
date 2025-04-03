# :rocket: Frontend Hakims Livs

Applikation som hanterar ett externt api och simulerar en online matvarubutik.

## :star: Classes

Här finner vi alla klasser som används genom projektet:

- **product.js**, innehåller modelen som används för en produkt.
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

## :star: Builders

Här finner vi alla [Builder-klasser](https://refactoring.guru/design-patterns/builder). En Builder är ett design-pattern, en mall eller ett mönster som vi kan följa när vi vill rendera data i DOM:en.

### :seedling: Product Form Builder

**Funktionalitet**

Klassen har tre huvudfunktioner:

- Lägga till produkter: Plockar upp ett formulär för att lägga till nya produkter.
- Ta bort produkter: Visar en bekräftelsedialog innan en produkt tas bort
- Redigera produkter: Visar en bekräftelsedialog innan en produkt redigeras med ifyllda uppgifter om produkten som redan ligger inne. EJ KLART!

#### Så här används koden:

**Lägg till produkt**

Användaren klickar på knappen _"Skapa en produkt_" (#manageProductsBtn)
Ett formulär visas i en modal där användaren behöver fylla i:

- Namn på produkten
- Pris
- Beskrivning
- Lagerantal
- Bild-URL

När formuläret skickas så samlas data in från formuläret och en ny produktinstans skapas. Produkten läggs sedan till genom ett API-anrop och sidan laddas om för att visa den nya produkten

**För att ta bort en produkt:**

Användaren klickar på _"ta bort"-knappen_ på en produktkort
En bekräftelsedialog visas då upp som frågar om användaren verkligen vill ta bort produkten
Om användaren bekräftar så skickas produkten upp och tas bort genom ett API-anrop (**Se api.js**). Sidan laddas sen om för att uppdatera produktlistan och produktkortet är borttaget.

**För att ta redigera en produkt:**
KOMMER SEN!

**I den aktuella implementeringen:**

- Koden importerar _addProduct_ och _deleteProduct_ från "utils/api.js" för att kommunicera med backend.
- Den använder _Product-klassen_ från "classes/product.js" för att skapa nya produktobjekt.
- När användaren klickar på knappen med ID _"manageProductsBtn"_, skapas ett formulär i modalen.

Formuläret byggs med följande fält:

```js
//Deklarera variabeln
let addProductBtn = document.querySelector("#manageProductsBtn");

addProductBtn.addEventListener("click", () => {
  modalContent.innerHTML = "";
  // Skapa och konfigurera formulärbyggaren
  const productForm = new ProductFormBuilder("#modalContent");

  // Bygg formuläret med metoder från builder-klassen
  productForm
    .addTextField("name", "Name:")
    .addNumberField("price", "Price:")
    .addTextField("description", "Description:")
    .addNumberField("stock", "Stock:")
    .addTextField("imageUrl", "Image:")
    .addButton("createProductBtn", "Lägg till produkt")
    .render();
});
```

- För borttagning av produkter finns det klickbara element med klassen _"delete-product-btn"_ inuti element med klassen "product-card"
- Både vid tillägg och borttagning används en modal med ID "modal" och innehåll placeras i ett element med ID "modalContent"

### :seedling: Builder-klassen

I builder klassen har vi en konstruktor med en **resultat Array** som property. När vi bygger saker i klassen vill vi returnera element i **Resultat-arrayen**. Man kan säga att man fyller på resultat-arrayen och när man är nöjd returnerar man resultatet med hjälp av **build()-Metoden**

```js
export class Builder {
  constructor() {
    this.resultArr = [];
  }

  build() {
    return this.resultArr;
  }
}
```

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
```

#### Metod-Anrop

- **build** - Returnerar resultatet
- **buildProductCard** - Bygger ett enkelt produkt-kort
- **buildProductCardInfo** - Bygger ett detaljerat produkt-kort med infomration om produkten.
- **buildAddToCartBtn** - Bygger en _Add To Cart Knapp_ som kan återanvändas för ett enhetligt mönster i applikationen.

---

## :star: Scripts

De javascript som **direkt** hanterar DOM:en på en sida. Det kan röra sig om exempelvis att **rendera objekt** eller **hantera eventlisteners**.
+ **index.js**, Hanterar event på startsidan.
+ **login.js**, Hanterar event kring inloggning.

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
+ **register(user)**, Registrera en användare.
+ **loginI(username, password)**, Logga in en registrerad användare.
+ **saveToken(token)**, Sparar undan _JSON Web Token_ i sessionstorage (nuvarande).
+ **getToken()**, Hämtar sparad token, för nuvarande ifrån sessionStorage.

#### Register-Metoden
Metoden Register tar in en **användare** som parameter. En användare **måste bestå av**:
+ firstname (string)
+ lastname (string)
+ email (string)
+ password (string)
+ isadmin (bool)

**Förslagsvis** är att använda sig av _[klassen user.js](./src/classes/user.js)_.

Metoden gör ett anrop till API:et som sparar undan användarens uppgifter i databas.

#### Login-Metoden
 Login-metoden tar in **två parametrar**:
 + username (string) - Detta är användarens **email-address**.
 + password (string) - Det lösenord som sparats undan när användaren registrerade sig.

 Metoden skickar iväg ett anrop med ett objekt som består av parametrarna och får sedan tillbaka en **JSON Web Token**, som i anropet sparas undan i _Session Storage_ via metoden **saveToken(token)**.
 
 >Denna token är **nödvändig** för de flesta androp i projektet och kan därför behöva hämtas vid vardera anrop som utförs.

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
