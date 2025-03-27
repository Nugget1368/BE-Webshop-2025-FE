# :rocket: Frontend Hakims Livs

Applikation som hanterar ett externt api och simulerar en online matvarubutik.



## :star: Classes
Här finner vi alla klasser som används genom projektet:
+ **product.js**, innehåller modelen som används för en produkt.

****

## :star: Builders
Här finner vi alla [Builder-klasser](https://refactoring.guru/design-patterns/builder). En Builder är ett design-pattern, en mall eller ett mönster som vi kan följa när vi vill rendera data i DOM:en.

### Builder-klassen
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
result.foreach(element =>{
    document.body.append(element);
})
```
#### Metod-Anrop
+ **build** - Returnerar resultatet
+ **buildProductCard** - Bygger ett enkelt produkt-kort
+ **buildProductCardInfo** - Bygger ett detaljerat produkt-kort med infomration om produkten.


****

## :star: Scripts

De javascript som **direkt** hanterar DOM:en på en sida. Det kan röra sig om exempelvis att **rendera objekt** eller **hantera eventlisteners**.


****

## :star: Utils

Här hanteras logiska lösningar, vi finner bl.a upkoppling och hantering av [api](/src/utils/api.js) samt [testdata](/src/utils/testModels/products.json).

### Test Models - DELETE LATER

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
>**products.json** - Namnet på json-filen där testdatat ligger
>**--port 5001** - Porten som localhost använder sig av

Nu har du startat upp en lokal databas som kan simulera testdatat i products.json.

****