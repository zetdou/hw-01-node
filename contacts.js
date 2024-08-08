const fs = require("node:fs").promises;
const { nanoid } = require("nanoid");
const path = require("node:path");

const contactsPath = "./db/contacts.json";

function listContacts() {
  // Odnalezienie pliku wg ściezki
  const file = fs.readFile(path.resolve(contactsPath));
  // Odczytanie pliku
  file.then((content) => {
    // Konwertowanie zawartości pliku na ciąg znaków
    const fileStr = content.toString();
    // Przekonwertowanie ciągu znaków na JSON i wrzucenie go do tabeli
    console.table(JSON.parse(fileStr));
  });
}

function getContactById(contactId) {
  // Odnalezienie pliku wg ściezki
  const file = fs.readFile(path.resolve(contactsPath));
  // Odczytanie pliku
  file.then((content) => {
    // Konwertowanie zawartości pliku na ciąg znaków
    const fileStr = content.toString();
    // Przekonwertuj ciąg znaków na JSON
    const result = JSON.parse(fileStr);
    // Filtrowanie JSON w poszukiwaniu określonego kontaktu
    console.log(result.find((contact) => contact.id === contactId));
  });
}

function removeContact(contactId) {
  // Odnalezienie pliku wg ściezki
  const file = fs.readFile(path.resolve(contactsPath));
  // Odczytanie pliku
  file.then((content) => {
    // Konwertowanie zawartości pliku na ciąg znaków
    const fileStr = content.toString();
    // Przekonwertuj ciąg znaków na JSON
    const result = JSON.parse(fileStr);
    // Filtrowanie JSON w poszukiwaniu określonego kontaktu
    const afterDelete = result.filter((contact) => contact.id !== contactId);
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(afterDelete)).then(() => {
        console.log("Zapis do pliku zakończony sukcesem".green);
    });
  });
}

function addContact(name, email, phone) {
  // Odnalezienie pliku wg ściezki
  const file = fs.readFile(path.resolve(contactsPath));
  // Odczytanie pliku
  file.then((content) => {
    // Konwertowanie zawartości pliku na ciąg znaków
    const fileStr = content.toString();
    // Przekonwertuj ciąg znaków na JSON
    const result = JSON.parse(fileStr);
    // Filtrowanie JSON w poszukiwaniu określonego kontaktu
    result.push({
      id: nanoid(21),
      name,
      email,
      phone,
    });
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(result)).then(() => {
        console.log("Zapis do pliku zakończony sukcesem".green);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
