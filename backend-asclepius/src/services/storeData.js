  const { Firestore } = require('@google-cloud/firestore');
  // const collectionName = 'prediction';
  
  async function storeData(id, data) {
    const db = new Firestore();
    const predictCollection = db.collection('prediction');
    return predictCollection.doc(id).set(data);
  }



  async function getPredictHistoriesHandler(request, h) {
    const db = new Firestore();
    const predictCollection = db.collection('prediction');

    try {
        const snapshot = await predictCollection.get();
        const histories = [];
        snapshot.forEach(doc => {
            histories.push({
                id: doc.id,
                history: {
                    ...doc.data(),
                    id: doc.id,
                },
            });
        });

        return h.response({ status: 'success', data: histories }).code(200);
    } catch (error) {
        console.error('Error fetching prediction histories:', error);
        return h.response({ status: 'error', message: 'Failed to fetch prediction histories' }).code(500);
    }
}

  module.exports = { storeData, getPredictHistoriesHandler };