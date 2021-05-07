const { MongoClient } = require("mongodb");
const url =
	"mongodb+srv://YuliaKitan:tnv333@petadoption.lszzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url, {
	useUnifiedTopology: true,
	// useFindAndModify: true,
});
const main = "main";

async function AddAPet() {
	try {
		await client.connect();
		console.log("Connected correctly to server");
		const db = client.db(main);
	} catch (err) {
		console.log(err.stack);
		await client.close();
	}
}
exports.AddAPet = AddAPet;

// async function addBonny() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//         const db = client.db(main);
//         const col = db.collection("pet_types");
//         let Bonny =
//             {
//               "name": "moty",
//               "description": "cute",
//               "sku": "263-43-7861",
//               "mediaUrl": "https://carnivora.ca/s/dogs/carnivora-dogs.jpg"
//             }

//         // Insert a single document, wait for promise so we can read it back
//         const p = await col.insertOne(Bonny);
//         // Find one document
//         const myDoc = await col.findOne();
//         // Print to the console
//         console.log(myDoc);

//        } catch (err) {
//         console.log(err.stack);
//     }

//     finally {
//        await client.close();
//    }
// }
// exports.addBonny = addBonny;
