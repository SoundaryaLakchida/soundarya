const FIREBASE_CATEGORY_URL = 'https://firestore.googleapis.com/v1/projects/onlineshopping-d47b6/databases/(default)/documents/Inventory';

async function fetchInventory() {
    try {
        const response = await fetch(FIREBASE_CATEGORY_URL);
        const data = await response.json();

        const inventoryList = document.getElementById("inventoryList");
        inventoryList.innerHTML = "";

        if (data.documents) {
            data.documents.forEach((doc) => {
                const fields = doc.fields;
                const docId = doc.name.split('/').pop();
                const row = `<tr>
                    <td>${docId}</td>
                    <td>${fields.Cat_id.stringValue}</td>
                    <td>${fields.Title.stringValue}</td>
                    <td><button onclick="deleteItem('${docId}')">Delete</button></td>
                </tr>`;
                inventoryList.innerHTML += row;
            });
        } else {
            inventoryList.innerHTML = '<tr><td colspan="4">No items found.</td></tr>';
        }
    } catch (error) {
        console.error("Error fetching inventory:", error);
    }
}

async function deleteItem(docId) {
    try {
        const response = await fetch(`${FIREBASE_CATEGORY_URL}/${docId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Item deleted successfully!");
            fetchInventory();
        } else {
            alert("Error deleting item.");
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}

fetchInventory();
