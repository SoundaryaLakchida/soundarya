const FIREBASE_CUSTOMER_URL = 'https://firestore.googleapis.com/v1/projects/onlineshopping-d47b6/databases/(default)/documents/Customers';

async function fetchCustomers() {
    try {
        const response = await fetch(FIREBASE_CUSTOMER_URL);
        const data = await response.json();

        const customerList = document.getElementById("customerList");
        customerList.innerHTML = "";

        if (data.documents) {
            data.documents.forEach((doc) => {
                const fields = doc.fields;
                const row = `<tr>
                    <td>${fields.Name.stringValue}</td>
                    <td>${fields.Email.stringValue}</td>
                    <td><input type="number" id="credit-${doc.name.split('/').pop()}" value="${fields.CreditScore.integerValue}"></td>
                    <td><button onclick="updateCreditScore('${doc.name.split('/').pop()}')">Update</button></td>
                </tr>`;
                customerList.innerHTML += row;
            });
        } else {
            customerList.innerHTML = '<tr><td colspan="4">No customers found.</td></tr>';
        }
    } catch (error) {
        console.error("Error fetching customers:", error);
    }
}

async function updateCreditScore(docId) {
    const creditScore = document.getElementById(`credit-${docId}`).value;

    try {
        const response = await fetch(`${FIREBASE_CUSTOMER_URL}/${docId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: {
                    CreditScore: { integerValue: parseInt(creditScore) }
                }
            })
        });

        if (response.ok) {
            alert("Credit score updated successfully!");
        } else {
            alert("Error updating credit score.");
        }
    } catch (error) {
        console.error("Error updating credit score:", error);
    }
}

fetchCustomers();
