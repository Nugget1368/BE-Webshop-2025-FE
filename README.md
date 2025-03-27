# :rocket: Frontend Hakims Livs

Applikation som hanterar ett externt api och simulerar en online matvarubutik.

## :star: Classes
Här finner vi alla klasser som används genom projektet:
+ **product.js**, innehåller modelen som används för en produkt.


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