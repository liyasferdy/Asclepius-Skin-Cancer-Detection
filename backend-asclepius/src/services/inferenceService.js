const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .div(tf.scalar(255.0)); // Normalize to range [0, 1]
 
        // const classes = ['Cancer', 'Non-Cancer'];
 
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = score[0] * 100;
        const label = confidenceScore > 50 ? 'Cancer' : 'Non-Cancer';
 
        let explanation, suggestion;
 
        if(label === 'Cancer') {
            suggestion = "Segera periksa kedokter!"
        }
 
        if(label === 'Non-Cancer') {
            suggestion = "Anda sehat!"
        }
 
        return { confidenceScore, label, explanation, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}
 
module.exports = predictClassification;